import { Pressable, StyleSheet, View } from 'react-native';

import { CtaButton } from '@/components/drill/buttons';
import { FeedbackSheet, FeedbackText } from '@/components/drill/feedback-sheet';
import { Icon } from '@/components/drill/icons';
import { Mascot } from '@/components/drill/mascot';
import { QuizHeader, QuizTag } from '@/components/drill/quiz-header';
import { Body, DText, Footer, Screen } from '@/components/drill/ui';
import { Drill, Radius } from '@/constants/drill';
import { correctOption, gradeChoice, optionsFor } from '@/lib/quiz/core';
import type { QuestionItem } from '@/types/content';
import type { AnswerRecord } from '@/lib/quiz/session';
import { questionSource, targetLabel } from './question-presentation';
import { PressFeedback } from './press-feedback';

export function ChoiceWorkspace({ q, selectedId, answer, hintUsed, busy, error, current, total, onSelect, onHint, onConfirm, onNext }: {
  q: QuestionItem; selectedId: string; answer?: AnswerRecord; hintUsed: boolean; busy: boolean;
  error: string | null; current: number; total: number;
  onSelect: (id: string) => void; onHint: () => void; onConfirm: () => void; onNext: () => void;
}) {
  const options = optionsFor(q);
  const Q = { tags: [q.payload.kind === 'trueFalse' ? '○×問題' : q.payload.kind === 'fillBlank' ? '穴埋め' : q.payload.kind === 'bugDiagnosis' ? 'バグ診断' : '4択問題', targetLabel(q)],
    prompt: q.prompt, options: options.map(o => o.text), answer: options.findIndex(o => o.id === correctOption(q)),
    correctText: q.explanation, materialCorrect: questionSource(q),
    wrongPoint: { tag: `つまずきポイント · ${targetLabel(q)}`, text: gradeChoice(q, selectedId).reason || q.explanation } };
  const selectedIndex = options.findIndex(o => o.id === selectedId);
  const picked = selectedIndex < 0 ? null : selectedIndex;
  const checked = !!answer;
  const correct = checked && answer.correct;
  const wrong = checked && !answer.correct;
  return (
    <Screen>
      <QuizHeader current={current} total={total} />
      <Body paddingTop={12} paddingBottom={20} gap={20}>
        <View style={styles.promptRow}>
          <Mascot name="cheer" width={64} />
          <View style={styles.bubble}>
            <View style={styles.tagRow}>
              <QuizTag label={Q.tags[0]} tone="gray" />
              <QuizTag label={Q.tags[1]} tone="orange" />
            </View>
            <DText size={18} weight="bold" lh={1.65} role="heading" aria-level={1}>
              {Q.prompt}
            </DText>
          </View>
        </View>

        {Boolean(error) && <DText color={Drill.danger} role="alert">保存・操作エラー：{error}</DText>}
        {(q.payload.kind === 'fillBlank' || q.payload.kind === 'bugDiagnosis') && (
          <View style={extra.code}><DText mono size={13} color={Drill.codeText} selectable>
            {q.payload.kind === 'fillBlank' ? q.payload.content : q.payload.code}
          </DText></View>
        )}
        <View role="radiogroup" aria-label="選択肢" style={styles.options}>
          {Q.options.map((label, i) => {
            const isPicked = picked === i;
            const isAnswer = i === Q.answer;
            const tone = optionTone({ checked, isPicked, isAnswer });
            return (
              <PressFeedback
                key={label}
                role="radio"
                aria-checked={isPicked}
                aria-disabled={checked || busy}
                disabled={checked || busy}
                onPress={() => onSelect(options[i].id)}
                style={[
                  styles.option,
                  {
                    borderWidth: tone.thick ? 2 : 1,
                    borderColor: tone.border,
                    backgroundColor: tone.bg,
                    paddingVertical: tone.thick ? 10 : 11,
                    paddingHorizontal: tone.thick ? 15 : 16,
                    opacity: checked && !isAnswer && !isPicked ? 0.5 : 1,
                  },
                ]}>
                <View style={[styles.badge, { backgroundColor: tone.badgeBg }]}>
                  <DText size={13} weight="bold" mono color={tone.badgeFg}>
                    {i + 1}
                  </DText>
                </View>
                <DText size={17} weight="bold" mono style={styles.optionLabel}>
                  {label}
                </DText>
                {checked && isAnswer && <Icon name="check" size={22} color={Drill.success} strokeWidth={2.8} />}
                {checked && isPicked && !isAnswer && <Icon name="close" size={20} color={Drill.danger} strokeWidth={2.8} />}
              </PressFeedback>
            );
          })}
        </View>
        <Pressable role="button" onPress={onHint} disabled={busy || checked} style={extra.hint}>
          <Icon name="bulb" size={16} /><DText size={13} weight="bold">ヒント</DText>
        </Pressable>
        {hintUsed && <DText size={13} lh={1.6} color={Drill.textSub}>{q.learning.hint}</DText>}
      </Body>

      {!checked && (
        <Footer>
          {picked === null ? (
            <CtaButton label="選択肢を1つ選んでください" disabled minHeight={54} />
          ) : (
            <CtaButton label="確定する" onPress={onConfirm} disabled={busy} minHeight={54} />
          )}
        </Footer>
      )}

      {correct && (
        <FeedbackSheet
          variant="correct"
          title="正解！"
          source={Q.materialCorrect}
          onNext={onNext} nextDisabled={busy}>
          <FeedbackText>{Q.correctText}</FeedbackText>
        </FeedbackSheet>
      )}

      {wrong && (
        <FeedbackSheet
          variant="wrong"
          title={
            <>
              {'おしい！ 正解は '}
              <DText size={20} weight="bold" mono color={Drill.danger}>
                {Q.options[Q.answer]}
              </DText>
            </>
          }
          source={Q.materialCorrect}
          onNext={onNext} nextDisabled={busy}>
          <View style={styles.point}>
            <DText size={11} weight="bold" color={Drill.accentText} style={styles.pointTag}>
              {Q.wrongPoint.tag}
            </DText>
            <FeedbackText>{Q.wrongPoint.text}</FeedbackText>
          </View>
        </FeedbackSheet>
      )}
    </Screen>
  );
}

