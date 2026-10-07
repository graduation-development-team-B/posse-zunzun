import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { BottomNav } from '@/components/drill/bottom-nav';
import { CtaButton, TextLink } from '@/components/drill/buttons';
import { Icon } from '@/components/drill/icons';
import { Mascot } from '@/components/drill/mascot';
import { Body, Card, DText, Pill, ProgressBar, Screen } from '@/components/drill/ui';
import { WeekStrip } from '@/components/drill/week-strip';
import { Drill, Radius } from '@/constants/drill';
import {
  CURRENT_PHASE,
  PHASES,
  WEEK_STATE_LABEL,
  type Week,
} from '@/data/drill';
import { catalog } from '@/lib/content/catalog';
import { availablePhaseCodes } from '@/lib/content/phase';
import { useDashboard } from '@/lib/progress/dashboard';
import { beginSession } from '@/lib/quiz/session';
import { useAuth } from '@/lib/auth/provider';

export default function HomeScreen() {
  const router = useRouter();
  const { settings } = useAuth();
  const currentPhase = PHASES.find((phase) => phase.id === settings?.phase) ?? CURRENT_PHASE;
  const { state, ready, error, stats, weeks: WEEKS, days: THIS_WEEK, level, reviewTags: REVIEW_TAGS, mascotLines: MASCOT_LINES, next: nextWeek, todayStudied, mutate } = useDashboard();
  const active = state.session && !state.session.completedAt ? state.session : null;
  const activeWeek = WEEKS.find(w=>w.id===active?.weekKey) ?? nextWeek;
  const review = async () => {
    const questions = catalog.questions.filter(q=>stats.reviewIds.includes(q.id)&&state.answers.some(a=>a.questionId===q.id&&a.revision===q.learning.revision));
    if (!questions.length) return;
    try { const next = await mutate(s=>beginSession(s,{...catalog,questions},questions[0].sourceReference.weekKey,'mix',3,Platform.OS==='web')); router.push({pathname:'/quiz',params:{session:next.session!.id}}); } catch {}
  };
  const [talk, setTalk] = useState(0);
  const line = MASCOT_LINES[talk % MASCOT_LINES.length];

  return (
    <Screen>
      <Body paddingTop={16} paddingBottom={28}>
        {Boolean(error) && <DText role="alert" color={Drill.danger}>{error}</DText>}
        <View style={styles.header}>
          <DText size={22} weight="bold" role="heading" aria-level={1}>
            こんばんは
          </DText>
          <Link href="/account" asChild>
            <Pressable role="link" aria-label="アカウントとフェーズの設定" style={styles.phaseLink}>
              <DText size={12} weight="bold" mono color={Drill.accentText}>
                {currentPhase.code}
              </DText>
              <View style={styles.avatar}>
                <Icon name="user" size={18} />
              </View>
            </Pressable>
          </Link>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroRow}>
            <Mascot
              name={line.mascot}
              width={112}
              alt="熱中くん"
              onPress={() => setTalk(talk + 1)}
              pressLabel="熱中くんに話しかける"
            />
            <View style={styles.heroText}>
              <View style={styles.bubble}>
                <DText size={13} weight="bold" lh={1.5}>
                  {line.text}
                </DText>
              </View>
              <View style={styles.streakRow}>
                <DText size={56} weight="bold" mono color={Drill.accentStrong} style={styles.streakNum}>
                  {stats.streak}
                </DText>
                <DText size={17} weight="bold">
                  日連続
                </DText>
              </View>
              <Pill label={todayStudied ? '今日も一問、できた！' : `今日やると ${stats.streak+1}日目！`} background={Drill.accent} color={Drill.text} size={12} paddingH={10} paddingV={3} />
            </View>
          </View>

          <WeekStrip days={THIS_WEEK} />

          <Link href="/records" asChild>
            <Pressable role="link" style={styles.levelLink}>
              <View style={styles.levelRow}>
                <View style={styles.levelName}>
                  <Pill label={`Lv.${level.level}`} background={Drill.xp} color={Drill.text} size={12} paddingV={1} />
                  <DText size={12} weight="bold">
                    {level.name}の熱中くん
                  </DText>
                </View>
                <DText size={12} color={Drill.textSub}>
                  あと{level.remaining} XPで進化 →
                </DText>
              </View>
              <ProgressBar ratio={level.xp/level.max} fill={Drill.xp} />
            </Pressable>
          </Link>
        </View>

        <Card style={styles.nextCard}>
          <View style={styles.nextHead}>
            <View style={styles.flex}>
              <DText size={12} weight="bold" color={Drill.accentText}>
                次はここから
              </DText>
              <DText size={20} weight="bold" role="heading" aria-level={2} style={styles.nextTitle}>
                {active ? `${activeWeek?.title} の続き ${active.refs.length-active.cursor}問` : `${nextWeek?.title} を3問`}
              </DText>
              <DText size={13} color={Drill.textSub}>
                残り{activeWeek ? activeWeek.total-activeWeek.done : 0}問で{activeWeek?.title}クリア · 約2分
              </DText>
            </View>
            <Pill label="+15〜30 XP" background={Drill.xpSoft} color={Drill.xpText} size={12} paddingH={10} paddingV={4} />
          </View>
          <CtaButton label="はじめる" disabled={!ready} href={active ? {pathname:'/quiz',params:{session:active.id}} : {pathname:'/options',params:{week:nextWeek?.id}}} arrow />
          <TextLink label="ほかのWeekを選んで解く" href="/materials" />
        </Card>

        <Card style={styles.reviewCard}>
          <View style={styles.reviewRow}>
            <View style={styles.reviewIcon}>
              <Icon name="refresh" size={20} color={Drill.info} />
            </View>
            <View style={styles.flex}>
              <DText size={15} weight="bold" role="heading" aria-level={2}>
                {'見直し問題 '}
                <DText size={15} weight="bold" mono color={Drill.info}>
                  {stats.reviewIds.length}
                </DText>
                問
              </DText>
              <DText size={12} color={Drill.textSub}>
                まちがえた問題を、もう一度確かめよう
              </DText>
            </View>
            <Pressable role="button" disabled={!ready || !stats.reviewIds.length} onPress={()=>void review()} style={styles.reviewButton}>
                <DText size={13} weight="bold" color={Drill.infoText}>
                  見直す
                </DText>
            </Pressable>
          </View>
          <View style={styles.tags}>
            {REVIEW_TAGS.map((tag) => (
              <View key={tag} style={styles.tag}>
                <DText size={11} weight="bold" color={Drill.chipText}>
                  {tag}
                </DText>
              </View>
            ))}
          </View>
        </Card>

        <Card style={styles.roadCard}>
          <View style={styles.roadHead}>
            <DText size={15} weight="bold" role="heading" aria-level={2}>
              {`${availablePhaseCodes(catalog)} カリキュラム`}
            </DText>
            <DText size={12} color={Drill.textSub}>
              {`${WEEKS.filter((w) => w.state === 'done').length} / ${WEEKS.length} クリア`}
            </DText>
          </View>
          {WEEKS.map((week, i) => (
            <RoadItem key={week.id} week={week} last={i === WEEKS.length - 1} />
          ))}
        </Card>
      </Body>
      <BottomNav active="home" />
    </Screen>
  );
}

