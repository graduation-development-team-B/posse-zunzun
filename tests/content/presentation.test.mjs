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
test("未回答なら記録・バッジは未獲得で、当月の日数と曜日を表示する", () => {
  const p = presentationData(
    emptyProgress(),
    catalog,
    new Date(2024, 1, 29, 12),
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
