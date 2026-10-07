import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import {
  codeFor,
  correctOption,
  gradeChoice,
  questionMode,
  selectQuestions,
  splitTokens,
  tokenOption,
} from "../../src/lib/quiz/core.ts";
import {
  emptyProgress,
  beginSession,
  editDraft,
  submitAnswer,
  nextQuestion,
  currentQuestion,
  draftFor,
  restoreProgress,
  metrics,
} from "../../src/lib/quiz/session.ts";
import {
  createTerminalStageState,
  runTerminalStageCommand,
  resolveTerminalStage,
} from "../../src/lib/quiz/terminalToken.ts";
import { buildConsoleWorkerSource } from "../../src/lib/quiz/consoleExecution.ts";
import { buildPreviewDocument } from "../../src/lib/quiz/previewDocument.ts";
const require = createRequire(import.meta.url);
const { load, validate, generate } = require("../../scripts/content-lib.cjs");
const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const data = load(root);
const response = generate(data);
const catalog = response.catalog;
const original = JSON.parse(
  fs.readFileSync(
    path.join(root, "docs/migration/original-questions.json"),
    "utf8",
  ),
);
function runCode(code) {
  let result;
  vm.runInNewContext(
    buildConsoleWorkerSource(code),
    {
      self: {
        postMessage: (r) => {
          result = r;
        },
      },
      Object,
      Error,
    },
    { timeout: 300 },
  );
  return result;
}
test("移行対象82問の内容・author・ID・順序を保持", () => {
  assert.equal(original.length, 82);
  for (const source of original)
    assert.deepEqual(
      data.entries.find((e) => e.question.id === source.question.id).author,
      source.author,
    );
  for (const u of catalog.weekUnits) {
    const ids = new Set(original.map((e) => e.question.id));
    assert.deepEqual(
      data.entries
        .filter((e) => e.question.weekUnitId === u.id && ids.has(e.question.id))
        .map((e) => e.question.id),
      original
        .filter((e) => e.question.weekUnitId === u.id)
        .map((e) => e.question.id),
    );
  }
  for (const q of catalog.questions) {
    const source = original.find((e) => e.question.id === q.id);
    if (!source) continue;
    const { learning, ...raw } = q;
    assert.deepEqual(raw, source.question);
    assert.equal(learning.revision, source.author.revision);
  }
});
test("正本・生成物・単元件数が一致", () => {
  assert.deepEqual(
    response,
    JSON.parse(
      fs.readFileSync(
        path.join(root, "src/data/generated/catalog.json"),
        "utf8",
      ),
    ),
  );
  for (const u of catalog.weekUnits) {
    const n = catalog.questions.filter((q) => q.weekUnitId === u.id).length;
    assert.ok(n >= 10 && n <= 15);
  }
  assert.equal(
    new Set(catalog.questions.map((q) => q.id)).size,
    catalog.questions.length,
  );
  assert.deepEqual(
    validate(data, { workspace: process.env.QUIZ_WORKSPACE }),
    [],
  );
});
test("draftは公開されず、存在しない正答・重複ID・不正形式を検出", () => {
  const copy = structuredClone(data);
  copy.entries[0].status = "draft";
  copy.entries[0].question.published = false;
  assert.equal(
    generate(copy).catalog.questions.length,
    catalog.questions.length - 1,
  );
  const invalid = structuredClone(data);
  invalid.rows[0].entry.question.payload.correctOptionId = "missing";
  invalid.rows[1].entry.question.id = invalid.rows[0].entry.question.id;
  assert.ok(
    validate(invalid, { skipSources: true }).some((s) => s.includes("正答ID")),
  );
  assert.ok(
    validate(invalid, { skipSources: true }).some((s) => s.includes("重複")),
  );
  const free = structuredClone(data);
  free.rows.find(
    (r) => r.entry.question.format === "fillBlank",
  ).entry.question.payload.mode = "freeText";
  assert.ok(
    validate(free, { skipSources: true }).some((s) => s.includes("候補選択")),
  );
});
test("単元キー互換・形式フィルタ・出題不能条件", () => {
  assert.equal(selectQuestions(catalog, "w01", "mix", true).length, 12);
  assert.equal(selectQuestions(catalog, "week1", "preview", true).length, 2);
  assert.equal(selectQuestions(catalog, "week6", "console", false).length, 0);
  assert.equal(selectQuestions(catalog, "git", "terminal", true).length, 10);
  assert.throws(() =>
    beginSession(emptyProgress(), catalog, "unknown", "mix", 3, true),
  );
  assert.throws(() =>
    beginSession(emptyProgress(), catalog, "week1", "mix", 0, true),
  );
  const p = beginSession(
    emptyProgress(),
    catalog,
    "week1",
    "preview",
    10,
    true,
    () => 0.2,
  );
  assert.equal(p.session.refs.length, 2);
});
for (const q of catalog.questions) {
  if (questionMode(q) === "choice")
    test(`${q.id}: 全候補の正誤と誤答理由`, () => {
      assert.equal(gradeChoice(q, "missing").canSubmit, false);
      for (const o of q.payload.options) {
        const r = gradeChoice(q, o.id);
        assert.equal(r.correct, o.id === correctOption(q));
        if (!r.correct) assert.ok(r.reason.length);
      }
    });
  if (q.preview)
    test(`${q.id}: 全トークン候補・クラス順序・実表示用HTML`, () => {
      for (const o of q.payload.options) {
        const tokens = splitTokens(q, o.text);
        assert.equal(tokenOption(q, tokens), o.id);
        assert.ok(
          buildPreviewDocument(codeFor(q, "", tokens)).includes(
            "<!doctype html>",
          ),
        );
      }
      const good = splitTokens(
        q,
        q.payload.options.find((o) => o.id === correctOption(q)).text,
      );
      if (q.preview.inputMode === "classes")
        assert.equal(tokenOption(q, [...good].reverse()), correctOption(q));
      let p = beginSession(
        emptyProgress(),
        { ...catalog, questions: [q] },
        q.sourceReference.weekKey,
        "preview",
        1,
        true,
      );
      p = editDraft(p, q, { tokens: good }, catalog);
      assert.throws(() => submitAnswer(p, q, catalog));
      assert.throws(() =>
        submitAnswer(p, q, catalog, {
          input: JSON.stringify(good),
          executed: "old",
        }),
      );
      assert.equal(
        submitAnswer(p, q, catalog, {
          input: JSON.stringify(good),
          executed: JSON.stringify(good),
        }).answers[0].correct,
        true,
      );
    });
  if (q.console)
    test(`${q.id}: 全候補を実行し出力と採点を照合`, () => {
      for (const o of q.payload.options) {
        const result = runCode(codeFor(q, o.id, []));
        let p = beginSession(
          emptyProgress(),
          { ...catalog, questions: [q] },
          q.sourceReference.weekKey,
          "console",
          1,
          true,
        );
        p = editDraft(p, q, { optionId: o.id }, catalog);
        const end = submitAnswer(p, q, catalog, {
          input: o.id,
          executed: o.id,
          ...result,
        });
        assert.equal(end.answers[0].correct, o.id === correctOption(q));
      }
    });
  if (q.payload.kind === "activityRef")
    test(`${q.id}: Git/PRを独立状態から完了・復元`, () => {
      const { stage } = resolveTerminalStage(catalog, q.payload);
      const start = createTerminalStageState(stage);
      assert.equal(
        runTerminalStageCommand(stage, start, ["invalid"]).isComplete,
        false,
      );
      const terminal = stage.goal.commandSequence.reduce(
        (s, cmd) => runTerminalStageCommand(stage, s, cmd),
        start,
      );
      assert.equal(terminal.isComplete, true);
      let p = beginSession(
        emptyProgress(),
        { ...catalog, questions: [q] },
        q.sourceReference.weekKey,
        "terminal",
        1,
        true,
      );
      p = editDraft(p, q, { terminal }, catalog);
      p = restoreProgress(JSON.stringify(p), catalog);
      assert.equal(draftFor(p, q, catalog).terminal.isComplete, true);
      assert.equal(submitAnswer(p, q, catalog).answers[0].correct, true);
    });
}
test("指定5問を完了・再開し、二重確定とヒント利用を正しく扱う", () => {
  let p = beginSession(
    emptyProgress(),
    catalog,
    "week3",
    "choice",
    5,
    true,
    () => 0.4,
  );
  assert.equal(new Set(p.session.refs.map((r) => r.id)).size, 5);
  while (currentQuestion(p, catalog)) {
    const q = currentQuestion(p, catalog);
    p = editDraft(
      p,
      q,
      { optionId: correctOption(q), hintUsed: true },
      catalog,
    );
    p = submitAnswer(p, q, catalog);
    const count = p.answers.length;
    p = submitAnswer(p, q, catalog);
    assert.equal(p.answers.length, count);
    p = restoreProgress(JSON.stringify(p), catalog);
    p = nextQuestion(p, catalog);
  }
  assert.ok(p.session.completedAt);
  assert.equal(p.answers.length, 5);
  assert.equal(metrics(p).xp, 50);
  assert.ok(p.answers.every((a) => a.hintUsed));
});
test("途中の入力を復元し、問題の版が変わったらセッションだけ破棄", () => {
  let p = beginSession(
    emptyProgress(),
    catalog,
    "week1",
    "choice",
    3,
    true,
    () => 0.5,
  );
  const q = currentQuestion(p, catalog);
  p = editDraft(p, q, { optionId: correctOption(q) }, catalog);
  assert.equal(
    draftFor(restoreProgress(JSON.stringify(p), catalog), q, catalog).optionId,
    correctOption(q),
  );
  p = submitAnswer(p, q, catalog);
  const changed = structuredClone(catalog);
  changed.questions.find((x) => x.id === q.id).learning.revision++;
  const restored = restoreProgress(JSON.stringify(p), changed);
  assert.equal(restored.session, null);
  assert.equal(restored.answers.length, 1);
  assert.deepEqual(restoreProgress("broken", catalog), emptyProgress());
});
test("保存データの偽の完了状態・不正トークンを信用しない", () => {
  const q = catalog.questions.find((q) => q.payload.kind === "activityRef");
  let p = beginSession(
    emptyProgress(),
    { ...catalog, questions: [q] },
    q.sourceReference.weekKey,
    "terminal",
    1,
    true,
  );
  p.session.drafts[q.id] = {
    optionId: "x",
    tokens: ["invalid"],
    hintUsed: false,
    terminal: {
      isComplete: true,
      history: [],
      cwd: [],
      completedCommandCount: 100,
    },
  };
  p = restoreProgress(JSON.stringify(p), catalog);
  assert.equal(draftFor(p, q, catalog).terminal.isComplete, false);
  assert.deepEqual(draftFor(p, q, catalog).tokens, []);
});
test("連続日数・最長記録・見直し候補は実履歴から計算", () => {
  const mk = (id, day, correct) => ({
    id: `s${id}:q`,
    sessionId: `s${id}`,
    questionId: "q",
    revision: 1,
    weekUnitId: "u",
    correct,
    hintUsed: false,
    optionId: "a",
    at: new Date(2026, 9, day, 12).toISOString(),
    xp: correct ? 10 : 5,
  });
  const p = {
    version: 1,
    session: null,
    answers: [mk(1, 1, false), mk(2, 2, false), mk(3, 3, true)],
  };
  const m = metrics(p, new Date(2026, 9, 4, 12));
  assert.equal(m.streak, 3);
  assert.equal(m.longest, 3);
  assert.equal(m.xp, 20);
  assert.deepEqual(m.reviewIds, []);
});