function optionTone({ checked, isPicked, isAnswer }: { checked: boolean; isPicked: boolean; isAnswer: boolean }) {
  if (checked && isAnswer) {
    return { thick: true, border: Drill.success, bg: Drill.successSoft, badgeBg: Drill.success, badgeFg: '#FFFFFF' };
  }
  if (checked && isPicked) {
    return { thick: true, border: Drill.danger, bg: Drill.dangerSoft, badgeBg: Drill.danger, badgeFg: '#FFFFFF' };
  }
  if (!checked && isPicked) {
    return { thick: true, border: Drill.text, bg: Drill.surface, badgeBg: Drill.text, badgeFg: '#FFFFFF' };
  }
  return { thick: false, border: Drill.border, bg: Drill.surface, badgeBg: '#EDEFF2', badgeFg: Drill.chipText };
}

const styles = StyleSheet.create({
  promptRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  bubble: {
    flex: 1,
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Drill.surface,
    borderWidth: 1,
    borderColor: Drill.border,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    borderBottomRightRadius: Radius.lg,
    borderBottomLeftRadius: 4,
  },
  tagRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  options: { gap: 8 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    minHeight: 58,
    borderRadius: Radius.md,
  },
  badge: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  optionLabel: { flex: 1 },
  point: { gap: 4, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, backgroundColor: Drill.bg },
  pointTag: { letterSpacing: 0.4 },
});

const extra = StyleSheet.create({
  code: { gap: 8, padding: 14, paddingHorizontal: 16, borderRadius: Radius.md, backgroundColor: Drill.code },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 4, minHeight: 44, alignSelf: 'flex-end', paddingHorizontal: 10 },
});
