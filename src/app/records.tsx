import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomNav } from '@/components/drill/bottom-nav';
import { Icon } from '@/components/drill/icons';
import { Mascot } from '@/components/drill/mascot';
import { Body, Card, DText, Pill, ProgressBar, Screen } from '@/components/drill/ui';
import { Drill, Radius } from '@/constants/drill';
import { useDashboard } from '@/lib/progress/dashboard';
import type { CalendarData } from '@/lib/progress/presentation';

/** 記録タブ：熱中くんの成長・連続日数・カレンダー・バッジ */
export default function RecordsScreen() {
  const { stats, level, calendar: CALENDAR, evolution: EVOLUTION, badges: BADGES, error } = useDashboard();
  return (
    <Screen>
      <View style={styles.header}>
        <DText size={18} weight="bold" role="heading" aria-level={1}>
          記録
        </DText>
      </View>
      <Body paddingTop={8} paddingBottom={28} gap={14}>
        {Boolean(error) && <DText role="alert" color={Drill.danger}>{error}</DText>}
        <View style={styles.hero}>
          <Mascot name={level.mascot} width={120} alt={`熱中くん（Lv.${level.level}）`} />
          <Pill label={`Lv.${level.level} ${level.name}`} background={Drill.xp} color={Drill.text} size={12} paddingV={3} paddingH={10} style={styles.center} />
          <DText size={13} lh={1.6} color={Drill.textSub} style={styles.centerText}>
            毎日解くほど熱中くんの火が大きくなります
          </DText>
          <View style={styles.xp}>
            <ProgressBar ratio={level.xp/level.max} height={10} fill={Drill.xp} />
            <View style={styles.xpRow}>
              <DText size={11} weight="medium" color={Drill.textSub}>
                {level.xp} / {level.max} XP
              </DText>
              <DText size={11} weight="medium" color={Drill.textSub}>
                あと{level.remaining} XPでLv.{level.level+1}
              </DText>
            </View>
          </View>
        </View>

        <Card style={styles.stages}>
          <DText size={14} weight="bold" role="heading" aria-level={2} style={styles.stagesTitle}>
            進化のみちのり
          </DText>
          <View style={styles.stageRow}>
            {EVOLUTION.map((s) => (
              <View key={s.name} style={styles.stage}>
                <View style={styles.stageImg}>
                  <Mascot name="default" width={s.size} locked={s.state === 'lock'} />
                </View>
                <View style={[styles.stageLabel, s.state === 'now' && { backgroundColor: Drill.accent }]}>
                  <DText size={11} weight="bold" color={s.state === 'now' ? Drill.text : Drill.chipText}>
                    {s.name}
                  </DText>
                </View>
                <DText size={10} color={Drill.textMuted}>
                  {s.req}
                </DText>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.stats}>
          <Stat label="いまの連続" value={String(stats.streak)} unit="日" accent />
          <Stat label="最長記録" value={String(stats.longest)} unit="日" />
          <Stat label="解いた問題" value={String(stats.answered)} unit="問" />
        </View>

        <View style={styles.ticket}>
          <View style={styles.ticketIcon}>
            <Icon name="moon" size={22} color={Drill.info} />
          </View>
          <View style={styles.ticketText}>
            <DText size={14} weight="bold">
              おやすみチケット 準備中
            </DText>
            <DText size={12} lh={1.6} color="#3B4A5E">
              おやすみの日を支える機能は準備中です。記録は実際に回答した日を表示します。
            </DText>
          </View>
        </View>

        <Card style={styles.calendar}>
          <View style={styles.calHead}>
            <DText size={14} weight="bold" role="heading" aria-level={2}>
              {CALENDAR.title}
            </DText>
            <DText size={11} color={Drill.textSub}>
              火の大きさ＝解いた問題数
            </DText>
          </View>
          <CalendarGrid calendar={CALENDAR} />
        </Card>

        <Card style={styles.badges}>
          <DText size={14} weight="bold" role="heading" aria-level={2}>
            バッジ
          </DText>
          <View style={styles.badgeRow}>
            {BADGES.map((b) => (
              <View key={b.name} style={styles.badge}>
                <View style={[styles.badgeIcon, b.got ? styles.badgeGot : styles.badgeLocked]}>
                  <DText size={16} weight="bold" mono color={b.got ? Drill.text : '#A3AAB6'}>
                    {b.mark}
                  </DText>
                </View>
                <DText size={10} lh={1.4} color={Drill.chipText} style={styles.centerText}>
                  {b.name}
                </DText>
              </View>
            ))}
          </View>
        </Card>
      </Body>
      <BottomNav active="records" />
    </Screen>
  );
}

function Stat({ label, value, unit, accent }: { label: string; value: string; unit: string; accent?: boolean }) {
  return (
    <View style={styles.stat}>
      <DText size={11} color={Drill.textSub}>
        {label}
      </DText>
      <DText size={20} weight="bold" color={accent ? Drill.accentStrong : Drill.text}>
        {value}
        <DText size={12} color={Drill.text}>{` ${unit}`}</DText>
      </DText>
    </View>
  );
}

function CalendarGrid({ calendar: CALENDAR }: { calendar: CalendarData }) {
  const cells: (number | null)[] = [
    ...Array.from({ length: CALENDAR.startOffset }, () => null),
    ...Array.from({ length: CALENDAR.days }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const rows = Array.from({ length: cells.length / 7 }, (_, r) => cells.slice(r * 7, r * 7 + 7));

  return (
    <View style={styles.calGrid}>
      {rows.map((row, r) => (
        <View key={r} style={styles.calRow}>
          {row.map((day, c) => (
            <Fragment key={c}>
              {day === null ? <View style={styles.calCell} /> : <CalendarCell day={day} calendar={CALENDAR} />}
            </Fragment>
          ))}
        </View>
      ))}
    </View>
  );
}

function CalendarCell({ day, calendar: CALENDAR }: { day: number; calendar: CalendarData }) {
  const v = CALENDAR.counts[day];
  let bg: string = Drill.bg;
  let fg: string = '#A3A8B2';
  if (v === -1) {
    bg = Drill.infoTint;
    fg = Drill.info;
  } else if (v === 0) {
    bg = Drill.trackWarm;
    fg = '#8A7A6C';
  } else if (v !== undefined && v <= 3) {
    bg = '#FFC9A6';
    fg = Drill.text;
  } else if (v !== undefined) {
    bg = Drill.accent;
    fg = Drill.text;
  }
  const today = day === CALENDAR.today;

  return (
    <View
      aria-label={`${day}日`}
      style={[styles.calCell, { backgroundColor: bg }, today && { borderWidth: 2, borderColor: Drill.text }]}>
      <DText size={11} weight="bold" mono color={fg}>
        {day}
      </DText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 12, paddingBottom: 4, paddingHorizontal: 20, minHeight: 56 },
  center: { alignSelf: 'center' },
  centerText: { textAlign: 'center' },
  hero: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: Drill.accentSoft,
    borderWidth: 1,
    borderColor: Drill.accentBorder,
  },
  xp: { width: '100%', gap: 4, marginTop: 4 },
  xpRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stages: { gap: 10, paddingVertical: 14, paddingHorizontal: 12, borderRadius: 18 },
  stagesTitle: { marginHorizontal: 4 },
  stageRow: { flexDirection: 'row', gap: 4, alignItems: 'flex-end' },
  stage: { flex: 1, alignItems: 'center', gap: 6 },
  stageImg: { height: 76, justifyContent: 'flex-end' },
  stageLabel: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: Radius.pill },
  stats: { flexDirection: 'row', gap: 8 },
  stat: {
    flex: 1,
    gap: 2,
    padding: 12,
    borderRadius: Radius.lg,
    backgroundColor: Drill.surface,
    borderWidth: 1,
    borderColor: Drill.border,
  },
  ticket: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: Radius.lg,
    backgroundColor: Drill.infoSoft,
    borderWidth: 1,
    borderColor: Drill.infoBorder,
  },
  ticketIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Drill.surface,
  },
  ticketText: { flex: 1, minWidth: 0 },
  calendar: { gap: 10, padding: 14, borderRadius: 18 },
  calHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  calGrid: { gap: 6 },
  calRow: { flexDirection: 'row', gap: 6 },
  calCell: { flex: 1, height: 34, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center' },
  badges: { gap: 10, padding: 14, borderRadius: 18 },
  badgeRow: { flexDirection: 'row', gap: 8 },
  badge: { flex: 1, alignItems: 'center', gap: 6 },
  badgeIcon: { width: 52, height: 52, borderRadius: Radius.lg, alignItems: 'center', justifyContent: 'center' },
  badgeGot: { backgroundColor: Drill.xp, boxShadow: '0 3px 0 #D9A21E' },
  badgeLocked: { backgroundColor: Drill.chip, borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#D3CFC7' },
});
