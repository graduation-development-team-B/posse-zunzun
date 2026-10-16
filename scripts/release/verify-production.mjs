import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { productionUrl, verifyWithRetry } from "./lib.mjs";

try {
  const args = process.argv.slice(2);
  const urlIndex = args.indexOf("--url");
  const url = urlIndex < 0 ? productionUrl : args[urlIndex + 1];
  const parsed = new URL(url);
  assert(
    parsed.protocol === "https:" &&
      /^posse-zunzun(?:--[a-z0-9-]+)?\.expo\.app$/.test(parsed.hostname),
    "検証対象はこのアプリのEAS Hosting URLで指定してください。",
  );
  const release = JSON.parse(readFileSync("dist/release.json", "utf8"));
  await verifyWithRetry(release, { url });
  console.log(`配信照合成功: ${url} ${release.tag} (${release.commit})`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
