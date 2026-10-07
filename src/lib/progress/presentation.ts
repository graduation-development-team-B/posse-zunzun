import type { ContentCatalog } from "../../types/content.ts";
import type { DayRecord } from "../../components/drill/week-strip.tsx";
import type { MascotName } from "../../components/drill/mascot.tsx";
import { localDay, metrics, type Progress } from "../quiz/session.ts";

export function levelDisplay(xp: number) {
  const level = Math.floor(Math.max(0, xp) / 100) + 1;
  const name =
    level >= 5
      ? "大花火"
      : level >= 3
        ? "キャンプ"
        : level >= 2
          ? "たき火"
          : "火種";
  return {
    level,
    name,
    xp: Math.max(0, xp) % 100,
    max: 100,
    remaining: 100 - (Math.max(0, xp) % 100),
    mascot: (level >= 2 ? "lv2" : "default") as MascotName,
  };
}
export function presentationData(
  state: Progress,
  catalog: ContentCatalog,
  now = new Date(),
) {
  const stats = metrics(state, now);
  const mastered = new Set(
    state.answers
      .filter(
        (a) =>
          a.correct &&
          catalog.questions.some(
            (q) => q.id === a.questionId && q.learning.revision === a.revision,
          ),
      )
      .map((a) => a.questionId),
  );
  const progress = catalog.weekUnits.map((u) => {
    const questions = catalog.questions.filter((q) => q.weekUnitId === u.id);
    return {
      id: u.key,
      title: u.key === "git_github_level1" ? "Git Lv1" : u.title.split("｜")[0],
      done: questions.filter((q) => mastered.has(q.id)).length,
      total: questions.length,
    };
  });
  const first = progress.findIndex((w) => w.done < w.total);
  const nextIndex = progress.findIndex((w, i) => i > first && w.done < w.total);
  const weeks = progress.map((w, i) => ({
    ...w,
    state: (w.done === w.total
      ? "done"
      : i === first
        ? "now"
        : i === nextIndex
          ? "next"
          : "lock") as "done" | "now" | "next" | "lock",
  }));
  const days: DayRecord[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - 6 + i);
    return {
      label:
        i === 6
          ? "今日"
          : ["日", "月", "火", "水", "木", "金", "土"][date.getDay()],
      kind: stats.counts[localDay(date)] ? "done" : i === 6 ? "today" : "miss",
    };
  });
  const year = now.getFullYear(),
    month = now.getMonth();
  const counts: Record<number, number> = {};
  for (const [key, count] of Object.entries(stats.counts)) {
    const date = new Date(key + "T12:00:00");
    if (date.getFullYear() === year && date.getMonth() === month)
      counts[date.getDate()] = count;
  }
  const calendar = {
    title: `${month + 1}月のカレンダー`,
    startOffset: new Date(year, month, 1).getDay(),
    days: new Date(year, month + 1, 0).getDate(),
    today: now.getDate(),
    counts,
  };
  const level = levelDisplay(stats.xp);
  const evolution = [
    { name: "火種", req: "Lv.1", size: 36, level: 1 },
    { name: "たき火", req: "Lv.2", size: 52, level: 2 },
    { name: "キャンプ", req: "Lv.3", size: 62, level: 3 },
    { name: "大花火", req: "Lv.5", size: 74, level: 5 },
  ].map((e, i, all) => ({
    ...e,
    state: (e.level > level.level
      ? "lock"
      : all[i + 1]?.level <= level.level
        ? "past"
        : "now") as "lock" | "past" | "now",
  }));
  const badges = [
    { mark: "1", name: "はじめの一歩", got: stats.answered > 0 },
    { mark: "3", name: "3日つづいた", got: stats.longest >= 3 },
    { mark: "7", name: "1週間の火", got: stats.longest >= 7 },
    {
      mark: "W1",
      name: "Week01制覇",
      got: weeks.some((w) => w.id === "week1" && w.state === "done"),
    },
  ];
  const reviewCounts: Record<string, number> = {};
  const labels: Record<string, string> = {
    言葉の理解: "用語の意味",
    知識の選択: "使いどころ",
    知識の組み立て: "組み合わせ",
    "結果の確認・修正": "結果の確認",
  };
  for (const id of stats.reviewIds) {
    const q = catalog.questions.find((q) => q.id === id);
    if (q) {
      const label = labels[q.learning.target] ?? q.learning.target;
      reviewCounts[label] = (reviewCounts[label] ?? 0) + 1;
    }
  }
  const reviewTags = Object.entries(reviewCounts).map(
    ([label, count]) => `${label} ×${count}`,
  );
  const next = weeks.find((w) => w.state === "now") ?? weeks[0];
  const mascotLines: { mascot: MascotName; text: string }[] = [
    {
      mascot: "default",
      text: next
        ? `${next.title} クリアまであと${next.total - next.done}問！`
        : "今日も一問から進めよう！",
    },
    { mascot: "happy", text: "えへへ、くすぐったい…" },
    { mascot: "cheer", text: "小さな一問から。火を消さないで！" },
    { mascot: "sorry", text: "まちがえても大丈夫。それも経験値！" },
  ];
  return {
    stats,
    weeks,
    days,
    calendar,
    level,
    evolution,
    badges,
    reviewTags,
    mascotLines,
    next,
    todayStudied: Boolean(stats.counts[localDay(now)]),
  };
}
export type CalendarData = ReturnType<typeof presentationData>["calendar"];
