import { Link, type Href } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Drill } from '@/constants/drill';
import { CtaButton } from './buttons';
import { Icon } from './icons';
import { Mascot } from './mascot';
import { DText } from './ui';

type FeedbackSheetProps = {
  variant: 'correct' | 'wrong';
  title: ReactNode;
  /** 解説（段落やつまずきポイントのボックス） */
  children: ReactNode;
  /** 「教材で確認」リンク。なければ出さない */
  link?: { label: string; href: Href };
  nextHref?: Href;
  onNext?: () => void;
  nextDisabled?: boolean;
  source?: string;
  explanationRead?: boolean;
  onExplanationRead?: () => Promise<unknown>;
};

/** 確定後に画面下からせり上がる「正解／おしい」パネル */
export function FeedbackSheet({ variant, title, children, link, nextHref, onNext, nextDisabled, source, explanationRead = false, onExplanationRead }: FeedbackSheetProps) {
  const [expanded, setExpanded] = useState(false);
  const [savingRead, setSavingRead] = useState(false);
  const ok = variant === 'correct';
  const tone = ok ? Drill.success : Drill.danger;

  const toggleExplanation = () => {
    if (expanded) {
      setExpanded(false);
      return;
    }
    setExpanded(true);
    if (!explanationRead && onExplanationRead) {
      setSavingRead(true);
      void onExplanationRead().catch(() => {}).finally(() => setSavingRead(false));
    }
  };

  return (
    <View aria-live="polite" style={[styles.sheet, { borderTopColor: tone }]}>
      <View style={[styles.mascot, { top: ok ? -58 : -62 }]}>
        <Mascot name={ok ? 'happy' : 'sorry'} width={84} />
      </View>
      <View style={styles.titleRow}>
        <Icon name={ok ? 'checkCircle' : 'crossCircle'} size={24} color={tone} strokeWidth={2.6} />
        <DText size={20} weight="bold" color={tone}>
          {title}
        </DText>
      </View>
      {ok ? children : (
        <View style={disclosureStyles.disclosure}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`つまづきポイント${expanded ? 'を閉じる' : 'を開く'}`}
            accessibilityState={{ expanded, disabled: savingRead }}
            disabled={savingRead}
            onPress={toggleExplanation}
            style={disclosureStyles.disclosureButton}
          >
            <DText size={15} weight="bold" color={Drill.text}>つまづきポイント</DText>
            <DText size={18} weight="bold" color={Drill.accentText}>{expanded ? '−' : '＋'}</DText>
          </Pressable>
          {expanded && (
            <View style={disclosureStyles.disclosureContent}>
              {children}
              {Boolean(source) && <DText size={12} color={Drill.textSub}>{source}</DText>}
              <Link href="/materials" asChild>
                <Pressable accessibilityRole="link" style={styles.link}>
                  <Icon name="book" size={16} color={Drill.chipText} />
                  <DText size={13} weight="bold" color={Drill.chipText}>教材の該当箇所を開く（30秒）</DText>
                </Pressable>
              </Link>
              {explanationRead && (
                <DText size={12} weight="bold" color={Drill.accentText}>解説を読んだ！ +5 XP</DText>
              )}
            </View>
          )}
        </View>
      )}
      {link && (
        <Link href={link.href} asChild>
          <Pressable role="link" style={styles.link}>
            <Icon name="book" size={16} color={Drill.chipText} />
            <DText size={13} weight="bold" color={Drill.chipText}>
              {link.label}
            </DText>
          </Pressable>
        </Link>
      )}
      {ok && Boolean(source) && <View style={styles.link}><Icon name="book" size={16} color={Drill.chipText}/><DText size={13} weight="bold" color={Drill.chipText}>{source}</DText></View>}
      <CtaButton label="次へ" href={nextHref} onPress={onNext} disabled={nextDisabled} minHeight={54} />
    </View>
  );
}

/** 解説の本文 */
export function FeedbackText({ children }: { children: ReactNode }) {
  return (
    <DText size={14} lh={1.75} color="#2A2F3A">
      {children}
    </DText>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'relative',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    backgroundColor: Drill.surface,
    borderTopWidth: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    boxShadow: '0 -8px 24px rgba(18,21,28,0.08)',
  },
  mascot: { position: 'absolute', right: 14 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 32 },
});

const disclosureStyles = StyleSheet.create({
  disclosure: { borderRadius: 12, backgroundColor: Drill.bg, overflow: 'hidden' },
  disclosureButton: { minHeight: 48, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  disclosureContent: { gap: 10, paddingHorizontal: 14, paddingBottom: 14 },
});
