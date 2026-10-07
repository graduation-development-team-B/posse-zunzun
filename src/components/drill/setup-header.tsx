import { StyleSheet, View } from 'react-native';

import { Drill } from '@/constants/drill';
import { IconButton } from './buttons';
import { StepBar } from './select';
import { DText } from './ui';

export const SETUP_STEPS = ['Week', '問題数・タイプ'];

type SetupHeaderProps = {
  title: string;
  /** 1 = Week選択、2 = 問題数・タイプ */
  step: 1 | 2;
  /** 戻るボタン。タブの最初の画面（Week選択）では出さない */
  onBack?: () => void;
};

/** 「出題を選ぶ」の2ステップ共通ヘッダー */
export function SetupHeader({ title, step, onBack }: SetupHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        {onBack ? (
          <IconButton icon="back" label="ひとつ前に戻る" onPress={onBack} />
        ) : (
          <View style={styles.spacerLeft} />
        )}
        <DText size={17} weight="bold" role="heading" aria-level={1} style={styles.title}>
          {title}
        </DText>
        {onBack ? <IconButton icon="close" label="閉じる" href="/" /> : <View style={styles.spacer} />}
      </View>
      <StepBar labels={SETUP_STEPS} current={step} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 12,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 4,
    paddingRight: 12,
    backgroundColor: Drill.surface,
    borderBottomWidth: 1,
    borderBottomColor: Drill.border,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  title: { flex: 1 },
  spacer: { width: 44, height: 44 },
  spacerLeft: { width: 12, height: 44 },
});
