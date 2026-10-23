import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import {
  correctOption,
  questionMode,
  tokenBank,
  tokenOption,
  codeFor,
  selectQuestions,
} from "../../src/lib/quiz/core.ts";
import {
  beginSession,
  emptyProgress,
  editDraft,
  submitAnswer,
  restoreProgress,
  draftFor,
  currentQuestion,
  nextQuestion,
} from "../../src/lib/quiz/session.ts";
const require = createRequire(import.meta.url);
const { load, validate, generate } = require("../../scripts/content-lib.cjs");
const data = load();
const { catalog } = generate(data);
const questions = catalog.questions.filter((q) => q.assembly);
const weeks = [
  3,
  4,
  5,
  7,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  ...Array.from({ length: 16 }, (_, i) => i + 17),
  ...Array.from({ length: 16 }, (_, i) => i + 33),
];

test("PH1・2の27WeekとPH3の16Weekに各5問、既存の実行問題があるWeekには追加しない", () => {
  assert.equal(questions.length, 215);
  assert.deepEqual(
    [
      ...new Set(
        questions.map((q) => Number(q.sourceReference.weekKey.slice(4))),
      ),
    ],
    weeks,
  );
  for (const week of weeks) {
    assert.equal(
      selectQuestions(catalog, `week${week}`, "assembly", true).length,
      5,
    );
    assert.equal(
      selectQuestions(catalog, `week${week}`, "assembly", false).length,
      5,
    );
    assert.equal(
      selectQuestions(catalog, `week${week}`, "choice", true).length,
      week >= 33 ? 10 : 12,
    );
  }
});
for (const q of questions) {
  test(`${q.id}: 全候補・不完全入力・過剰入力を実行なしで採点`, () => {
    assert.equal(questionMode(q), "assembly");
    assert.ok(tokenBank(q).length >= 3);
    for (const o of q.payload.options) {
      const tokens = q.assembly.optionTokens[o.id];
      assert.equal(tokenOption(q, tokens), o.id);
      assert.equal(
        codeFor(q, "", tokens),
        q.payload.content.replace(q.payload.blankToken, () => o.text),
      );
      let state = beginSession(
        emptyProgress(),
        { ...catalog, questions: [q] },
        q.sourceReference.weekKey,
        "assembly",
        1,
        false,
      );
      assert.throws(() => submitAnswer(state, q, catalog));
      state = editDraft(state, q, { tokens, hintUsed: true }, catalog);
      state = restoreProgress(JSON.stringify(state), catalog);
      assert.deepEqual(draftFor(state, q, catalog).tokens, tokens);
      state = submitAnswer(state, q, catalog);
      assert.equal(state.answers[0].correct, o.id === correctOption(q));
      assert.equal(state.answers[0].hintUsed, true);
      assert.equal(state.answers[0].xp, o.id === correctOption(q) ? 10 : 5);
      assert.equal(submitAnswer(state, q, catalog).answers.length, 1);
    }
    const good = q.assembly.optionTokens[correctOption(q)];
    assert.notEqual(tokenOption(q, good.slice(0, -1)), correctOption(q));
    assert.notEqual(tokenOption(q, [...good, good[0]]), correctOption(q));
    assert.equal(
      tokenOption(q, [...good].reverse()) === correctOption(q),
      q.assembly.inputMode === "classes",
    );
  });
}
test("各Weekの5問を正誤混在で回答・再開し、セッションを完了する", () => {
  for (const week of weeks)
    for (const web of [true, false]) {
      let state = beginSession(
        emptyProgress(),
        catalog,
        `week${week}`,
        "assembly",
        5,
        web,
        () => 0.25,
      );
      while (currentQuestion(state, catalog)) {
        const q = currentQuestion(state, catalog);
        const option = state.session.cursor === 1 ? "wrong" : "correct";
        state = editDraft(
          state,
          q,
          { tokens: q.assembly.optionTokens[option] },
          catalog,
        );
        state = submitAnswer(state, q, catalog);
        state = restoreProgress(JSON.stringify(state), catalog);
        state = nextQuestion(state, catalog);
      }
      assert.ok(state.session.completedAt);
      assert.equal(state.answers.length, 5);
      assert.equal(state.answers.filter((a) => a.correct).length, 4);
    }
});
test("不正トークンの復元と確定を防ぎ、定義の欠落・実行モード重複を検出する", () => {
  const q = questions[0];
  let state = beginSession(
    emptyProgress(),
    { ...catalog, questions: [q] },
    q.sourceReference.weekKey,
    "assembly",
    1,
    true,
  );
  state = editDraft(state, q, { tokens: ["<invalid>"] }, catalog);
  assert.throws(() => submitAnswer(state, q, catalog));
  assert.deepEqual(
    draftFor(restoreProgress(JSON.stringify(state), catalog), q, catalog)
      .tokens,
    [],
  );
  const copy = structuredClone(data);
  const entry = copy.rows.find((r) => r.entry.question.assembly).entry;
  entry.question.assembly.optionTokens.correct = ["bad"];
  entry.question.console = { expectedOutput: [] };
  const issues = validate(copy, { skipSources: true });
  assert.ok(issues.some((x) => x.includes("組み立て候補が不正")));
  assert.ok(issues.some((x) => x.includes("重複した実行形式")));
});
test("draftの組み立て問題は配信用データに含めない", () => {
  const copy = structuredClone(data);
  const entry = copy.entries.find((e) => e.question.assembly);
  entry.status = "draft";
  entry.question.published = false;
  assert.equal(
    generate(copy).catalog.questions.length,
    catalog.questions.length - 1,
  );
});
