/**
 * 画面のラベルとアカウントUIの雛形。問題・Week・成績はcontentとProgressから取得する。
 */

export type PhaseId = "ph1" | "ph2" | "ph3";
export type Phase = {
  id: PhaseId;
  code: string;
  title: string;
  sub: string;
  short: string;
};

export const PHASES: Phase[] = [
  {
    id: "ph1",
    code: "PH1",
    title: "基礎を固めよう",
    sub: "Week01〜16・Git Lv1",
    short: "基礎",
  },
  {
    id: "ph2",
    code: "PH2",
    title: "PHP・SQLを使おう",
    sub: "Week17〜32",
    short: "PHP・SQL",
  },
  {
    id: "ph3",
    code: "PH3",
    title: "[PH3の名前]",
    sub: "[含まれるWeek]",
    short: "[名前]",
  },
];

export const CURRENT_PHASE: Phase = PHASES[0];

/** done=クリア / now=学習中 / next=次はここ / lock=まだ */
export type WeekState = "done" | "now" | "next" | "lock";
export type Week = {
  id: string;
  title: string;
  done: number;
  total: number;
  state: WeekState;
};

export const WEEK_STATE_LABEL: Record<WeekState, string> = {
  done: "クリア",
  now: "学習中",
  next: "次はここ",
  lock: "",
};

/** 出題タイプ */
export type DrillType = "mix" | "choice" | "build";
export type DrillCount = 3 | 5 | 10;

export const COUNT_OPTIONS: {
  value: DrillCount;
  label: string;
  sub: string;
}[] = [
  { value: 3, label: "3問", sub: "約2分" },
  { value: 5, label: "5問", sub: "約4分" },
  { value: 10, label: "10問", sub: "約8分" },
];

export const TYPE_SUFFIX: Record<DrillType, string> = {
  mix: "",
  choice: "（4択）",
  build: "（コード組み立て）",
};

export const ACCOUNT_ROWS = [
  { label: "名前", value: "[名前]" },
  { label: "メールアドレス", value: "[メールアドレス]" },
  { label: "パスワード", value: "••••••••" },
  { label: "所属POSSE", value: "[所属POSSE]" },
  { label: "期生", value: "[◯期生]" },
];
