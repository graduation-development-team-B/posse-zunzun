import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { assertClean, assertTag, git } from "./lib.mjs";

export function checkReleaseTag(tag, { cwd = process.cwd(), ci = false } = {}) {
  assertTag(tag);
  assertClean(cwd);
  if (ci) {
    assert.equal(
      git(["rev-parse", `${tag}^{commit}`], cwd),
      git(["rev-parse", "HEAD"], cwd),
      "タグとcheckoutしたcommitが一致しません。",
    );
    git(["merge-base", "--is-ancestor", "HEAD", "origin/main"], cwd);
  } else {
    assert.equal(
      git(["branch", "--show-current"], cwd),
      "main",
      "mainブランチから正式タグを作成してください。",
    );
    assert(!git(["tag", "--list", tag], cwd), "このタグは既に存在します。");
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    const args = process.argv.slice(2);
    assert(
      args.every(
        (arg) => !arg.startsWith("--") || ["--ci", "--check"].includes(arg),
      ),
      "利用できるオプションは--checkと--ciです。",
    );
    assert.equal(
      args.filter((arg) => !arg.startsWith("--")).length,
      1,
      "リリースタグを1つ指定してください。",
    );
    const tag = args.find((arg) => !arg.startsWith("--"));
    checkReleaseTag(tag, { ci: args.includes("--ci") });
    if (!args.includes("--ci") && !args.includes("--check")) {
      git(["tag", "-a", tag, "-m", `Release ${tag}`]);
      console.log(
        `${tag}を${git(["rev-parse", "HEAD"])}へ作成しました。mainをpush後、git push origin ${tag}で本番パイプラインが動きます。`,
      );
    } else {
      console.log(`リリース対象確認成功: ${tag}`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
