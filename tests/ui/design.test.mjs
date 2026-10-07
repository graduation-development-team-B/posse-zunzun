import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { styleSignatures } from "./style-signatures.mjs";
const baseline = JSON.parse(
  fs.readFileSync(
    new URL("./pre-migration-styles.json", import.meta.url),
    "utf8",
  ),
);
// Extracted from the original repo before the data migration. Formatting differences
// are ignored; separate additions for new question formats are allowed.
for (const [file, styles] of Object.entries(baseline)) {
  test(`移行前のスタイルを維持する: ${file}`, () => {
    const current = styleSignatures(
      fs.readFileSync(new URL("../../" + file, import.meta.url), "utf8"),
    );
    for (const [name, expected] of Object.entries(styles))
      assert.equal(current[name], expected, `${file}: ${name}`);
  });
}
