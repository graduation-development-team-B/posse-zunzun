import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { phaseForUnit } from "../../src/lib/content/phase.ts";
import { selectQuestions } from "../../src/lib/quiz/core.ts";
import { beginSession, emptyProgress } from "../../src/lib/quiz/session.ts";
const require = createRequire(import.meta.url);
const {
  root,
  load,
  validate,
  generate,
} = require("../../scripts/content-lib.cjs");
const data = load();
const { catalog } = generate(data);

test("PH3のJSON文字列の提示コードは構文が成立し、配列とは区別できる", () => {
  const q = catalog.questions.find((q) =>
    q.id === "question-ph3-week46-choice-json-object-versus-string",
  );
  const code = q.prompt.match(/^JSで(.+)とした場合/)[1];
  const result = vm.runInNewContext(
    `${code}\n[typeof data, Array.isArray(data), JSON.parse(data)[0].id]`,
    {},
    { timeout: 300 },
  );
  assert.deepEqual(Array.from(result), ["string", false, 1]);
});

test("PH3 Week33〜48へ各4択10問と組み立て5問、合計240問を公開し、既存529問も保持する", () => {
  const units = catalog.weekUnits.filter((u) => u.phase === "PH3");
  assert.deepEqual(
    units.map((u) => u.key),
    Array.from({ length: 16 }, (_, i) => `week${i + 33}`),
  );
  assert.equal(catalog.questions.length, 769);
  assert.equal(
    catalog.questions.filter((q) => q.id.startsWith("question-ph3-")).length,
    240,
  );
  assert.equal(
    catalog.questions.filter((q) => !q.id.startsWith("question-ph3-")).length,
    529,
  );
  for (const unit of units) {
    assert.equal(phaseForUnit(catalog, unit.key).code, "PH3");
    assert.equal(phaseForUnit(catalog, unit.key).sub, "Week33〜48");
    for (const web of [true, false]) {
      assert.equal(selectQuestions(catalog, unit.key, "mix", web).length, 15);
      assert.equal(
        selectQuestions(catalog, unit.key, "assembly", web).length,
        5,
      );
      assert.equal(selectQuestions(catalog, unit.key, "choice", web).length, 10);
      for (const count of [3, 5, 10]) {
        const progress = beginSession(
          emptyProgress(),
          catalog,
          unit.key,
          "assembly",
          count,
          web,
        );
        assert.equal(progress.session.refs.length, Math.min(count, 5));
      }
    }
    const canonical = data.rows.filter((r) => r.unit.id === unit.id);
    assert.ok(
      canonical.every(
        ({ entry: e }) =>
          e.status === "published" &&
          e.author.revision === 1 &&
          e.author.source.path === "curriculum/PH3.md",
      ),
    );
    assert.equal(data.units.find((u) => u.id === unit.id).minQuestions, 15);
  }
});
test("リポジトリ内の補足教材もSHAを検証し、更新とパス逸脱を検出する", () => {
  const copy = structuredClone(data);
  const entry = copy.rows.find(
    (r) => r.unit.phase === "PH3" && r.entry.author.supportingSources.length,
  ).entry;
  const source = entry.author.supportingSources[0];
  assert.equal(source.scope, "repository");
  source.sha256 = "0".repeat(64);
  assert.ok(validate(copy).some((x) => x.includes("ドリル・補足教材が更新")));
  source.path = "../outside.md";
  assert.ok(validate(copy).some((x) => x.includes("補足教材が見つからない")));
});
test("PH3補足教材のスナップショットを取得したコミットとハッシュへ固定する", () => {
  const manifest = JSON.parse(
    fs.readFileSync(
      path.join(root, "docs/quiz-sources/PH3/manifest.json"),
      "utf8",
    ),
  );
  assert.match(manifest.commit, /^[a-f0-9]{40}$/);
  for (const row of data.rows.filter((r) => r.unit.phase === "PH3"))
    for (const s of row.entry.author.supportingSources) {
      const suffix = s.path.replace("docs/quiz-sources/PH3/drill-ph3/", "");
      assert.equal(
        manifest.files.find((f) => f.path === suffix)?.sha256,
        s.sha256,
      );
    }
});

test("PH3の全Weekで4択10問をWeb/Native条件で完了し、誤答・ヒント・再開を記録する", async () => {
  const { correctOption } = await import("../../src/lib/quiz/core.ts");
  const { currentQuestion, editDraft, submitAnswer, nextQuestion, restoreProgress } =
    await import("../../src/lib/quiz/session.ts");
  for (const unit of catalog.weekUnits.filter((u) => u.phase === "PH3")) {
    const entries = data.rows.filter((r) => r.unit.id === unit.id && !r.entry.question.assembly);
    assert.equal(entries.length, 10);
    assert.equal(new Set(entries.map((r) => r.entry.question.prompt)).size, 10);
    for (const { entry: e } of entries) {
      assert.equal(e.question.payload.options.length, 4);
      assert.equal(Object.keys(e.question.payload.incorrectReasons).length, 3);
      assert.match(e.question.explanation, /PCでは/);
    }
    for (const web of [true, false]) {
      let state = beginSession(emptyProgress(), catalog, unit.key, "choice", 10, web, () => 0.25);
      assert.equal(new Set(state.session.refs.map((r) => r.id)).size, 10);
      while (currentQuestion(state, catalog)) {
        const q = currentQuestion(state, catalog);
        assert.equal(q.assembly, undefined);
        const optionId = state.session.cursor === 1
          ? q.payload.options.find((o) => o.id !== correctOption(q)).id
          : correctOption(q);
        state = editDraft(state, q, { optionId, hintUsed: state.session.cursor === 0 }, catalog);
        state = restoreProgress(JSON.stringify(state), catalog);
        state = submitAnswer(state, q, catalog);
        assert.equal(submitAnswer(state, q, catalog).answers.length, state.answers.length);
        state = nextQuestion(state, catalog);
      }
      assert.ok(state.session.completedAt);
      assert.equal(state.answers.length, 10);
      assert.equal(state.answers.filter((a) => a.correct).length, 9);
      assert.equal(state.answers.filter((a) => a.hintUsed).length, 1);
    }
  }
});
