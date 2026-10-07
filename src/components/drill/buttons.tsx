import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Drill, Radius } from '@/constants/drill';
import { Icon } from './icons';
import { DText } from './ui';

type CtaButtonProps = {
  label: string;
  href?: Href;
  onPress?: () => void;
  /** true のとき押せないグレーのボタンになる（label をそのまま表示） */
  disabled?: boolean;
  /** 右端に矢印アイコンを付ける */
  arrow?: boolean;
  minHeight?: number;
};

/**
 * 画面の主ボタン。オレンジ地で、下に段差の影がつく。
 * Link asChild の子の style は、関数形式・配列形式だと無視されるため、単一のオブジェクトで渡す（StyleSheet.flatten）。
 */
export function CtaButton({ label, href, onPress, disabled, arrow, minHeight = 56 }: CtaButtonProps) {
  if (disabled) {
    return (
      <View style={[styles.disabled, { minHeight }]} aria-disabled>
        <DText size={15} weight="medium" color={Drill.textSub}>
          {label}
        </DText>
      </View>
    );
  }

  const button = (
    <Pressable
      role={href ? 'link' : 'button'}
      onPress={onPress}
      style={StyleSheet.flatten([styles.cta, { minHeight }])}>
      <DText size={17} weight="bold">
        {label}
      </DText>
      {arrow && <Icon name="arrowRight" size={18} strokeWidth={2.4} />}
    </Pressable>
  );

  return href ? (
    <Link href={href} asChild>
      {button}
    </Link>
  ) : (
    button
  );
}

type TextLinkProps = {
  label: string;
  href?: Href;
  onPress?: () => void;
  color?: string;
  size?: number;
  weight?: 'regular' | 'medium' | 'bold';
  minHeight?: number;
};

/** 補助的なテキストリンク（高さ44px以上のタップ領域を確保） */
export function TextLink({
  label,
  href,
  onPress,
  color = Drill.textSub,
  size = 13,
  weight = 'medium',
  minHeight = 44,
}: TextLinkProps) {
  const body = (
    <Pressable
      role={href ? 'link' : 'button'}
      onPress={onPress}
      style={StyleSheet.flatten([styles.textLink, { minHeight }])}>
      <DText size={size} weight={weight} color={color}>
        {label}
      </DText>
    </Pressable>
  );
  return href ? (
    <Link href={href} asChild>
      {body}
    </Link>
  ) : (
    body
  );
}

type IconButtonProps = {
  icon: 'back' | 'close';
  label: string;
  href?: Href;
  onPress?: () => void;
};

/** 44×44 のアイコンだけのボタン（ヘッダーの戻る／閉じる） */
export function IconButton({ icon, label, href, onPress }: IconButtonProps) {
  const body = (
    <Pressable
      role={href ? 'link' : 'button'}
      aria-label={label}
      onPress={onPress}
      style={styles.iconButton}>
      <Icon name={icon} size={22} />
    </Pressable>
  );
  return href ? (
    <Link href={href} asChild>
      {body}
    </Link>
  ) : (
    body
  );
}

const styles = StyleSheet.create({
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: Radius.lg,
    backgroundColor: Drill.accent,
    boxShadow: `0 4px 0 ${Drill.accentShadow}`,
  },
  disabled: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    backgroundColor: Drill.disabled,
  },
  textLink: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
