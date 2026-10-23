export const XP_PER_LEVEL = 100;

/** 添付ロードマップの順番。Lv.10未満にも最初の姿を使う。 */
export const EVOLUTION_STAGES = [
  { level: 10, name: "たまご期", mascot: "egg", description: "はじめての一歩。学ぶ気持ちが芽生えた！" },
  { level: 20, name: "ひよこ期", mascot: "chick", description: "少しずつ問題に挑戦できるようになった！" },
  { level: 30, name: "まなび期", mascot: "learner", description: "知識がついてきて、正解できる問題が増えた！" },
  { level: 40, name: "やる気期", mascot: "motivated", description: "学習が習慣になって、継続できるように！" },
  { level: 50, name: "成長期", mascot: "growing", description: "いろいろな問題に挑戦し、スキルが身についてきた！" },
  { level: 60, name: "探求期", mascot: "explorer", description: "応用問題にも挑戦し、理解がさらに深まった！" },
  { level: 70, name: "実践期", mascot: "adventurer", description: "自分の力で解ける問題が増えてきた！" },
  { level: 80, name: "達成期", mascot: "knight", description: "難しい問題にも挑戦できるように！" },
  { level: 90, name: "マスター期", mascot: "master", description: "幅広い知識を身につけ、自信を持って解ける！" },
  { level: 100, name: "レジェンド期", mascot: "legend", description: "圧倒的な知識とスキルで、すべての問題を乗り越えた！" },
] as const;

export type EvolutionMascotName = (typeof EVOLUTION_STAGES)[number]["mascot"];

export function levelDisplay(xp: number) {
  const total = Number.isFinite(xp) ? Math.max(0, Math.floor(xp)) : 0;
  const level = Math.floor(total / XP_PER_LEVEL) + 1;
  let stageIndex = 0;
  for (let i = 1; i < EVOLUTION_STAGES.length; i++) {
    if (level >= EVOLUTION_STAGES[i].level) stageIndex = i;
  }
  const stage = EVOLUTION_STAGES[stageIndex];
  const nextEvolution = EVOLUTION_STAGES[stageIndex + 1] ?? null;
  return {
    level,
    name: stage.name,
    mascot: stage.mascot,
    description: stage.description,
    stageIndex,
    xp: total % XP_PER_LEVEL,
    max: XP_PER_LEVEL,
    remaining: XP_PER_LEVEL - (total % XP_PER_LEVEL),
    nextEvolution,
    evolutionRemaining: nextEvolution
      ? (nextEvolution.level - 1) * XP_PER_LEVEL - total
      : 0,
  };
}

/** 透過画像は5列×2行の共通アトラス。画像の加工なしで各セルを表示する。 */
export function evolutionSprite(name: string) {
  const index = EVOLUTION_STAGES.findIndex((stage) => stage.mascot === name);
  return index < 0 ? null : { column: index % 5, row: Math.floor(index / 5) };
}
