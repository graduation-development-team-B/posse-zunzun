import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { CtaButton, IconButton } from '@/components/drill/buttons';
import { SelectField } from '@/components/drill/form';
import { Icon } from '@/components/drill/icons';
import { RadioDot, SelectCard } from '@/components/drill/select';
import { Body, DText, Footer, Screen } from '@/components/drill/ui';
import { Drill, Radius } from '@/constants/drill';
import { PHASES, type PhaseId } from '@/data/drill';
import { GENERATION_OPTIONS, POSSE_OPTIONS } from '@/data/profileOptions';
import { useAuth } from '@/lib/auth/provider';

/** アカウント：フェーズの切り替えと登録情報 */
export default function AccountScreen() {
  const { user, profile, settings, profileReady, savePhase, saveProfile, signOut, error: authError } = useAuth();
  const [selectedPhase, setSelectedPhase] = useState<PhaseId | null>(null);
  const [profileDraftState, setProfileDraftState] = useState<{
    userId: string;
    posse: string | null;
    cohort: string | null;
  } | null>(null);
  const profileDraft = profileDraftState?.userId === user?.id ? profileDraftState : null;
  const selectedPosse = profileDraft?.posse ?? profile?.posse ?? null;
  const selectedCohort = profileDraft?.cohort ?? profile?.cohort ?? null;
  const phase: PhaseId = selectedPhase ?? settings?.phase ?? 'ph1';
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const save = async () => {
    setBusy(true);
    setError('');
    try {
      await savePhase(phase);
      await saveProfile({ posse: selectedPosse, cohort: selectedCohort });
      setProfileDraftState(null);
    } catch {
      setError('設定を保存できませんでした。通信を確認して再度お試しください。');
    } finally {
      setBusy(false);
    }
  };

  const showProfileChoices = profileReady && (!profile?.posse || !profile?.cohort);
  const rows = [
    { label: '名前', value: profile?.display_name ?? '読み込み中…' },
    { label: 'メールアドレス', value: user?.email ?? '—' },
    { label: 'パスワード', value: '••••••••' },
    ...(!showProfileChoices ? [
      { label: '所属POSSE', value: profile?.posse ?? '未設定' },
      { label: '期生', value: profile?.cohort ?? '未設定' },
    ] : []),
  ];

  const logout = async () => {
    setBusy(true);
    setError('');
    try {
      await signOut();
    } catch {
      setError('ログアウトできませんでした。再度お試しください。');
    } finally {
      setBusy(false);
    }
  };

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
                disabled={p.id === 'ph3'}
                onPress={() => p.id !== 'ph3' && setSelectedPhase(p.id)}
                paddingV={10}
                style={[styles.phaseCard, p.id === 'ph3' && styles.phaseUnavailable]}>
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
            {rows.map((row, i) => (
              <Pressable
                key={row.label}
                role="button"
                aria-label={`${row.label}を変更`}
                disabled
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
          {showProfileChoices && (
            <View style={styles.profileChoices}>
              <DText size={12} lh={1.6} color={Drill.textSub}>
                POSSEと期生を選んで保存してください。
              </DText>
              <SelectField
                label="所属POSSE"
                value={selectedPosse}
                options={POSSE_OPTIONS}
                onChange={(posse) => setProfileDraftState({ userId: user?.id ?? '', posse, cohort: selectedCohort })}
              />
              <SelectField
                label="期生"
                value={selectedCohort}
                options={GENERATION_OPTIONS}
                onChange={(cohort) => setProfileDraftState({ userId: user?.id ?? '', posse: selectedPosse, cohort })}
              />
            </View>
          )}
        </View>

        {Boolean(authError || error) && <DText role="alert" color={Drill.danger}>{error || authError}</DText>}
        <Pressable role="button" disabled={busy} onPress={() => void logout()} style={styles.logout}>
          <DText size={14} weight="bold" color={Drill.dangerText}>
            ログアウト
          </DText>
        </Pressable>
      </Body>

      <Footer>
        <CtaButton
          label={!profileReady ? '読み込み中…' : busy ? '保存しています…' : '保存する'}
          onPress={() => void save()}
          disabled={busy || !profileReady}
        />
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
  phaseUnavailable: { opacity: 0.45 },
  phaseRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  phaseText: { flex: 1, gap: 2 },
  phaseTitle: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  rows: { borderRadius: Radius.lg, borderWidth: 1, borderColor: Drill.border, backgroundColor: Drill.surface, overflow: 'hidden' },
  profileChoices: { gap: 12 },
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
