import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Drill, Radius } from '@/constants/drill';
import { DText } from './ui';

/** ラジオの丸。選択中はオレンジ地に白い点 */
export function RadioDot({ selected }: { selected: boolean }) {
  return (
    <View style={[styles.radio, selected ? styles.radioOn : styles.radioOff]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );
}

type SelectCardProps = {
  selected: boolean;
  onPress: () => void;
  children: ReactNode;
  label: string;
  /** 余白（選択中は枠が太くなる分だけ内側の余白を1px減らして大きさを保つ） */
  paddingV?: number;
  paddingH?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

/** ラジオ選択のカード（Week・出題タイプ・フェーズで共通） */
export function SelectCard({
  selected,
  onPress,
  children,
  label,
  paddingV = 10,
  paddingH = 16,
  radius = Radius.md,
  style,
}: SelectCardProps) {
  const inset = selected ? 1 : 0;
  return (
    <Pressable
      role="radio"
      aria-checked={selected}
      aria-label={label}
      onPress={onPress}
      style={({ pressed }) => [
        {
          borderRadius: radius,
          backgroundColor: Drill.surface,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? Drill.text : Drill.border,
          paddingVertical: paddingV - inset,
          paddingHorizontal: paddingH - inset,
        },
        pressed && styles.pressed,
        style,
      ]}>
      {children}
    </Pressable>
  );
}

type SegmentedProps<T extends string | number> = {
  label: string;
  items: { value: T; label: string; sub: string }[];
  value: T;
  onChange: (value: T) => void;
};

/** 横並びのセグメント選択（問題数） */
export function Segmented<T extends string | number>({ label, items, value, onChange }: SegmentedProps<T>) {
  return (
    <View role="radiogroup" aria-label={label} style={styles.segment}>
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <Pressable
            key={String(item.value)}
            role="radio"
            aria-checked={selected}
            onPress={() => onChange(item.value)}
            style={[styles.segmentItem, selected && styles.segmentItemOn]}>
            <DText size={16} weight="bold" color={selected ? Drill.text : Drill.textSub}>
              {item.label}
            </DText>
            <DText size={11} weight="medium" color={selected ? Drill.text : Drill.textSub}>
              {item.sub}
            </DText>
          </Pressable>
        );
      })}
    </View>
  );
}

/** 「1. Week ／ 2. 問題数・タイプ」のような進み具合のバー */
export function StepBar({ labels, current }: { labels: string[]; current: number }) {
  return (
    <View role="list" aria-label="進み具合" style={styles.stepRow}>
      {labels.map((label, i) => {
        const n = i + 1;
        return (
          <View key={label} role="listitem" style={styles.stepItem}>
            <View style={[styles.stepBar, { backgroundColor: n <= current ? Drill.accent : '#ECE9E3' }]} />
            <DText
              size={11}
              weight={n === current ? 'bold' : 'medium'}
              color={n === current ? Drill.text : Drill.textMuted}>
              {`${n}. ${label}`}
            </DText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { backgroundColor: Drill.accent },
  radioOff: { borderWidth: 1.5, borderColor: '#B8B3AA' },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Drill.surface,
  },
  pressed: { opacity: 0.85 },
  segment: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
    backgroundColor: '#ECE9E3',
    borderRadius: Radius.md,
  },
  segmentItem: {
    flex: 1,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.sm,
  },
  segmentItemOn: {
    backgroundColor: Drill.surface,
    boxShadow: '0 1px 3px rgba(28,31,38,0.14)',
  },
  stepRow: {
    flexDirection: 'row',
    gap: 6,
    paddingLeft: 16,
    paddingRight: 8,
  },
  stepItem: { flex: 1, gap: 6 },
  stepBar: { height: 4, borderRadius: Radius.pill },
});
