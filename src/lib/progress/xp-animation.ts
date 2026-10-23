import { XP_PER_LEVEL } from "./evolution.ts";

export type XpSegment = {
  level: number;
  from: number;
  to: number;
  start: number;
  end: number;
  holdEnd: number;
};

export type XpTimeline = {
  before: number;
  after: number;
  gained: number;
  duration: number;
  segments: XpSegment[];
};

/** 各レベルの満タンを見せてから繰り上げる、獲得XPだけのタイムライン。 */
export function xpTimeline(before: number, after: number): XpTimeline {
  const startXp = Math.max(0, Math.floor(before));
  const endXp = Math.max(startXp, Math.floor(after));
  const gained = endXp - startXp;
  const segments: XpSegment[] = [];
  let cursor = startXp;
  let time = 380;
  while (cursor < endXp) {
    const level = Math.floor(cursor / XP_PER_LEVEL) + 1;
    const next = Math.min(endXp, level * XP_PER_LEVEL);
    const from = cursor % XP_PER_LEVEL;
    const to = next - (level - 1) * XP_PER_LEVEL;
    const end = time + 280 + (1050 * (next - cursor)) / gained;
    const holdEnd = end + (to === XP_PER_LEVEL ? 240 : 0);
    segments.push({ level, from, to, start: time, end, holdEnd });
    time = holdEnd;
    cursor = next;
  }
  return {
    before: startXp,
    after: endXp,
    gained,
    duration: gained ? time + 460 : 0,
    segments,
  };
}

export function xpFrame(timeline: XpTimeline, elapsed: number) {
  "worklet";
  for (const segment of timeline.segments) {
    if (elapsed <= segment.holdEnd) {
      const fraction = Math.max(
        0,
        Math.min(1, (elapsed - segment.start) / (segment.end - segment.start)),
      );
      const eased = 1 - Math.pow(1 - fraction, 3);
      const xp = segment.from + (segment.to - segment.from) * eased;
      return {
        level: segment.level,
        xp,
        baseline: segment.from,
        total: (segment.level - 1) * XP_PER_LEVEL + xp,
        pulse:
          segment.to === XP_PER_LEVEL && elapsed >= segment.end
            ? Math.sin(((elapsed - segment.end) / 240) * Math.PI)
            : 0,
      };
    }
  }
  const last = timeline.segments[timeline.segments.length - 1];
  const xp = timeline.after % XP_PER_LEVEL;
  return {
    level: Math.floor(timeline.after / XP_PER_LEVEL) + 1,
    xp,
    baseline: last?.to === XP_PER_LEVEL ? 0 : (last?.from ?? xp),
    total: timeline.after,
    pulse: 0,
  };
}
