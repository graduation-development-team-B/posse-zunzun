import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Drill } from '@/constants/drill';
import { Icon, type IconName } from './icons';
import { DText } from './ui';

export type NavKey = 'home' | 'materials' | 'records';

const ITEMS: { key: NavKey; label: string; icon: IconName; href: Href }[] = [
  { key: 'home', label: 'ミニドリル', icon: 'flame', href: '/' },
  { key: 'materials', label: '教材', icon: 'book', href: '/materials' },
  { key: 'records', label: '記録', icon: 'trophy', href: '/records' },
];

/** 下部ナビ（ミニドリル／教材／記録）。タブ画面の一番下に置く */
export function BottomNav({ active }: { active: NavKey }) {
  return (
    <View role="navigation" aria-label="メイン" style={styles.nav}>
      {ITEMS.map((item) => {
        const on = item.key === active;
        const color = on ? Drill.accentStrong : Drill.textMuted;
        return (
          <Link key={item.key} href={item.href} replace asChild>
            <Pressable
              role="link"
              aria-current={on ? 'page' : undefined}
              style={styles.item}>
              <Icon name={item.icon} size={24} color={color} strokeWidth={on ? 2 : 1.8} />
              <DText size={11} weight={on ? 'bold' : 'medium'} color={color}>
                {item.label}
              </DText>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 24,
    backgroundColor: Drill.surface,
    borderTopWidth: 1,
    borderTopColor: Drill.border,
  },
  item: {
    flex: 1,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});
