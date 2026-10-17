import assert from "node:assert/strict";
import { createHash, ECDH } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { setTimeout } from "node:timers/promises";

export const productionProject = "pzwptfsgdsovbxuctmue";
export const productionUrl = "https://posse-zunzun.expo.app";
const devProject = "gzulpgzzbynmmlksadsw";

export function git(args, cwd = process.cwd()) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

export function assertClean(cwd = process.cwd()) {
  const status = git(["status", "--porcelain", "--untracked-files=all"], cwd);
  assert(
    !status,
    `未コミット変更があります。必要なファイルをcommitしてから実行してください。\n${status}`,
  );
}

export function assertTag(tag) {
  assert(
    /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(tag ?? ""),
    "正式リリースタグはv1.2.3形式で指定してください。",
  );
}

export function productionEnvironment(env) {
  const url = env.EXPO_PUBLIC_SUPABASE_URL?.trim();
  const key = env.EXPO_PUBLIC_SUPABASE_KEY?.trim();
  const vapid = env.EXPO_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY?.trim();
  assert.equal(
    url,
    `https://${productionProject}.supabase.co`,
    "ProductionのSupabase URLが不正です。",
  );
  assert(
    /^sb_publishable_[A-Za-z0-9_-]+$/.test(key ?? "") &&
      !key.includes("REPLACE_WITH"),
    "Productionのpublishable keyが未設定または不正です。",
  );
  assert(
    /^[A-Za-z0-9_-]+$/.test(vapid ?? ""),
    "ProductionのVAPID公開鍵が未設定または不正です。",
  );
  const bytes = Buffer.from(vapid, "base64url");
  assert(
    bytes.length === 65 && bytes[0] === 4,
    "VAPID公開鍵はP-256の非圧縮公開鍵である必要があります。",
  );
  try {
    ECDH.convertKey(bytes, "prime256v1");
  } catch {
    throw new Error("ProductionのVAPID公開鍵が有効なP-256鍵ではありません。");
  }
  return { url, key, vapid };
}

export const sha256 = (bytes) =>
  createHash("sha256").update(bytes).digest("hex");

export function assetFile(directory, requestPath) {
  assert(
    requestPath.startsWith("/") && !requestPath.startsWith("//"),
    "公開資産は同一オリジンの絶対パスで指定してください。",
  );
  const pathname = decodeURIComponent(requestPath.split(/[?#]/)[0]);
  assert(
    !pathname.split("/").includes("..") && !pathname.includes("\\"),
    "公開資産のパスが不正です。",
  );
  return path.join(
    directory,
    pathname === "/" ? "index.html" : pathname.slice(1),
  );
}

export function createRelease(
  directory,
  values,
  { commit, tag, publicDirectory },
) {
  assertTag(tag);
  assert(/^[a-f0-9]{40}$/.test(commit), "リリースのcommit SHAが不正です。");
  const html = readFileSync(path.join(directory, "index.html"), "utf8");
  const manifest = JSON.parse(
    readFileSync(path.join(directory, "manifest.json"), "utf8"),
  );
  assert(manifest.icons?.length, "PWAアイコンがありません。");
  const scripts = [
    ...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/g),
  ].map((match) => match[1]);
  assert(scripts.length, "WebのJavaScript bundleがありません。");
  const bundle = scripts
    .map((file) => readFileSync(assetFile(directory, file), "utf8"))
    .join("\n");
  assert(
    bundle.includes(values.url) &&
      bundle.includes(values.key) &&
      bundle.includes(values.vapid),
    "Web bundleにProduction環境変数が組み込まれていません。",
  );
  assert(
    !bundle.includes(devProject),
    "Web bundleにdev Supabase接続先が混入しています。",
  );
  const appleTag = [...html.matchAll(/<link\b[^>]*>/g)]
    .map((match) => match[0])
    .find((link) => /rel=["']apple-touch-icon["']/.test(link));
  const appleIcon = appleTag?.match(/href=["']([^"']+)["']/)?.[1];
  assert(appleIcon, "iPhone用ホーム画面アイコンがありません。");
  const publicFiles = [
    "/manifest.json",
    "/sw.js",
    ...manifest.icons.map((icon) => icon.src),
    appleIcon,
  ];
  const files = {};
  for (const requestPath of new Set(["/", ...publicFiles, ...scripts])) {
    const bytes = readFileSync(assetFile(directory, requestPath));
    if (publicDirectory && publicFiles.includes(requestPath)) {
      assert(
        bytes.equals(readFileSync(assetFile(publicDirectory, requestPath))),
        `書き出し資産がpublicと一致しません: ${requestPath}`,
      );
    }
    files[requestPath] = sha256(bytes);
  }
  return { schema: 1, commit, tag, supabaseProject: productionProject, files };
}

export async function verifyRelease(
  release,
  { url = productionUrl, fetchImpl = fetch } = {},
) {
  const get = async (requestPath) => {
    const response = await fetchImpl(new URL(requestPath, url), {
      headers: { "cache-control": "no-cache", pragma: "no-cache" },
      signal: AbortSignal.timeout(15000),
    });
    assert.equal(
      response.status,
      200,
      `配信確認HTTPエラー: ${requestPath} (${response.status})`,
    );
    return response;
  };
  const actualRelease = await (await get("/release.json")).json();
  assert.deepEqual(
    actualRelease,
    release,
    "配信中のリリースが今回のタグ・commitと一致しません。",
  );
  await Promise.all(
    Object.entries(release.files).map(async ([requestPath, expected]) => {
      const bytes = Buffer.from(await (await get(requestPath)).arrayBuffer());
      assert.equal(
        sha256(bytes),
        expected,
        `配信物の内容がビルドと一致しません: ${requestPath}`,
      );
    }),
  );
}

export async function verifyWithRetry(
  release,
  { attempts = 5, pause = () => setTimeout(2000), ...options } = {},
) {
  for (let attempt = 1; ; attempt++) {
    try {
      await verifyRelease(release, options);
      return;
    } catch (error) {
      if (attempt >= attempts) throw error;
      console.warn(
        `配信切り替え待ち (${attempt}/${attempts}): ${error.message.split("\n")[0]}`,
      );
      await pause();
    }
  }
}
