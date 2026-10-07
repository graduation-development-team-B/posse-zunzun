import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View, type StyleProp, type TextProps, type ViewStyle } from 'react-native';

import { Drill, MaxAppWidth, Radius, Typo } from '@/constants/drill';

type Weight = 'regular' | 'medium' | 'bold';

type DTextProps = TextProps & {
  size?: number;
  weight?: Weight;
  /** IBM Plex Mono（数字・コード用）。weight が bold のときは SemiBold */
  mono?: boolean;
  color?: string;
  /** 行間の倍率（fontSize × lh） */
  lh?: number;
};

/** ミニドリル共通のテキスト。フォントはウェイトごとに別ファミリで指定する */
export function DText({
  size = 14,
  weight = 'regular',
  mono = false,
  color = Drill.text,
  lh,
  style,
  ...rest
}: DTextProps) {
  const typo = mono ? (weight === 'bold' ? Typo.monoBold : Typo.mono) : Typo[weight];

  return (
    <Text
      style={[{ ...typo, fontSize: size, color, lineHeight: lh ? size * lh : undefined }, style]}
      {...rest}
    />
  );
}

/** 画面の外枠。PCブラウザでも中央にモバイル幅で表示する */
export function Screen({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={styles.screenOuter}>
      <View style={[styles.screenInner, style]}>{children}</View>
    </View>
  );
}

type BodyProps = {
  children: ReactNode;
  paddingTop?: number;
  paddingBottom?: number;
  gap?: number;
};

/** スクロールする本文領域 */
export function Body({ children, paddingTop = 16, paddingBottom = 28, gap = 14 }: BodyProps) {
  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop, paddingBottom, gap }}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

/** 画面下に固定するボタン領域 */
export function Footer({ children, gap = 6 }: { children: ReactNode; gap?: number }) {
  return <View style={[styles.footer, { gap }]}>{children}</View>;
}

type PillProps = {
  label: string;
  background: string;
  color: string;
  size?: number;
  mono?: boolean;
  radius?: number;
  paddingH?: number;
  paddingV?: number;
  style?: StyleProp<ViewStyle>;
};

export function Pill({
  label,
  background,
  color,
  size = 11,
  mono,
  radius = Radius.pill,
  paddingH = 8,
  paddingV = 2,
  style,
}: PillProps) {
  return (
    <View
      style={[
        {
          backgroundColor: background,
          borderRadius: radius,
          paddingHorizontal: paddingH,
          paddingVertical: paddingV,
          alignSelf: 'flex-start',
        },
        style,
      ]}>
      <DText size={size} weight="bold" mono={mono} color={color}>
        {label}
      </DText>
    </View>
  );
}

type ProgressBarProps = {
  /** 0〜1 */
  ratio: number;
  height?: number;
  fill?: string;
  track?: string;
};

export function ProgressBar({ ratio, height = 8, fill = Drill.accent, track = Drill.trackWarm }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, ratio));
  return (
    <View style={{ height, borderRadius: Radius.pill, backgroundColor: track, overflow: 'hidden' }}>
      <View
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          borderRadius: Radius.pill,
          backgroundColor: fill,
        }}
      />
    </View>
  );
}

/** 白地＋枠線のカード */
export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screenOuter: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Drill.bg,
  },
  screenInner: {
    flex: 1,
    width: '100%',
    maxWidth: MaxAppWidth,
    backgroundColor: Drill.bg,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: Drill.surface,
    borderTopWidth: 1,
    borderTopColor: Drill.border,
  },
  card: {
    backgroundColor: Drill.surface,
    borderWidth: 1,
    borderColor: Drill.border,
    borderRadius: Radius.xl,
  },
});
