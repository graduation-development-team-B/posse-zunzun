import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { CtaButton, TextLink } from '@/components/drill/buttons';
import { PasswordField, SelectField, TextField } from '@/components/drill/form';
import { Mascot } from '@/components/drill/mascot';
import { Body, DText, Footer, Screen } from '@/components/drill/ui';
import { Drill } from '@/constants/drill';
import { PHASES, type PhaseId } from '@/data/drill';
import { GENERATION_OPTIONS, POSSE_OPTIONS } from '@/data/profileOptions';
import { useAuth } from '@/lib/auth/provider';

/** アカウント登録（はじめて開いたとき） */
export default function OnboardingScreen() {
  const router = useRouter();
  const { signUp, error: authError } = useAuth();
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [posse, setPosse] = useState<string | null>(null);
  const [generation, setGeneration] = useState<string | null>(null);
  const [phase, setPhase] = useState<PhaseId>('ph1');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    if (busy) return;
    const cleanName = name.trim();
    const cleanEmail = mail.trim();
    if (!cleanName || cleanName.length > 80) {
      setError('名前を1〜80文字で入力してください。');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('メールアドレスを確認してください。');
      return;
    }
    if (password.length < 8) {
      setError('パスワードは8文字以上で入力してください。');
      return;
    }
    if (phase === 'ph3') {
      setError('PH3のクイズはまだ利用できません。');
      return;
    }
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const result = await signUp({
        name: cleanName,
        email: cleanEmail,
        password,
        posse,
        cohort: generation,
        phase,
      });
      if (result.needsEmailConfirmation) {
        setMessage('確認メールを送信しました。メール内のリンクから登録を完了してください。');
      } else {
        router.replace('/');
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '登録できませんでした。時間をおいて再度お試しください。');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen>
      <Body paddingTop={24} paddingBottom={24} gap={20}>
        <View style={styles.welcome}>
          <Mascot name="default" width={72} alt="熱中くん" />
          <View style={styles.flex}>
            <DText size={20} weight="bold" role="heading" aria-level={1}>
              はじめまして！
            </DText>
            <DText size={13} lh={1.6} color={Drill.textSub} style={styles.welcomeSub}>
              アカウントを作って、毎日のミニドリルをはじめよう
            </DText>
          </View>
        </View>

        <View style={styles.section}>
          <DText size={13} weight="bold" color={Drill.textSub} role="heading" aria-level={2}>
            アカウント
          </DText>
          <TextField label="名前" value={name} onChangeText={setName} placeholder="例：山田 花子" autoComplete="name" />
          <TextField
            label="メールアドレス"
            value={mail}
            onChangeText={setMail}
            placeholder="example@posse.jp"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <PasswordField label="パスワード" value={password} onChangeText={setPassword} />
          <View style={styles.pair}>
            <View style={styles.flex}>
              <SelectField label="所属POSSE" value={posse} options={POSSE_OPTIONS} onChange={setPosse} />
            </View>
            <View style={styles.flex}>
              <SelectField label="期生" value={generation} options={GENERATION_OPTIONS} onChange={setGeneration} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View>
            <DText size={13} weight="bold" color={Drill.textSub} role="heading" aria-level={2}>
              いま取り組んでいるフェーズ
            </DText>
            <DText size={12} color={Drill.textSub} style={styles.hint}>
              あとからホーム右上のアイコンで変えられます
            </DText>
          </View>
          <View role="radiogroup" aria-label="フェーズ" style={styles.phases}>
            {PHASES.map((p) => {
              const on = p.id === phase;
              return (
                <Pressable
                  key={p.id}
                  role="radio"
                  aria-checked={on}
                  disabled={p.id === 'ph3'}
                  onPress={() => p.id !== 'ph3' && setPhase(p.id)}
                  style={[styles.phase, on ? styles.phaseOn : styles.phaseOff, p.id === 'ph3' && styles.phaseUnavailable]}>
                  <DText size={16} weight="bold" mono>
                    {p.code}
                  </DText>
                  <DText size={11} weight="medium" color={Drill.textSub}>
                    {p.short}
                  </DText>
                </Pressable>
              );
            })}
          </View>
        </View>

        {Boolean(authError) && <DText role="alert" color={Drill.danger}>{authError}</DText>}
        {Boolean(error) && <DText role="alert" color={Drill.danger}>{error}</DText>}
        {Boolean(message) && <DText role="status" color={Drill.info}>{message}</DText>}
      </Body>

      <Footer>
        <CtaButton label={busy ? '登録しています…' : '登録してはじめる'} onPress={() => void submit()} disabled={busy} />
        <TextLink label="アカウントをお持ちの方はログイン" href="/login" minHeight={40} />
      </Footer>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, minWidth: 0 },
  welcome: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  welcomeSub: { marginTop: 4 },
  section: { gap: 14 },
  hint: { marginTop: 2 },
  pair: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  phases: { flexDirection: 'row', gap: 8 },
  phase: {
    flex: 1,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderRadius: 12,
  },
  phaseOn: { borderWidth: 2, borderColor: Drill.accent, backgroundColor: Drill.accentSoft },
  phaseOff: { borderWidth: 1, borderColor: Drill.borderStrong, backgroundColor: Drill.surface },
  phaseUnavailable: { opacity: 0.45 },
});
