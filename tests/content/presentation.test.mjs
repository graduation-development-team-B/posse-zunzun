import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  presentationData,
  levelDisplay,
} from "../../src/lib/progress/presentation.ts";
import { emptyProgress } from "../../src/lib/quiz/session.ts";
const { catalog } = JSON.parse(
  fs.readFileSync(
    new URL("../../src/data/generated/catalog.json", import.meta.url),
    "utf8",
  ),
);
const q = catalog.questions[0];
const answer = (at, correct = true, revision = q.learning.revision) => ({
  id: at,
  sessionId: at,
  questionId: q.id,
  revision,
  weekUnitId: q.weekUnitId,
  correct,
  hintUsed: false,
  optionId: "",
  at,
  xp: correct ? 10 : 5,
});
test("選択PHで未回答なら記録・バッジは未獲得で、当月の日数と曜日を表示する", () => {
  const p = presentationData(
    emptyProgress(),
    catalog,
    new Date(2024, 1, 29, 12),
    "PH1",
  );
  assert.equal(p.stats.xp, 0);
  assert.equal(p.weeks[0].state, "now");
  assert.equal(p.weeks[0].done, 0);
  assert.equal(p.weeks[1].state, "next");
  assert.ok(p.weeks.slice(2).every((w) => w.state === "lock"));
  assert.equal(p.calendar.days, 29);
  assert.equal(p.calendar.startOffset, 4);
  assert.equal(p.calendar.today, 29);
  assert.ok(p.badges.every((b) => !b.got));
  assert.equal(p.todayStudied, false);
});
test("年をまたぐ実記録を週表示・当月カレンダー・XPへ接続する", () => {
  const now = new Date(2027, 0, 1, 12);
  const state = {
    ...emptyProgress(),
    answers: [
      answer(new Date(2026, 11, 31, 12).toISOString()),
      answer(now.toISOString()),
    ],
  };
  const p = presentationData(state, catalog, now);
  assert.equal(p.stats.xp, 20);
  assert.equal(p.calendar.counts[1], 1);
  assert.equal(p.calendar.counts[31], undefined);
  assert.equal(p.days[5].kind, "done");
  assert.equal(p.days[6].kind, "done");
  assert.equal(p.todayStudied, true);
  assert.equal(p.weeks[0].done, 1);
  assert.equal(p.badges[0].got, true);
});
test("正解でも古い改訂版を現在のWeek達成数に加算しない", () => {
  const state = {
    ...emptyProgress(),
    answers: [answer(new Date().toISOString(), true, q.learning.revision - 1)],
  };
  assert.equal(presentationData(state, catalog).weeks[0].done, 0);
});
test("見直しタグは直近の誤答から作り、解き直して正解したら消える", () => {
  const now = new Date();
  const state = {
    ...emptyProgress(),
    answers: [answer(new Date(now.getTime() - 1000).toISOString(), false)],
  };
  assert.equal(presentationData(state, catalog).reviewTags.length, 1);
  state.answers.push(answer(now.toISOString(), true));
  assert.deepEqual(presentationData(state, catalog).reviewTags, []);
});
test("レベルの表示計算で保存済みXPは書き換えない", () => {
  assert.deepEqual(
    [
      levelDisplay(0).level,
      levelDisplay(99).remaining,
      levelDisplay(100).level,
      levelDisplay(100).xp,
    ],
    [1, 1, 2, 0],
  );
  const state = emptyProgress();
  const before = JSON.stringify(state);
  presentationData(state, catalog);
  assert.equal(JSON.stringify(state), before);
});

test("選択PHのおすすめ・見直しだけを表示し、継続日数とXPは全PHの記録を使う", () => {
  const ph2Question = catalog.questions.find((question) =>
    catalog.weekUnits.some(
      (unit) => unit.id === question.weekUnitId && unit.phase === "PH2",
    ),
  );
  const now = new Date(2026, 9, 22, 12);
  const previousDay = new Date(2026, 9, 21, 12);
  const state = {
    ...emptyProgress(),
    answers: [
      answer(previousDay.toISOString(), false),
      {
        ...answer(now.toISOString(), false),
        questionId: ph2Question.id,
        weekUnitId: ph2Question.weekUnitId,
        revision: ph2Question.learning.revision,
      },
    ],
  };
  const before = JSON.stringify(state);
  const ph1 = presentationData(state, catalog, now, "PH1");
  const ph2 = presentationData(state, catalog, now, "PH2");
  assert.equal(ph1.next.id, "week1");
  assert.equal(ph2.next.id, "week17");
  assert.equal(ph1.weeks.length, 17);
  assert.equal(ph2.weeks.length, 16);
  assert.ok(ph1.weeks.every((week) => week.phase === "PH1"));
  assert.ok(ph2.weeks.every((week) => week.phase === "PH2"));
  assert.deepEqual(ph1.stats.reviewIds, [q.id]);
  assert.deepEqual(ph2.stats.reviewIds, [ph2Question.id]);
  assert.equal(ph2.reviewTags.length, 1);
  assert.equal(ph2.stats.streak, 2);
  assert.equal(ph2.stats.xp, 10);
  assert.equal(ph2.stats.answered, 2);
  assert.equal(ph2.days[5].kind, "done");
  assert.equal(ph2.days[6].kind, "done");
  assert.equal(JSON.stringify(state), before);
});

test("選択外のPHも展開用データとWeek選択先を保持し、獲得済みバッジも残す", () => {
  const firstUnit = catalog.weekUnits[0];
  const state = {
    ...emptyProgress(),
    answers: catalog.questions
      .filter((question) => question.weekUnitId === firstUnit.id)
      .map((question, index) => ({
        ...answer(new Date(2026, 9, 22, 12, index).toISOString()),
        questionId: question.id,
        weekUnitId: question.weekUnitId,
        revision: question.learning.revision,
      })),
  };
  const data = presentationData(
    state,
    catalog,
    new Date(2026, 9, 22, 13),
    "PH2",
  );
  assert.equal(data.phaseGroups.length, 3);
  assert.equal(
    data.phaseGroups.find((group) => group.code === "PH1").weeks[0].state,
    "done",
  );
  assert.equal(
    data.phaseGroups.find((group) => group.code === "PH2").weeks[0].state,
    "now",
  );
  assert.equal(data.allWeeks.length, catalog.weekUnits.length);
  assert.equal(
    data.allWeeks.find((week) => week.id === "week1").done,
    state.answers.length,
  );
  assert.equal(data.badges.find((badge) => badge.mark === "W1").got, true);
});

test("プロフィールPHの読み込み前に全PHのおすすめや見直し問題を表示しない", () => {
  const data = presentationData(
    { ...emptyProgress(), answers: [answer(new Date().toISOString(), false)] },
    catalog,
    new Date(),
    "",
  );
  assert.deepEqual(data.weeks, []);
  assert.deepEqual(data.stats.reviewIds, []);
  assert.deepEqual(data.reviewTags, []);
  assert.equal(data.next, undefined);
  assert.equal(data.phaseGroups.length, 3);
});
