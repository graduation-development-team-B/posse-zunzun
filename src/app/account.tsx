import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { CtaButton, IconButton } from '@/components/drill/buttons';
import { Icon } from '@/components/drill/icons';
import { RadioDot, SelectCard } from '@/components/drill/select';
import { Body, DText, Footer, Screen } from '@/components/drill/ui';
import { Drill, Radius } from '@/constants/drill';
import { ACCOUNT_ROWS, CURRENT_PHASE, PHASES, type PhaseId } from '@/data/drill';

/** アカウント：フェーズの切り替えと登録情報 */
export default function AccountScreen() {
  const [phase, setPhase] = useState<PhaseId>(CURRENT_PHASE.id);

  return (
    <Screen>
      <View style={styles.header}>
        <IconButton icon="back" label="ホームへ戻る" href="/" />
        <DText size={18} weight="bold" role="heading" aria-level={1}>
          アカウント
        </DText>
      </View>

      <Body paddingTop={12} paddingBottom={24} gap={20}>
        <View style={styles.section}>
          <View>
            <DText size={15} weight="bold" role="heading" aria-level={2}>
              フェーズ
            </DText>
            <DText size={12} lh={1.6} color={Drill.textSub} style={styles.hint}>
              次のフェーズに進んだら切り替えてください。これまでの記録はそのまま残ります。
            </DText>
          </View>
          <View role="radiogroup" aria-label="フェーズ" style={styles.phases}>
            {PHASES.map((p) => (
              <SelectCard
                key={p.id}
                label={`${p.code} ${p.title}`}
                selected={p.id === phase}
                onPress={() => setPhase(p.id)}
                paddingV={10}
                style={styles.phaseCard}>
                <View style={styles.phaseRow}>
                  <RadioDot selected={p.id === phase} />
                  <View style={styles.phaseText}>
                    <View style={styles.phaseTitle}>
                      <DText size={13} weight="bold" mono color={Drill.accentText}>
                        {p.code}
                      </DText>
                      <DText size={15} weight="bold">
                        {p.title}
                      </DText>
                    </View>
                    <DText size={12} color={Drill.textSub}>
                      {p.sub}
                    </DText>
                  </View>
                </View>
              </SelectCard>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <DText size={15} weight="bold" role="heading" aria-level={2}>
            登録情報
          </DText>
          <View style={styles.rows}>
            {ACCOUNT_ROWS.map((row, i) => (
              <Pressable
                key={row.label}
                role="button"
                aria-label={`${row.label}を変更`}
                style={[styles.row, i > 0 && styles.rowBorder]}>
                <DText size={13} color={Drill.textSub} style={styles.rowLabel}>
                  {row.label}
                </DText>
                <DText size={14} weight="medium" numberOfLines={1} style={styles.rowValue}>
                  {row.value}
                </DText>
                <Icon name="chevronRight" size={18} color={Drill.textFaint} />
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable role="button" style={styles.logout}>
          <DText size={14} weight="bold" color={Drill.dangerText}>
            ログアウト
          </DText>
        </Pressable>
      </Body>

      <Footer>
        <CtaButton label="保存する" href="/" />
      </Footer>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingTop: 12, paddingBottom: 4, paddingLeft: 4, paddingRight: 20 },
  section: { gap: 8 },
  hint: { marginTop: 2 },
  phases: { gap: 8 },
  phaseCard: { minHeight: 66, justifyContent: 'center' },
  phaseRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  phaseText: { flex: 1, gap: 2 },
  phaseTitle: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  rows: { borderRadius: Radius.lg, borderWidth: 1, borderColor: Drill.border, backgroundColor: Drill.surface, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 52, paddingLeft: 16, paddingRight: 12 },
  rowBorder: { borderTopWidth: 1, borderTopColor: Drill.divider },
  rowLabel: { width: 88 },
  rowValue: { flex: 1, minWidth: 0 },
  logout: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Drill.border,
    backgroundColor: Drill.surface,
  },
});
