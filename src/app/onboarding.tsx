import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { CtaButton, TextLink } from '@/components/drill/buttons';
import { PasswordField, SelectField, TextField } from '@/components/drill/form';
import { Mascot } from '@/components/drill/mascot';
import { Body, DText, Footer, Screen } from '@/components/drill/ui';
import { Drill } from '@/constants/drill';
import { PHASES, type PhaseId } from '@/data/drill';

const POSSE_OPTIONS = ['[POSSE①]', '[POSSE②]', '[POSSE③]'];
const GENERATION_OPTIONS = ['[◯期生]'];

/** アカウント登録（はじめて開いたとき） */
export default function OnboardingScreen() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [posse, setPosse] = useState<string | null>(null);
  const [generation, setGeneration] = useState<string | null>(null);
  const [phase, setPhase] = useState<PhaseId>('ph1');

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
                  onPress={() => setPhase(p.id)}
                  style={[styles.phase, on ? styles.phaseOn : styles.phaseOff]}>
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
      </Body>

      <Footer>
        <CtaButton label="登録してはじめる" href="/" />
        <TextLink label="アカウントをお持ちの方はログイン" href="/" minHeight={40} />
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
});
