import { StyleSheet, View } from 'react-native';

import { Drill } from '@/constants/drill';
import { IconButton } from './buttons';
import { DText, ProgressBar } from './ui';

/** 出題中のヘッダー：「1/3」＋進捗バー＋中断（×） */
export function QuizHeader({ current, total }: { current: number; total: number }) {
  return (
    <View style={styles.header}>
      <DText size={13} weight="bold" mono color={Drill.textSub} aria-label={`${total}問中${current}問目`}>
        {`${current}/${total}`}
      </DText>
      <View style={styles.bar}>
        <ProgressBar ratio={current / total} height={6} fill={Drill.accentBar} track={Drill.border} />
      </View>
      <IconButton icon="close" label="中断してホームへ" href="/" />
    </View>
  );
}

/** 問題の種類・つまずき分類などの小さなラベル */
export function QuizTag({ label, tone }: { label: string; tone: 'gray' | 'orange' }) {
  return (
    <View style={[styles.tag, { backgroundColor: tone === 'gray' ? '#EDEFF2' : '#FFF1E8' }]}>
      <DText size={11} weight="bold" color={tone === 'gray' ? Drill.chipText : Drill.accentText}>
        {label}
      </DText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 12,
  },
  bar: { flex: 1 },
  tag: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: 6 },
});
