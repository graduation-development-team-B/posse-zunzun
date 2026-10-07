import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
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

const { catalog } = JSON.parse(
  fs.readFileSync(
    new URL("../../src/data/generated/catalog.json", import.meta.url),
    "utf8",
  ),
);

test("PH1はWeek01〜16、その後に既存Git単元を表示する", () => {
  assert.deepEqual(
    catalog.weekUnits
      .filter((u) => !u.phase || u.phase === "PH1")
      .map((u) => u.key),
    [
      ...Array.from({ length: 16 }, (_, i) => `week${i + 1}`),
      "git_github_level1",
    ],
  );
  assert.equal(
    catalog.questions.filter((q) => !q.id.startsWith("question-ph2-")).length,
    202,
  );
  assert.equal(selectQuestions(catalog, "git", "terminal", false).length, 10);
});

for (let week = 7; week <= 16; week++) {
  test(`Week${week}: 新規12問を出題でき、3問の回答・保存・再開・完了が成立する`, () => {
    const key = `week${week}`;
    const all = selectQuestions(catalog, key, "mix", true);
    assert.equal(all.length, 12);
    assert.equal(
      selectQuestions(catalog, key, "mix", false).length,
      [8, 9].includes(week) ? 10 : 12,
    );
    let progress = beginSession(
      emptyProgress(),
      catalog,
      key,
      "choice",
      3,
      true,
      () => 0.25,
    );
    for (let i = 0; i < 3; i++) {
      const q = currentQuestion(progress, catalog);
      assert.ok(q.id.startsWith(`question-week${week}-`));
      progress = editDraft(
        progress,
        q,
        { optionId: correctOption(q), hintUsed: i === 0 },
        catalog,
      );
      progress = restoreProgress(JSON.stringify(progress), catalog);
      assert.equal(currentQuestion(progress, catalog).id, q.id);
      progress = submitAnswer(progress, q, catalog);
      const once = JSON.stringify(progress);
      assert.equal(JSON.stringify(submitAnswer(progress, q, catalog)), once);
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
  });
}
