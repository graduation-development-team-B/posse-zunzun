import { useEffect, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { CtaButton, TextLink } from '@/components/drill/buttons';
import { Icon } from '@/components/drill/icons';
import { Mascot } from '@/components/drill/mascot';
import { Body, Card, DText, Footer, Screen } from '@/components/drill/ui';
import { Drill, Radius } from '@/constants/drill';
import { useDashboard } from '@/lib/progress/dashboard';
import { levelDisplay } from '@/lib/progress/presentation';

/** 完了画面：ごほうびを受け取ると XP バーが伸びて、熱中くんが光る */
export default function DoneScreen() {
  const [claimed, setClaimed] = useState(false);
  const { state, stats, error } = useDashboard();
  const { session: id } = useLocalSearchParams<{session?:string}>();
  const session = state.session;
  const answers = state.answers.filter(a=>a.sessionId===session?.id);
  const gained=answers.reduce((sum,a)=>sum+a.xp,0);
  const R={streakDays:stats.streak,gained,xpBefore:stats.xp-gained,xpAfter:stats.xp,xpMax:100,rewards:[{label:`${answers.length}問やりきった`,xp:answers.length*5},{label:`正解 ${answers.filter(a=>a.correct).length}問`,xp:answers.filter(a=>a.correct).length*5},{label:`ヒントを使った ${answers.filter(a=>a.hintUsed).length}問`,xp:0}]};
  const xp = claimed ? R.xpAfter : R.xpBefore;
  const level=levelDisplay(xp);
  if (!session?.completedAt || (id && id!==session.id)) return <Screen><Body><DText>{error || '完了した学習の結果はここに表示されます。'}</DText><CtaButton label="ホームへ" href="/" /></Body></Screen>;

  return (
    <Screen>
      <Body paddingTop={24} paddingBottom={20} gap={14}>
        <View style={styles.hero}>
          <Mascot name={claimed ? 'lv2Glow' : 'lv2'} width={128} alt="熱中くん" />
          <DText size={24} weight="bold" role="heading" aria-level={1}>
            今回の{answers.length}問、完了！
          </DText>
          <View style={styles.streak}>
            <DText size={14} weight="bold" color={Drill.accentText}>
              連続
            </DText>
            <DText size={52} weight="bold" mono color={Drill.accentStrong} style={styles.streakNum}>
              {R.streakDays}
            </DText>
            <DText size={16} weight="bold">
              日目
            </DText>
          </View>
          <View aria-label="直近の記録" style={styles.dots}>
            <View style={[styles.dotSm, { backgroundColor: Drill.infoTint }]} />
            <View style={[styles.dotSm, { backgroundColor: Drill.accent }]} />
            <View style={styles.dotToday}>
              <Icon name="flame" size={18} color="#FFFFFF" />
            </View>
            <View style={[styles.dotSm, styles.dotNext]} />
          </View>
          <DText size={12} color={Drill.textSub}>
            明日も一問、火をつなごう
          </DText>
        </View>

        <Card style={styles.rewards}>
          <View style={styles.rewardHead}>
            <DText size={14} weight="bold" role="heading" aria-level={2}>
              今日のごほうび
            </DText>
            <DText size={16} weight="bold" mono color={Drill.xpText}>
              {`+${R.gained} XP`}
            </DText>
          </View>
          <View style={styles.rewardList}>
            {R.rewards.map((r) => (
              <View key={r.label} style={styles.rewardRow}>
                <DText size={13}>{r.label}</DText>
                <DText size={13} weight="bold" mono>{`+${r.xp}`}</DText>
              </View>
            ))}
          </View>
          <View style={styles.xpBlock}>
            <View style={styles.xpRow}>
              <DText size={12} weight="bold">
                Lv.{level.level} {level.name}
              </DText>
              <DText size={12} weight="medium" color={Drill.textSub}>
                {`${level.xp} / ${R.xpMax} XP`}
              </DText>
            </View>
            <AnimatedBar ratio={level.xp / R.xpMax} />
          </View>
          {claimed && (
            <View style={styles.evolve}>
              <Icon name="star" size={18} color="#5C4100" />
              <DText size={13} weight="bold" color="#5C4100">
                あと{level.remaining} XPで次のレベルに進化！
              </DText>
            </View>
          )}
        </Card>

        <Link href="/records" asChild>
          <Pressable role="link" style={styles.reserve}>
            <DText size={13}>
              <DText size={13} weight="bold">
                見直し候補 {stats.reviewIds.length}問
              </DText>
              を記録しました
            </DText>
            <DText size={13} color={Drill.textSub}>
              記録を見る →
            </DText>
          </Pressable>
        </Link>
      </Body>

      <Footer>
        {claimed ? (
          <CtaButton label="今日はここまで" href="/" />
        ) : (
          <CtaButton label="ごほうびを受け取る" onPress={() => setClaimed(true)} />
        )}
        <TextLink label="余裕があれば、もう3問" href={{pathname:'/options',params:{week:session.weekKey}}} size={14} weight="bold" color={Drill.chipText} />
      </Footer>
    </Screen>
  );
}

/** XP バー。値が変わると 0.8 秒かけて伸びる */
function AnimatedBar({ ratio }: { ratio: number }) {
  const progress = useSharedValue(ratio);

  useEffect(() => {
    progress.value = withTiming(ratio, { duration: 800 });
  }, [ratio, progress]);

  const fill = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, fill]} />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderRadius: Radius.xxl,
    backgroundColor: Drill.accentSoft,
    borderWidth: 1,
    borderColor: Drill.accentBorder,
  },
  streak: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 2 },
  streakNum: { lineHeight: 52 },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  dotSm: { width: 26, height: 26, borderRadius: 13 },
  dotNext: { borderWidth: 2, borderStyle: 'dashed', borderColor: '#FFB98C' },
  dotToday: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Drill.accent,
    boxShadow: `0 0 0 4px ${Drill.accentBorder}`,
  },
  rewards: { gap: 10, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 18 },
  rewardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  rewardList: { gap: 6 },
  rewardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  xpBlock: { gap: 4, paddingTop: 8, borderTopWidth: 1, borderTopColor: Drill.divider },
  xpRow: { flexDirection: 'row', justifyContent: 'space-between' },
  track: { height: 10, borderRadius: Radius.pill, backgroundColor: Drill.trackWarm, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: Radius.pill, backgroundColor: Drill.xp },
  evolve: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Drill.xpSoft,
  },
  reserve: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: Radius.lg,
    backgroundColor: Drill.surface,
    borderWidth: 1,
    borderColor: Drill.border,
  },
});
