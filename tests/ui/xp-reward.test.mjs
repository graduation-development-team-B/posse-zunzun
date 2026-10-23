import test from "node:test";
import assert from "node:assert/strict";
import { xpTimeline, xpFrame } from "../../src/lib/progress/xp-animation.ts";

test("獲得した15XPだけを55から70まで追加し、既存部分は55のまま保つ", () => {
  const timeline = xpTimeline(4255, 4270);
  assert.equal(timeline.gained, 15);
  assert.equal(xpFrame(timeline, 0).total, 4255);
  for (let time = 0; time <= timeline.duration; time += 10) {
    const frame = xpFrame(timeline, time);
    assert.equal(frame.baseline, 55);
    assert.ok(frame.xp >= 55 && frame.xp <= 70);
    assert.ok(frame.xp - frame.baseline <= 15);
  }
  assert.equal(xpFrame(timeline, timeline.duration).total, 4270);
  assert.equal(xpFrame(timeline, timeline.duration).xp, 70);
});

test("レベルをまたぐ30XPは90→100を見せてから0→20と溜まる", () => {
  const timeline = xpTimeline(90, 120);
  assert.equal(timeline.segments.length, 2);
  const full = xpFrame(timeline, timeline.segments[0].end + 100);
  assert.equal(full.level, 1);
  assert.equal(full.xp, 100);
  assert.equal(full.total, 100);
  const next = xpFrame(timeline, timeline.segments[1].start + 1);
  assert.equal(next.level, 2);
  assert.equal(next.baseline, 0);
  assert.ok(next.xp < 1);
  const final = xpFrame(timeline, timeline.duration);
  assert.equal(final.level, 2);
  assert.equal(final.xp, 20);
  assert.equal(final.total, 120);
});

test("ぴったり満タンと複数レベルアップでもXPを増やしすぎない", () => {
  for (const [before, after] of [
    [90, 100],
    [0, 225],
    [495, 720],
  ]) {
    const timeline = xpTimeline(before, after);
    let previous = before;
    for (let time = 0; time <= timeline.duration; time += 5) {
      const frame = xpFrame(timeline, time);
      assert.ok(frame.total >= previous);
      assert.ok(frame.total <= after);
      assert.ok(frame.xp >= 0 && frame.xp <= 100);
      previous = frame.total;
    }
    assert.equal(xpFrame(timeline, timeline.duration).total, after);
    assert.equal(xpFrame(timeline, timeline.duration).xp, after % 100);
  }
});

test("獲得ゼロと動きを抑える場合の最終フレームは確定値を表示する", () => {
  const zero = xpTimeline(4270, 4270);
  assert.equal(zero.duration, 0);
  assert.equal(xpFrame(zero, 0).xp, 70);
  const timeline = xpTimeline(90, 120);
  assert.deepEqual(
    [
      xpFrame(timeline, timeline.duration).total,
      xpFrame(timeline, timeline.duration).level,
    ],
    [120, 2],
  );
});
