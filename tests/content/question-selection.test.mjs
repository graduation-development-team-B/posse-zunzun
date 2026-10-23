import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { selectQuestions } from "../../src/lib/quiz/core.ts";
import {
  beginSession,
  emptyProgress,
  restoreProgress,
} from "../../src/lib/quiz/session.ts";

const { catalog } = JSON.parse(
  fs.readFileSync(
    new URL("../../src/data/generated/catalog.json", import.meta.url),
    "utf8",
  ),
);
const candidates = selectQuestions(catalog, "week1", "mix", true);

function answer(question, index, revision = question.learning.revision) {
  const sessionId = `history-${index}`;
  return {
    id: `${sessionId}:${question.id}`,
    sessionId,
    questionId: question.id,
    revision,
    weekUnitId: question.weekUnitId,
    correct: index % 2 === 0,
    hintUsed: false,
    explanationRead: false,
    optionId: "",
    at: new Date(2026, 9, 22, 12, index).toISOString(),
    xp: index % 2 === 0 ? 10 : 5,
  };
}
const start = (state, count = 3, random = () => 0) =>
  beginSession(state, catalog, "week1", "mix", count, true, random);

test("毎回同じ乱数でも、未回答を残したまま正解済み・誤答済みを繰り返さない", () => {
  let state = emptyProgress();
  const seen = new Set();
  while (seen.size < candidates.length) {
    const next = start(state, Math.min(3, candidates.length - seen.size));
    for (const ref of next.session.refs) {
      assert.equal(
        seen.has(ref.id),
        false,
        "未回答が残っている間は新しい問題を選ぶ",
      );
      seen.add(ref.id);
      const question = candidates.find((q) => q.id === ref.id);
      state = {
        ...state,
        answers: [...state.answers, answer(question, state.answers.length)],
      };
    }
  }
  assert.equal(seen.size, candidates.length);
  assert.equal(start(state).session.refs.length, 3, "一巡後も出題を続けられる");
});

test("未回答が1問だけなら先頭に出し、残りは既回答で埋めて同じ回では重複させない", () => {
  const state = {
    ...emptyProgress(),
    answers: candidates.slice(1).map((q, i) => answer(q, i)),
  };
  const next = start(state);
  assert.equal(next.session.refs[0].id, candidates[0].id);
  assert.equal(next.session.refs.length, 3);
  assert.equal(new Set(next.session.refs.map((ref) => ref.id)).size, 3);
});

test("一巡後は回答回数が少ない順になり、履歴の並び順に依存しない", () => {
  const answers = candidates.map((q, i) => answer(q, i));
  answers.push(
    answer(candidates[0], 100),
    answer(candidates[0], 101),
    answer(candidates[1], 102),
  );
  const state = { ...emptyProgress(), answers };
  const refs = start(state, candidates.length).session.refs;
  assert.equal(refs.at(-1).id, candidates[0].id);
  assert.equal(refs.at(-2).id, candidates[1].id);
  assert.deepEqual(
    refs,
    start({ ...state, answers: [...answers].reverse() }, candidates.length)
      .session.refs,
  );
});

test("回答回数が同じならランダムな順序を維持する", () => {
  const first = start(emptyProgress(), candidates.length, () => 0).session.refs;
  const second = start(emptyProgress(), candidates.length, () => 0.999).session
    .refs;
  assert.notDeepEqual(first, second);
  assert.deepEqual(
    new Set(first.map((ref) => ref.id)),
    new Set(second.map((ref) => ref.id)),
  );
});

test("同じIDでも改訂前の回答を最新版への回答に数えない", () => {
  const revised = structuredClone(catalog);
  const question = revised.questions.find((q) => q.id === candidates[0].id);
  question.learning.revision++;
  const state = {
    ...emptyProgress(),
    answers: candidates.map((q, i) => answer(q, i)),
  };
  const next = beginSession(state, revised, "week1", "mix", 1, true, () => 0);
  assert.deepEqual(next.session.refs, [
    { id: question.id, revision: question.learning.revision },
  ]);
});

test("Week・形式・端末・公開状態の絞り込みを維持する", () => {
  const filtered = structuredClone(catalog);
  filtered.questions.find((q) => q.id === candidates[0].id).published = false;
  filtered.questions.find((q) => q.id === candidates[1].id).deleted = true;
  for (const web of [true, false]) {
    for (const mode of ["mix", "choice", "preview", "console", "terminal", "assembly"]) {
      const allowed = selectQuestions(filtered, "week1", mode, web);
      if (!allowed.length) continue;
      const next = beginSession(
        emptyProgress(),
        filtered,
        "week1",
        mode,
        15,
        web,
        () => 0,
      );
      assert.deepEqual(
        new Set(next.session.refs.map((ref) => ref.id)),
        new Set(allowed.map((q) => q.id)),
      );
    }
  }
});

test("抽選で既存の履歴を書き換えず、保存・再開しても出題順を維持する", () => {
  const state = { ...emptyProgress(), answers: [answer(candidates[0], 0)] };
  const before = JSON.stringify(state);
  const next = start(state);
  assert.equal(JSON.stringify(state), before);
  assert.deepEqual(next.answers, state.answers);
  assert.deepEqual(
    restoreProgress(JSON.stringify(next), catalog).session.refs,
    next.session.refs,
  );
});
