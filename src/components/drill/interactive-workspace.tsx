import { Pressable, StyleSheet, View } from 'react-native';
import { CtaButton } from '@/components/drill/buttons';
import CodePreview from '@/components/drill/code-preview';
import { FeedbackSheet, FeedbackText } from '@/components/drill/feedback-sheet';
import { Icon } from '@/components/drill/icons';
import { Mascot } from '@/components/drill/mascot';
import { QuizHeader, QuizTag } from '@/components/drill/quiz-header';
import { Body, DText, Footer, Screen } from '@/components/drill/ui';
import { Drill, Radius } from '@/constants/drill';
import type { QuestionItem } from '@/types/content';
import { gradeChoice, optionsFor, type QuizMode } from '@/lib/quiz/core';
import type { ConsoleResult } from '@/lib/quiz/consoleExecution';
import type { AnswerRecord, draftFor } from '@/lib/quiz/session';
import { questionSource, targetLabel } from './question-presentation';

export function InteractiveWorkspace({ q, mode, draft, answer, available, busy, error, current, total, canConfirm, consoleResult, previewRun, stale, location, onSelect, onAdd, onUndo, onClear, onHint, onExecute, onConfirm, onNext, onPreviewReady }: {
  q: QuestionItem; mode: QuizMode; draft: ReturnType<typeof draftFor>; answer?: AnswerRecord;
  available: string[]; busy: boolean; error: string | null; current: number; total: number;
  canConfirm: boolean; consoleResult: ConsoleResult | null; previewRun: { code: string; id: number } | null;
  stale: boolean; location?: string; onSelect: (id: string) => void; onAdd: (token: string) => void;
  onUndo: () => void; onClear: () => void; onHint: () => void; onExecute: () => void;
  onConfirm: () => void; onNext: () => void; onPreviewReady: () => void;
}) {
  const checked = !!answer;
  const reason = answer && !answer.correct ? gradeChoice(q, answer.optionId).reason : ''; 
  const choices = optionsFor(q);
  const placed = mode === 'console' ? choices.filter(o => o.id === draft.optionId).map(o => o.text) : draft.tokens;
  const template = q.payload.kind === 'fillBlank' ? q.payload.content.split(q.payload.blankToken) : null;
  const prefix = template?.[0] ?? '';
  const suffix = template?.slice(1).join(q.payload.kind === 'fillBlank' ? q.payload.blankToken : '') ?? '';
  const label = mode === 'console' ? 'Console実行' : mode === 'terminal' ? 'ターミナル操作' : 'コード組み立て';
  return (
    <Screen>
      <QuizHeader current={current} total={total} />
      <Body paddingTop={8} paddingBottom={20} gap={14}>
        <View style={styles.promptRow}>
          <View style={styles.promptText}>
            <View style={styles.tagRow}>
              <QuizTag label={label} tone="gray" />
              <QuizTag label={targetLabel(q)} tone="orange" />
            </View>
            <DText size={18} weight="bold" lh={1.6} role="heading" aria-level={1}>{q.prompt}</DText>
            <DText size={13} lh={1.6} color={Drill.textSub}>
              {mode === 'console' ? '候補を選んで実行。出力を確かめましょう。' : 'ブロックを順にタップ。実行して結果を確かめましょう。'}
            </DText>
          </View>
          <Mascot name="cheer" width={54} />
        </View>
        {Boolean(error) && <DText color={Drill.danger} role="alert">保存・操作エラー：{error}</DText>}
        {Boolean(location) && <DText size={12} mono color={Drill.textSub}>{location}</DText>}
        <View style={styles.code}>
          {Boolean(prefix) && <CodeText text={prefix} />}
          <View style={[styles.slot, { borderColor: placed.length ? Drill.accentBar : Drill.textSub }]}>
            {placed.length === 0 && <DText size={12} color="#8790A0">ここに並べる</DText>}
            {placed.map((token, i) => (
              <View key={`${token}-${i}`} style={styles.placed}>
                <DText mono weight="bold" size={13} color={Drill.text}>{token}</DText>
              </View>
            ))}
          </View>
          {Boolean(suffix) && (
            <CodeText text={suffix} />
          )}
        </View>
        <View style={styles.bank}>
          {(mode === 'console' ? choices.map(o => ({ text: o.text, id: o.id })) : available.map((text, i) => ({ text, id: String(i) }))).map(({ text, id }) => {
            const used = mode === 'console' ? draft.optionId === id : placed.includes(text);
            const disabled = checked || busy || (mode !== 'console' && draft.tokens.length >= 24);
            return (
              <Pressable key={id} role="button" aria-label={`${text}を置く`} aria-disabled={disabled} disabled={disabled}
                onPress={() => mode === 'console' ? onSelect(id) : onAdd(text)}
                style={[styles.token, used ? styles.tokenUsed : styles.tokenFree, extra.tokenWidth]}>
                <DText mono weight="bold" size={15} color={used ? '#A3AAB6' : Drill.text}>{text}</DText>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.tools}>
          <Pressable role="button" disabled={checked || busy} onPress={onUndo} style={styles.tool}>
            <Icon name="undo" size={16} color={Drill.chipText} />
            <DText size={13} weight="medium" color={Drill.chipText}>1つ戻す</DText>
          </Pressable>
          <Pressable role="button" disabled={checked || busy} onPress={onClear} style={styles.tool}>
            <DText size={13} weight="medium" color={Drill.chipText}>全部はずす</DText>
          </Pressable>
          <Pressable role="button" disabled={checked || busy} onPress={onHint} style={styles.hint}>
            <Icon name="bulb" size={16} /><DText size={13} weight="bold">ヒント</DText>
          </Pressable>
        </View>
        {draft.hintUsed && <DText size={13} lh={1.6} color={Drill.textSub}>{q.learning.hint}</DText>}
        <View style={styles.preview}>
          <View style={styles.previewHead}>
            <View style={styles.previewDot} />
            <DText size={11} weight="bold" color={Drill.textSub} style={styles.previewLabel}>
              {mode === 'preview' ? 'プレビュー' : mode === 'console' ? 'Console' : '実行結果'}
            </DText>
            {!checked && <Pressable role="button" disabled={busy || !placed.length} onPress={onExecute} style={extra.run}>
              <DText size={13} weight="bold" color={busy || !placed.length ? Drill.textSub : Drill.accentText}>{busy ? '実行中…' : '実行する'}</DText>
            </Pressable>}
          </View>
          <View style={styles.previewBody}>
            {mode === 'preview' && previewRun && <CodePreview height={q.sourceReference.weekKey === 'week1' ? 80 : 240} code={previewRun.code} runId={previewRun.id} onReady={onPreviewReady} />}
            {mode === 'console' && consoleResult && <DText mono size={13} selectable>
              {consoleResult.lines.join('\n') || '出力なし'}{consoleResult.message ? '\n' + consoleResult.message : ''}
            </DText>}
            {mode === 'terminal' && draft.terminal?.history.map((h, i) => <View key={i}>
              <DText mono size={12}>$ {h.command}</DText>
              <DText mono size={12} color={h.isError ? Drill.danger : Drill.textSub}>{h.lines.join('\n')}</DText>
            </View>)}
            {!previewRun && !consoleResult && !draft.terminal?.history.length && <DText size={13} color={Drill.textSub}>実行すると、ここに結果が表示されます。</DText>}
            {stale && <DText size={12} color={Drill.accentText}>回答を変更しました。もう一度実行してください。</DText>}
          </View>
        </View>
      </Body>
      {!checked && <Footer><CtaButton label={canConfirm ? '確定する' : placed.length ? '実行して確認してください' : mode === 'console' ? '候補を選んでください' : 'ブロックを並べてください'} disabled={!canConfirm || busy} onPress={onConfirm} minHeight={54} /></Footer>}
      {checked && <FeedbackSheet variant={answer.correct ? 'correct' : 'wrong'} title={answer.correct ? mode === 'preview' ? '組み立てられた！' : '正解！' : 'おしい！'}
        source={questionSource(q)} onNext={onNext} nextDisabled={busy}><FeedbackText>{reason ? `${reason}\n${q.explanation}` : q.explanation}</FeedbackText></FeedbackSheet>}
    </Screen>
  );
}

// Preserve the original HTML tag/attribute colors in the fixed parts of the code.
function CodeText({ text }: { text: string }) {
  const parts = text.split(/(<\/?[\w-]+|>|[\w-]+(?==))/g);
  return <DText mono size={13} color={Drill.codeText} selectable>{parts.map((part,i) => (
    <DText key={i} mono size={13} color={part.startsWith('<') || part === '>' ? '#8EA2C8' : /^[\w-]+$/.test(part) && parts[i+1]?.startsWith('=') ? '#E8B07A' : Drill.codeText}>{part}</DText>
  ))}</DText>;
}

const styles = StyleSheet.create({
  promptRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  promptText: { flex: 1, gap: 6 },
  tagRow: { flexDirection: 'row', gap: 6 },
  code: { gap: 8, padding: 14, paddingHorizontal: 16, borderRadius: Radius.md, backgroundColor: Drill.code },
  codeLine: { flexDirection: 'row', flexWrap: 'wrap' },
  indent: { paddingLeft: 16 },
  slot: {
    marginLeft: 16,
    minHeight: 38,
    padding: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    borderRadius: 8,
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  placed: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: 6, backgroundColor: Drill.accentBar },
  bank: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  token: { minHeight: 46, paddingHorizontal: 16, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center' },
  tokenFree: {
    backgroundColor: Drill.surface,
    borderWidth: 1,
    borderColor: '#CDD2DA',
    boxShadow: `0 2px 0 ${Drill.border}`,
  },
  tokenUsed: { borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#CDD2DA' },
  tools: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  tool: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Drill.border,
    backgroundColor: Drill.surface,
  },
  hint: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 4, minHeight: 44, paddingHorizontal: 10 },
  preview: {
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Drill.border,
    backgroundColor: Drill.surface,
    overflow: 'hidden',
  },
  previewHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEFF2',
  },
  previewDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Drill.accentBar },
  previewLabel: { letterSpacing: 0.7 },
  previewBody: { gap: 6, minHeight: 76, paddingVertical: 14, paddingHorizontal: 16 },
});

const extra = StyleSheet.create({ tokenWidth: { maxWidth: '100%' }, run: { marginLeft: 'auto', minHeight: 28, justifyContent: 'center', paddingHorizontal: 8 } });
