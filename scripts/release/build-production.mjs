import { writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import {
  assertClean,
  assertTag,
  createRelease,
  git,
  productionEnvironment,
} from "./lib.mjs";

try {
  assertClean();
  const tag = process.env.RELEASE_TAG;
  assertTag(tag);
  const values = productionEnvironment(process.env);
  const result = spawnSync(
    process.execPath,
    ["node_modules/expo/bin/cli", "export", "--clear", "--platform", "web"],
    {
      env: { ...process.env, EXPO_NO_DOTENV: "1" },
      stdio: "inherit",
    },
  );
  if (result.status !== 0)
    throw new Error("Production Webの書き出しに失敗しました。");
  const release = createRelease(path.resolve("dist"), values, {
    commit: git(["rev-parse", "HEAD"]),
    tag,
    publicDirectory: path.resolve("public"),
  });
  writeFileSync("dist/release.json", `${JSON.stringify(release, null, 2)}\n`);
  console.log(`Production成果物検証成功: ${tag} (${release.commit})`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