/** フェーズの道のり（縦のタイムライン）の1行 */
function RoadItem({ week, last }: { week: Week; last: boolean }) {
  const tag = WEEK_STATE_LABEL[week.state];
  return (
    <View style={styles.roadItem}>
      <View style={styles.roadRail}>
        <View style={[styles.dot, dotStyles[week.state]]}>
          {week.state === 'done' && <Icon name="check" size={14} color="#FFFFFF" strokeWidth={3.2} />}
          {week.state === 'now' && <Icon name="flame" size={14} color="#FFFFFF" />}
        </View>
        {!last && (
          <View style={[styles.line, { backgroundColor: week.state === 'done' ? Drill.text : Drill.border }]} />
        )}
      </View>
      <View style={styles.roadBody}>
        <View style={styles.roadTitleRow}>
          <DText
            size={14}
            weight={week.state === 'now' || week.state === 'next' ? 'bold' : 'medium'}
            color={week.state === 'lock' ? Drill.textFaint : Drill.text}>
            {week.title}
          </DText>
          {week.state === 'done' && (
            <DText size={11} weight="bold" color={Drill.textSub}>
              {tag}
            </DText>
          )}
          {week.state === 'now' && <Pill label={tag} background={Drill.accent} color={Drill.text} paddingV={1} />}
          {week.state === 'next' && <Pill label={tag} background={Drill.accentSoft} color={Drill.accentText} paddingV={1} />}
        </View>
        {week.state === 'now' && (
          <View style={styles.roadProgress}>
            <View style={styles.flex}>
              <ProgressBar ratio={week.done / week.total} height={6} />
            </View>
            <DText size={11} color={Drill.textSub}>{`${week.done} / ${week.total}`}</DText>
          </View>
        )}
        {week.state === 'next' && (
          <DText size={12} color={Drill.textSub}>
            次のミニドリルはここから
          </DText>
        )}
      </View>
    </View>
  );
}

const dotStyles = StyleSheet.create({
  done: { backgroundColor: Drill.text },
  now: { backgroundColor: Drill.accent, boxShadow: '0 0 0 4px #FFE2CF' },
  next: { backgroundColor: Drill.surface, borderWidth: 2, borderStyle: 'dashed', borderColor: Drill.accent },
  lock: { backgroundColor: Drill.chip, borderWidth: 1.5, borderColor: '#D3CFC7' },
});

const styles = StyleSheet.create({
  flex: { flex: 1, minWidth: 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  phaseLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    paddingLeft: 12,
    paddingRight: 4,
    borderRadius: Radius.pill,
    backgroundColor: Drill.surface,
    borderWidth: 1,
    borderColor: Drill.border,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Drill.accentBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    gap: 14,
    padding: 16,
    borderRadius: Radius.xxl,
    backgroundColor: Drill.accentSoft,
    borderWidth: 1,
    borderColor: Drill.accentBorder,
  },
  heroRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  heroText: { flex: 1, minWidth: 0, gap: 6, paddingBottom: 4 },
  bubble: {
    alignSelf: 'flex-start',
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: Drill.surface,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 4,
    boxShadow: '0 2px 6px rgba(160,70,20,0.12)',
  },
  streakRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  streakNum: { lineHeight: 56 },
  levelLink: { gap: 6 },
  levelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelName: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  nextCard: { padding: 16, gap: 12 },
  nextHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  nextTitle: { marginTop: 2 },
  reviewCard: { paddingVertical: 14, paddingHorizontal: 16, gap: 10 },
  reviewRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Drill.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewButton: {
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: Drill.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingLeft: 46 },
  tag: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: 6, backgroundColor: Drill.chip },
  roadCard: { paddingTop: 14, paddingHorizontal: 16, paddingBottom: 6, gap: 4 },
  roadHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 },
  roadItem: { flexDirection: 'row', gap: 12 },
  roadRail: { width: 28, alignItems: 'center' },
  dot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  line: { flex: 1, width: 2, minHeight: 12 },
  roadBody: { flex: 1, minWidth: 0, gap: 4, paddingTop: 4, paddingBottom: 14 },
  roadTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  roadProgress: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
