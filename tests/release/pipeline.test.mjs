import test from "node:test";
import assert from "node:assert/strict";
import { createECDH } from "node:crypto";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  rmSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { checkReleaseTag } from "../../scripts/release/tag.mjs";
import {
  assetFile,
  createRelease,
  git,
  productionEnvironment,
  productionProject,
  verifyRelease,
  verifyWithRetry,
} from "../../scripts/release/lib.mjs";

function directory(context) {
  const root = mkdtempSync(path.join(os.tmpdir(), "posse-release-test-"));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  return root;
}

function environment() {
  const pair = createECDH("prime256v1");
  pair.generateKeys();
  return {
    EXPO_PUBLIC_SUPABASE_URL: `https://${productionProject}.supabase.co`,
    EXPO_PUBLIC_SUPABASE_KEY: "sb_publishable_test_key",
    EXPO_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY: pair
      .getPublicKey()
      .toString("base64url"),
  };
}

function exportFixture(context) {
  const root = directory(context);
  const dist = path.join(root, "dist");
  const publicDirectory = path.join(root, "public");
  mkdirSync(dist);
  mkdirSync(publicDirectory);
  const values = productionEnvironment(environment());
  const write = (file, value) => writeFileSync(path.join(dist, file), value);
  write(
    "index.html",
    '<link rel="apple-touch-icon" href="/apple.png?v=1"><script src="/entry.js" defer></script>',
  );
  write("entry.js", `const config=${JSON.stringify(values)}`);
  const publicFiles = {
    "manifest.json": JSON.stringify({ icons: [{ src: "/icon.png?v=1" }] }),
    "sw.js": "self.addEventListener('push',()=>{});",
    "icon.png": Buffer.from([137, 80, 78, 71, 1]),
    "apple.png": Buffer.from([137, 80, 78, 71, 2]),
  };
  for (const [file, bytes] of Object.entries(publicFiles)) {
    write(file, bytes);
    writeFileSync(path.join(publicDirectory, file), bytes);
  }
  const create = () =>
    createRelease(dist, values, {
      commit: "a".repeat(40),
      tag: "v1.2.3",
      publicDirectory,
    });
  const release = create();
  const fetchImpl = async (url) => {
    const file = new URL(url).pathname;
    if (file === "/release.json") return Response.json(release);
    return new Response(readFileSync(assetFile(dist, file)));
  };
  return { dist, publicDirectory, values, release, create, fetchImpl, write };
}

test("本番URLと有効な公開鍵だけを受け付け、dev混入・欠損・秘密鍵を拒否する", () => {
  const env = environment();
  assert.equal(productionEnvironment(env).url, env.EXPO_PUBLIC_SUPABASE_URL);
  for (const replacement of [
    { EXPO_PUBLIC_SUPABASE_URL: "https://gzulpgzzbynmmlksadsw.supabase.co" },
    { EXPO_PUBLIC_SUPABASE_KEY: "sb_secret_not_for_clients" },
    { EXPO_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY: "" },
    {
      EXPO_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY:
        Buffer.alloc(32).toString("base64url"),
    },
    {
      EXPO_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY: Buffer.concat([
        Buffer.from([4]),
        Buffer.alloc(64),
      ]).toString("base64url"),
    },
  ])
    assert.throws(() => productionEnvironment({ ...env, ...replacement }));
});

test("タグ作成はmainのcleanなcommitだけを受け付け、未追跡・staged変更も拒否する", (context) => {
  const cwd = directory(context);
  git(["init", "-q", "-b", "main"], cwd);
  git(["config", "user.email", "release-test@example.invalid"], cwd);
  git(["config", "user.name", "Release test"], cwd);
  writeFileSync(path.join(cwd, "app.txt"), "committed");
  git(["add", "app.txt"], cwd);
  git(["commit", "-q", "-m", "fixture"], cwd);
  assert.doesNotThrow(() => checkReleaseTag("v1.2.3", { cwd }));
  for (const tag of ["v1", "v1.2.3-beta", "v01.2.3", "bad-tag"])
    assert.throws(() => checkReleaseTag(tag, { cwd }));
  const untracked = path.join(cwd, "new-icon.png");
  writeFileSync(untracked, "new");
  assert.throws(() => checkReleaseTag("v1.2.3", { cwd }), /未コミット/);
  rmSync(untracked);
  writeFileSync(path.join(cwd, "app.txt"), "changed");
  git(["add", "app.txt"], cwd);
  assert.throws(() => checkReleaseTag("v1.2.3", { cwd }), /未コミット/);
  git(["commit", "-q", "-m", "changed"], cwd);
  git(["checkout", "-q", "-b", "feature"], cwd);
  assert.throws(() => checkReleaseTag("v1.2.3", { cwd }), /main/);
});

