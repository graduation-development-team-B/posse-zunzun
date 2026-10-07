import { StyleSheet, View } from 'react-native';

import { Drill, Radius } from '@/constants/drill';
import { Icon } from './icons';
import { DText } from './ui';

export type DayKind = 'done' | 'rest' | 'today' | 'miss';
export type DayRecord = { label: string; kind: DayKind };

/** 今週7日分の記録（炎＝達成、月＝おやすみチケット、点線＝今日） */
export function WeekStrip({ days }: { days: DayRecord[] }) {
  return (
    <View role="list" aria-label="今週の記録" style={styles.strip}>
      {days.map((d) => (
        <View key={d.label} role="listitem" style={styles.day}>
          <DText size={11} weight={d.kind === 'today' ? 'bold' : 'medium'} color={d.kind === 'today' ? Drill.accentStrong : '#6B5A4C'}>
            {d.label}
          </DText>
          {d.kind === 'done' && (
            <View style={[styles.dot, { backgroundColor: Drill.accent }]} aria-label="達成">
              <Icon name="flame" size={17} color="#FFFFFF" />
            </View>
          )}
          {d.kind === 'rest' && (
            <View style={[styles.dot, { backgroundColor: Drill.infoTint }]} aria-label="おやすみチケット使用">
              <Icon name="moon" size={16} color={Drill.info} />
            </View>
          )}
          {d.kind === 'today' && (
            <View style={[styles.dot, styles.today]} aria-label="今日" />
          )}
          {d.kind === 'miss' && <View style={[styles.dot, { backgroundColor: '#F3ECE6' }]} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: 'row',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: Drill.surface,
    borderRadius: Radius.lg,
  },
  day: { flex: 1, alignItems: 'center', gap: 4 },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  today: {
    borderWidth: 2.5,
    borderStyle: 'dashed',
    borderColor: Drill.accent,
    backgroundColor: Drill.accentSoft,
  },
});
