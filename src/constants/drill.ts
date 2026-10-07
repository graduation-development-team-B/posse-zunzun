/**
 * ミニドリル用のデザイントークン（ライト固定）。
 * 値はデザインプロトタイプ（ミニドリル UI改善案）から抽出。
 */
export const Drill = {
  bg: '#F7F6F3',
  surface: '#FFFFFF',
  text: '#1C1F26',
  textSub: '#5A6170',
  textMuted: '#6B7180',
  textFaint: '#8A8F9A',
  border: '#E6E3DD',
  borderStrong: '#D9D5CD',
  divider: '#EFECE6',
  track: '#EFECE6',
  trackWarm: '#F1E4DA',
  chip: '#F1EFEA',
  chipText: '#3A404C',

  accent: '#FF7A2F',
  accentStrong: '#E2540F',
  accentShadow: '#D9531A',
  accentSoft: '#FFF3EA',
  accentBorder: '#FFD9BF',
  accentText: '#A83D08',
  accentBar: '#F26A1B',

  info: '#2F6FB8',
  infoSoft: '#EEF5FD',
  infoBorder: '#CFE3F7',
  infoText: '#1F4F86',
  infoTint: '#E3EEFB',

  xp: '#FFC83D',
  xpSoft: '#FFF6D9',
  xpText: '#7A5600',

  success: '#0B7A5E',
  successSoft: '#E6F4EF',
  danger: '#C23A22',
  dangerSoft: '#FDECE8',
  dangerText: '#B42318',

  code: '#161A22',
  codeText: '#D7DCE5',
  disabled: '#E7E9ED',
} as const;

export const Radius = {
  sm: 10,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 999,
} as const;

const SANS = "'IBM Plex Sans JP', 'Hiragino Sans', 'Noto Sans JP', sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, Menlo, monospace";

/**
 * 書体。Web専用なので Google Fonts（src/app/+html.tsx で読み込み）を
 * ファミリ名＋ウェイトで指定する。
 */
export const Typo = {
  regular: { fontFamily: SANS, fontWeight: '400' },
  medium: { fontFamily: SANS, fontWeight: '500' },
  bold: { fontFamily: SANS, fontWeight: '700' },
  mono: { fontFamily: MONO, fontWeight: '500' },
  monoBold: { fontFamily: MONO, fontWeight: '600' },
} as const;

/** 画面の最大幅。モバイル幅のUIをPCブラウザでは中央に置く */
export const MaxAppWidth = 480;