test("CIはannotated tagを解決し、mainに取り込まれていないcommitを拒否する", (context) => {
  const cwd = directory(context);
  git(["init", "-q", "-b", "main"], cwd);
  git(["config", "user.email", "release-test@example.invalid"], cwd);
  git(["config", "user.name", "Release test"], cwd);
  git(["commit", "-q", "--allow-empty", "-m", "main"], cwd);
  git(["update-ref", "refs/remotes/origin/main", "HEAD"], cwd);
  git(["tag", "-a", "v1.0.0", "-m", "Release"], cwd);
  git(["checkout", "-q", "--detach"], cwd);
  assert.doesNotThrow(() => checkReleaseTag("v1.0.0", { cwd, ci: true }));
  git(["checkout", "-q", "-b", "feature"], cwd);
  git(["commit", "-q", "--allow-empty", "-m", "unmerged"], cwd);
  git(["tag", "v2.0.0"], cwd);
  assert.throws(() => checkReleaseTag("v2.0.0", { cwd, ci: true }));
});

test("タグCLIのcheckは作成せず、未知のオプションを拒否し、通常実行だけ注釈付きタグを作る", (context) => {
  const cwd = directory(context);
  git(["init", "-q", "-b", "main"], cwd);
  git(["config", "user.email", "release-test@example.invalid"], cwd);
  git(["config", "user.name", "Release test"], cwd);
  git(["commit", "-q", "--allow-empty", "-m", "main"], cwd);
  const script = fileURLToPath(
    new URL("../../scripts/release/tag.mjs", import.meta.url),
  );
  const run = (...args) =>
    spawnSync(process.execPath, [script, ...args], { cwd, encoding: "utf8" });
  assert.equal(run("--check", "v1.2.3").status, 0);
  assert.equal(git(["tag", "--list"], cwd), "");
  assert.equal(run("--dry-run", "v1.2.3").status, 1);
  assert.equal(git(["tag", "--list"], cwd), "");
  assert.equal(run("v1.2.3").status, 0);
  assert.equal(git(["cat-file", "-t", "refs/tags/v1.2.3"], cwd), "tag");
  assert.equal(run("v1.2.3").status, 1);
});

test("ビルドがpublicのアイコンを取りこぼした場合とdev接続先が混入した場合に停止する", (context) => {
  const fixture = exportFixture(context);
  fixture.write("icon.png", "old icon");
  assert.throws(fixture.create, /publicと一致/);
  fixture.write(
    "icon.png",
    readFileSync(path.join(fixture.publicDirectory, "icon.png")),
  );
  fixture.write(
    "entry.js",
    `${JSON.stringify(fixture.values)};const leaked='gzulpgzzbynmmlksadsw'`,
  );
  assert.throws(fixture.create, /dev Supabase/);
  assert.throws(() => assetFile(fixture.dist, "/%2e%2e/private-key"), /パス/);
});

test("正常配信を照合し、同じcommitでも古い画像・SW・bundle・HTMLを検知する", async (context) => {
  const fixture = exportFixture(context);
  await verifyRelease(fixture.release, { fetchImpl: fixture.fetchImpl });
  for (const file of ["icon.png", "sw.js", "entry.js", "index.html"]) {
    const original = readFileSync(path.join(fixture.dist, file));
    fixture.write(file, "stale response");
    await assert.rejects(
      verifyRelease(fixture.release, { fetchImpl: fixture.fetchImpl }),
      /配信物の内容/,
    );
    fixture.write(file, original);
  }
});

test("旧タグや404では成功扱いにせず、切り替え待ちの回数を制限する", async (context) => {
  context.mock.method(console, "warn", () => {});
  const fixture = exportFixture(context);
  let markerRequests = 0;
  const fetchImpl = async (url, options) => {
    if (new URL(url).pathname === "/release.json" && markerRequests++ === 0)
      return Response.json({ ...fixture.release, tag: "v0.0.1" });
    return fixture.fetchImpl(url, options);
  };
  await verifyWithRetry(fixture.release, {
    fetchImpl,
    attempts: 2,
    pause: async () => {},
  });
  assert.equal(markerRequests, 2);
  let failures = 0;
  await assert.rejects(
    verifyWithRetry(fixture.release, {
      attempts: 2,
      pause: async () => {},
      fetchImpl: async () => {
        failures++;
        return new Response("missing", { status: 404 });
      },
    }),
    /HTTPエラー/,
  );
  assert.equal(failures, 2);
});
