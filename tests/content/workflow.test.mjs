import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { selectQuestions } from "../../src/lib/quiz/core.ts";
const require = createRequire(import.meta.url);
const { load, validate, generate } = require("../../scripts/content-lib.cjs");
const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
test("新しい単元をdraft→reviewed→publishedとして追加でき、既存を上書きしない", () => {
  const work = fs.mkdtempSync(path.join(os.tmpdir(), "zunzun-workflow-test-"));
  try {
    fs.cpSync(path.join(root, "content"), path.join(work, "content"), {
      recursive: true,
    });
    fs.cpSync(path.join(root, "scripts"), path.join(work, "scripts"), {
      recursive: true,
    });
    const command = (file, args) =>
      spawnSync(process.execPath, [path.join(work, "scripts", file), ...args], {
        cwd: work,
        env: {
          ...process.env,
          QUIZ_WORKSPACE:
            process.env.QUIZ_WORKSPACE ?? path.resolve(root, ".."),
        },
        encoding: "utf8",
      });
    const nextWeek =
      Math.max(
        ...load(root).units.map((u) =>
          Number(u.key.match(/^week(\d+)$/)?.[1] ?? 0),
        ),
      ) + 1;
    const newKey = `week${nextWeek}`;
    const init = command("init-week.js", ["--week", newKey]);
    assert.equal(init.status, 0, init.stderr);
    assert.equal(command("init-week.js", ["--week", newKey]).status, 1);
    const units = JSON.parse(
      fs.readFileSync(path.join(work, "content/units.json"), "utf8"),
    );
    const unit = units.find((u) => u.key === newKey);
    const original = load(work).entries.filter(
      (e) => e.question.sourceReference.weekKey === "week1",
    );
    const entries = original.map((e) => {
      const copy = structuredClone(e);
      copy.question.id = "test-new-" + e.question.id;
      copy.question.weekUnitId = unit.id;
      copy.question.sourceReference.weekKey = unit.key;
      copy.question.published = false;
      copy.status = "draft";
      return copy;
    });
    const file = path.join(work, "content", unit.file);
    fs.writeFileSync(file, JSON.stringify(entries));
    const baseCount = generate(load(root)).catalog.questions.length;
    assert.equal(generate(load(work)).catalog.questions.length, baseCount);
    assert.equal(
      command("content-status.js", ["--week", newKey, "--status", "published"])
        .status,
      1,
    );
    assert.equal(
      command("content-status.js", ["--week", newKey, "--status", "reviewed"])
        .status,
      0,
    );
    assert.equal(
      command("content-status.js", ["--week", newKey, "--status", "published"])
        .status,
      0,
    );
    const content = load(work);
    assert.deepEqual(
      validate(content, { workspace: process.env.QUIZ_WORKSPACE }),
      [],
    );
    const generated = generate(content);
    assert.equal(generated.catalog.questions.length, baseCount + 12);
    assert.equal(
      selectQuestions(generated.catalog, newKey, "mix", true).length,
      12,
    );
    assert.equal(command("build-content.js", []).status, 0);
    assert.ok(
      fs.existsSync(path.join(work, `docs/quiz-contents/${newKey}.md`)),
    );
  } finally {
    fs.rmSync(work, { recursive: true, force: true });
  }
});
test("教材が変わった場合は出典再確認を要求する", () => {
  const data = load(root);
  const copy = structuredClone(data);
  copy.rows[0].entry.author.source.sha256 = "0".repeat(64);
  assert.ok(
    validate(copy, { workspace: process.env.QUIZ_WORKSPACE }).some((s) =>
      s.includes("教材が更新"),
    ),
  );
});
