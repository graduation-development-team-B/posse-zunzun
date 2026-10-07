import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { CtaButton } from '@/components/drill/buttons';
import { Icon } from '@/components/drill/icons';
import { RadioDot, Segmented, SelectCard } from '@/components/drill/select';
import { SetupHeader } from '@/components/drill/setup-header';
import { Body, DText, Footer, Pill, Screen } from '@/components/drill/ui';
import { Drill, Radius } from '@/constants/drill';
import {
  COUNT_OPTIONS,
  TYPE_SUFFIX,
  type DrillCount,
  type DrillType,
} from '@/data/drill';
import { useDashboard } from '@/lib/progress/dashboard';
import { catalog } from '@/lib/content/catalog';
import { phaseForUnit } from '@/lib/content/phase';
import { selectQuestions, questionMode, unitKey } from '@/lib/quiz/core';
import { beginSession } from '@/lib/quiz/session';

/** 出題を選ぶ 2/2：問題数と出題タイプ（下部ナビは出さない） */
export default function OptionsScreen() {
  const router = useRouter();
  const { week: weekId } = useLocalSearchParams<{ week?: string }>();
  const { weeks: WEEKS, ready, error, mutate } = useDashboard();
  const week = WEEKS.find(w=>w.id===unitKey(weekId ?? ''));

  const [count, setCount] = useState<DrillCount>(3);
  const [type, setType] = useState<DrillType>('mix');
  const [busy, setBusy] = useState(false);
  const web=Platform.OS==='web';
  const all=selectQuestions(catalog,week?.id ?? '', 'mix',web);
  const available=all.filter(q=>type==='mix'||(type==='choice'?questionMode(q)==='choice':questionMode(q)!=='choice'));
  const actualCount=Math.min(count,available.length);
  const operationMode=all.some(q=>questionMode(q)==='terminal')?'terminal':all.some(q=>questionMode(q)==='console')?'console':'preview';
  const buildTitle=operationMode==='terminal'?'ターミナル操作':operationMode==='console'?'Console実行':'コード組み立て';
  const sampleBlocks=operationMode==='terminal'?['git','status']:operationMode==='console'?["console.log(","'こんにちは'"]:['<h1>','イベント'];
  const start=async()=>{
    if(!week || busy || !actualCount) return;
    setBusy(true);
    try{const next=await mutate(s=>beginSession(s,{...catalog,questions:available},week.id,'mix',actualCount,web));router.push({pathname:'/quiz',params:{session:next.session!.id}});}catch{}finally{setBusy(false);}
  };
  if(!week) return <Screen><Body><DText>Weekを選んでください。</DText><CtaButton label="Weekを選ぶ" href="/materials"/></Body></Screen>;

  const phase = phaseForUnit(catalog, week.id);
  return (
    <Screen>
      <SetupHeader title="問題数とタイプ" step={2} onBack={() => router.back()} />
      <Body paddingTop={16} paddingBottom={24} gap={22}>
        <View style={styles.chips}>
          <View style={styles.phaseChip}>
            <DText size={12} weight="medium" color={Drill.textSub}>
              {`${phase.code} ${phase.title}`}
            </DText>
          </View>
          <Pressable role="button" aria-label={`${week.title}。Weekを選びなおす`} onPress={() => router.back()} style={styles.weekChip}>
            <DText size={12} weight="bold">
              {week.title}
            </DText>
          </Pressable>
        </View>

        <View style={styles.section}>
          <DText size={15} weight="bold" role="heading" aria-level={2}>
            問題数
          </DText>
          <Segmented label="問題数" items={COUNT_OPTIONS} value={count} onChange={setCount} />
        </View>

        <View style={styles.section}>
          <View>
            <DText size={15} weight="bold" role="heading" aria-level={2}>
              出題タイプ
            </DText>
            <DText size={12} color={Drill.textSub} style={styles.hint}>
              どんな問題が出るか、下の見本でイメージできます
            </DText>
          </View>
          <View role="radiogroup" aria-label="出題タイプ" style={styles.types}>
            <SelectCard label="おまかせ" selected={type === 'mix'} onPress={() => setType('mix')} paddingV={14} radius={Radius.lg}>
              <View style={styles.typeHead}>
                <RadioDot selected={type === 'mix'} />
                <DText size={15} weight="bold" style={styles.flex}>
                  おまかせ
                </DText>
                <Pill label="おすすめ" background={Drill.accentSoft} color={Drill.accentText} />
              </View>
              <DText size={12} lh={1.6} color={Drill.textSub} style={styles.typeDesc}>
                このWeekの選択式と操作問題を混ぜて出します
              </DText>
            </SelectCard>

            <SelectCard label="4択" selected={type === 'choice'} onPress={() => setType('choice')} paddingV={14} radius={Radius.lg}>
              <View style={styles.typeHead}>
                <RadioDot selected={type === 'choice'} />
                <DText size={15} weight="bold" style={styles.flex}>
                  4択
                </DText>
                <DText size={11} color={Drill.textSub}>
                  1問 約30秒
                </DText>
              </View>
              <DText size={12} lh={1.6} color={Drill.textSub} style={styles.typeDesc}>
                用語や使い方を、4択・○×・穴埋めの候補から選ぶ
              </DText>
              <View aria-hidden style={styles.sampleLight}>
                <DText size={11} weight="bold">
                  タイトルを見出しにしたい。使う要素は？
                </DText>
                <View style={styles.sampleOptions}>
                  {['h1', 'a', 'img', 'p'].map((o, i) => (
                    <View key={o} style={[styles.sampleOption, i === 0 && styles.sampleOptionOn]}>
                      <DText size={11} weight="bold" mono>
                        {o}
                      </DText>
                    </View>
                  ))}
                </View>
              </View>
            </SelectCard>

            <SelectCard label={buildTitle} selected={type === 'build'} onPress={() => setType('build')} paddingV={14} radius={Radius.lg}>
              <View style={styles.typeHead}>
                <RadioDot selected={type === 'build'} />
                <DText size={15} weight="bold" style={styles.flex}>
                  {buildTitle}
                </DText>
                <DText size={11} color={Drill.textSub}>
                  1問 約1分
                </DText>
              </View>
              <DText size={12} lh={1.6} color={Drill.textSub} style={styles.typeDesc}>
                {operationMode==='terminal'?'コマンドをブロックで組み立て、実行結果を確かめる':operationMode==='console'?'コードの候補を選んで実行し、Consoleの出力を確かめる':'ブロックを並べてコードを作り、表示をその場で確かめる'}
              </DText>
              <View aria-hidden style={styles.sampleDark}>
                <View style={styles.sampleBlocks}>
                  <View style={styles.block}>
                    <DText size={11} weight="bold" mono>
                      {sampleBlocks[0]}
                    </DText>
                  </View>
                  <View style={styles.block}>
                    <DText size={11} weight="bold" mono>
                      {sampleBlocks[1]}
                    </DText>
                  </View>
                  <View style={styles.blockEmpty}>
                    <DText size={11} weight="bold" mono color="#8790A0">
                      ?
                    </DText>
                  </View>
                </View>
                <View style={styles.samplePreview}>
                  <Icon name="arrowRight" size={12} color="#AEB5C2" strokeWidth={2.4} />
                  <DText size={11} color="#AEB5C2">
                    {operationMode==='preview'?'プレビュー：':'実行結果：'}
                  </DText>
                  <DText size={14} weight="bold" color="#FFFFFF">
                    {operationMode==='terminal'?'working tree clean':operationMode==='console'?'こんにちは':'イベント'}
                  </DText>
                </View>
              </View>
            </SelectCard>
          </View>
        </View>
        {actualCount<count && <DText size={12} color={Drill.textSub}>この条件では{actualCount}問を出題します。</DText>}
        {!web && <DText size={12} color={Drill.textSub}>HTML・JavaScriptの実行はWeb版で利用できます。</DText>}
        {Boolean(error) && <DText role="alert" color={Drill.danger}>{error}</DText>}
      </Body>
      <Footer>
        <CtaButton
          label={busy ? '準備中…' : `${week.title} を${actualCount}問はじめる${type==='build'?`（${buildTitle}）`:TYPE_SUFFIX[type]}`}
          disabled={!ready || busy || !actualCount}
          onPress={()=>void start()}
        />
      </Footer>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  phaseChip: { minHeight: 32, paddingHorizontal: 4, justifyContent: 'center' },
  weekChip: {
    minHeight: 32,
    paddingHorizontal: 12,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Drill.border,
    backgroundColor: Drill.surface,
    justifyContent: 'center',
  },
  section: { gap: 10 },
  hint: { marginTop: 2 },
  types: { gap: 10 },
  typeHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  typeDesc: { paddingLeft: 32, marginTop: 6 },
  sampleLight: {
    marginLeft: 32,
    marginTop: 6,
    padding: 10,
    gap: 6,
    borderRadius: Radius.sm,
    backgroundColor: Drill.bg,
  },
  sampleOptions: { flexDirection: 'row', gap: 4 },
  sampleOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: Drill.surface,
    borderWidth: 1,
    borderColor: Drill.border,
  },
  sampleOptionOn: { borderWidth: 1.5, borderColor: Drill.text },
  sampleDark: {
    marginLeft: 32,
    marginTop: 6,
    padding: 10,
    gap: 8,
    borderRadius: Radius.sm,
    backgroundColor: Drill.code,
  },
  sampleBlocks: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  block: { paddingVertical: 2, paddingHorizontal: 6, borderRadius: 5, backgroundColor: Drill.accent },
  blockEmpty: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#8790A0',
  },
  samplePreview: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
