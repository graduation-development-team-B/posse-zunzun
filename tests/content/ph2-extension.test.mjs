import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { selectQuestions, correctOption } from "../../src/lib/quiz/core.ts";
import {
  emptyProgress,
  beginSession,
  currentQuestion,
  editDraft,
  submitAnswer,
  nextQuestion,
  restoreProgress,
} from "../../src/lib/quiz/session.ts";
import {
  phaseForUnit,
  availablePhaseCodes,
} from "../../src/lib/content/phase.ts";
const require = createRequire(import.meta.url);
const { load, validate } = require("../../scripts/content-lib.cjs");
const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const { catalog } = JSON.parse(
  fs.readFileSync(path.join(root, "src/data/generated/catalog.json"), "utf8"),
);
const before = JSON.parse(
  fs.readFileSync(new URL("./pre-ph2-hashes.json", import.meta.url), "utf8"),
);

test("PH2追加で既存PH1・Gitの202問の正本を変更しない", () => {
  for (const [file, sha] of Object.entries(before)) {
    assert.equal(
      createHash("sha256")
        .update(fs.readFileSync(path.join(root, file)))
        .digest("hex"),
      sha,
      file,
    );
  }
  assert.equal(catalog.questions.length, 394);
  assert.deepEqual(
    catalog.weekUnits.filter((u) => u.phase === "PH2").map((u) => u.key),
    Array.from({ length: 16 }, (_, i) => `week${i + 17}`),
  );
  assert.equal(phaseForUnit(catalog, "week16").code, "PH1");
  assert.equal(phaseForUnit(catalog, "git_github_level1").code, "PH1");
  assert.equal(phaseForUnit(catalog, "week17").code, "PH2");
  assert.equal(phaseForUnit(catalog, "week32").code, "PH2");
  assert.equal(availablePhaseCodes(catalog), "PH1・PH2");
});

for (let week = 17; week <= 32; week++) {
  test(`PH2 Week${week}: Web・Nativeで12問を出題し、解答・保存・再開・完了が成立する`, () => {
    const key = `week${week}`;
    for (const web of [true, false]) {
      const questions = selectQuestions(catalog, key, "mix", web);
      assert.equal(questions.length, 12);
      assert.ok(
        questions.every(
          (q) =>
            !q.console &&
            !q.preview &&
            q.id.startsWith(`question-ph2-week${week}-`),
        ),
      );
      let progress = beginSession(
        emptyProgress(),
        catalog,
        key,
        "choice",
        3,
        web,
        () => 0.25,
      );
      for (let i = 0; i < 3; i++) {
        const q = currentQuestion(progress, catalog);
        progress = editDraft(
          progress,
          q,
          { optionId: correctOption(q), hintUsed: i === 0 },
          catalog,
        );
        progress = restoreProgress(JSON.stringify(progress), catalog);
        assert.equal(currentQuestion(progress, catalog).id, q.id);
        progress = submitAnswer(progress, q, catalog);
        assert.equal(
          submitAnswer(progress, q, catalog).answers.length,
          progress.answers.length,
        );
        progress = nextQuestion(progress, catalog);
      }
      assert.equal(progress.answers.length, 3);
      assert.ok(progress.answers.every((a) => a.correct && a.revision === 1));
      assert.equal(progress.answers[0].hintUsed, true);
      assert.ok(progress.session.completedAt);
      assert.equal(
        restoreProgress(JSON.stringify(progress), catalog).answers.length,
        3,
      );
    }
  });
}
test("PH2のドリル・補足教材が変われば再確認を要求する", () => {
  const data = structuredClone(load(root));
  const row = data.rows.find((r) => r.unit.phase === "PH2");
  row.entry.author.supportingSources[0].sha256 = "0".repeat(64);
  assert.ok(
    validate(data, { workspace: process.env.QUIZ_WORKSPACE }).some((s) =>
      s.includes("ドリル・補足教材が更新"),
    ),
  );
});
test("phaseを指定してPH2の空単元を追加し、既存を上書きしない", () => {
  const work = fs.mkdtempSync(path.join(os.tmpdir(), "zunzun-ph2-init-"));
  try {
    fs.cpSync(path.join(root, "content"), path.join(work, "content"), {
      recursive: true,
    });
    fs.cpSync(path.join(root, "scripts"), path.join(work, "scripts"), {
      recursive: true,
    });
    const cmd = (phase) =>
      spawnSync(
        process.execPath,
        [
          path.join(work, "scripts/init-week.js"),
          "--week",
          "week33",
          "--phase",
          phase,
        ],
        { encoding: "utf8" },
      );
    assert.equal(cmd("PH9").status, 1);
    assert.equal(cmd("PH2").status, 0);
    const unit = load(work).units.find((u) => u.key === "week33");
    assert.equal(unit.phase, "PH2");
    assert.equal(unit.file, "PH2/weeks/week33.json");
    assert.deepEqual(
      JSON.parse(
        fs.readFileSync(path.join(work, "content", unit.file), "utf8"),
      ),
      [],
    );
    assert.equal(cmd("PH2").status, 1);
  } finally {
    fs.rmSync(work, { recursive: true, force: true });
  }
});
