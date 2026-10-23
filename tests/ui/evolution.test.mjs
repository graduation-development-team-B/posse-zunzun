import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { EVOLUTION_STAGES, levelDisplay, evolutionSprite } from "../../src/lib/progress/evolution.ts";
import { xpFrame, xpTimeline } from "../../src/lib/progress/xp-animation.ts";

test("ロードマップの10段階を対応レベルで解放し、境界の1XP前は前の姿を保つ", () => {
  assert.deepEqual(EVOLUTION_STAGES.map((s) => s.level), [10,20,30,40,50,60,70,80,90,100]);
  assert.equal(new Set(EVOLUTION_STAGES.map((s) => s.mascot)).size, 10);
  for (let i = 0; i < EVOLUTION_STAGES.length; i++) {
    const stage = EVOLUTION_STAGES[i];
    const threshold = (stage.level - 1) * 100;
    assert.equal(levelDisplay(threshold).level, stage.level);
    assert.equal(levelDisplay(threshold).mascot, stage.mascot);
    assert.equal(levelDisplay(threshold + 99).mascot, stage.mascot);
    if (i > 0) assert.equal(levelDisplay(threshold - 1).mascot, EVOLUTION_STAGES[i - 1].mascot);
  }
});

test("初期はたまご期、既存XPから次の進化を計算し、Lv100以降も最終形態を保つ", () => {
  assert.equal(levelDisplay(0).mascot, "egg");
  assert.equal(levelDisplay(899).mascot, "egg");
  const current = levelDisplay(4675);
  assert.equal(current.level, 47);
  assert.equal(current.name, "やる気期");
  assert.equal(current.xp, 75);
  assert.equal(current.remaining, 25);
  assert.equal(current.nextEvolution.level, 50);
  assert.equal(current.evolutionRemaining, 225);
  for (const xp of [9900, 10000, 15000]) {
    assert.equal(levelDisplay(xp).mascot, "legend");
    assert.equal(levelDisplay(xp).nextEvolution, null);
    assert.equal(levelDisplay(xp).evolutionRemaining, 0);
  }
});

test("全進化の直前をまたぐXP演出は、満タンを見せてから新しい姿へ変わる", () => {
  for (const stage of EVOLUTION_STAGES.slice(1)) {
    const threshold = (stage.level - 1) * 100;
    const timeline = xpTimeline(threshold - 10, threshold + 20);
    const before = xpFrame(timeline, 0);
    const full = xpFrame(timeline, timeline.segments[0].end + 100);
    const after = xpFrame(timeline, timeline.duration);
    const mascotForFrame = (frame) => levelDisplay((frame.level - 1) * 100).mascot;
    assert.notEqual(mascotForFrame(before), stage.mascot);
    assert.equal(mascotForFrame(full), mascotForFrame(before));
    assert.equal(full.xp, 100);
    assert.equal(mascotForFrame(after), stage.mascot);
    assert.equal(after.total, threshold + 20);
  }
});

test("全10段階は透過アトラスの別々のセルを表示し、旧表情はアトラスへ混ぜない", () => {
  assert.deepEqual(EVOLUTION_STAGES.map((s) => evolutionSprite(s.mascot)),
    Array.from({ length: 10 }, (_, i) => ({ column: i % 5, row: Math.floor(i / 5) })));
  assert.equal(evolutionSprite("happy"), null);
  const png = fs.readFileSync(new URL("../../assets/images/nettyu/evolution-atlas.png", import.meta.url));
  assert.equal(png.toString("ascii", 1, 4), "PNG");
  assert.equal(png[25], 6); // RGBA: アルファ付き
  const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
  assert.ok(Math.abs(width / height - 2.5) < 0.01);
});
