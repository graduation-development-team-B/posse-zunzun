import { ChoiceWorkspace } from "@/components/drill/choice-workspace";
import { InteractiveWorkspace } from "@/components/drill/interactive-workspace";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { CtaButton } from "@/components/drill/buttons";
import { Body, DText, Screen } from "@/components/drill/ui";
import { catalog } from "@/lib/content/catalog";
import { useLearning } from "@/lib/progress/provider";
import {
  codeFor,
  questionMode,
  tokenBank,
} from "@/lib/quiz/core";
import {
  runConsoleCode,
  type ConsoleResult,
} from "@/lib/quiz/consoleExecution";
import {
  answerFor,
  currentQuestion,
  draftFor,
  editDraft,
  nextQuestion,
  submitAnswer,
} from "@/lib/quiz/session";
import {
  absoluteTerminalPath,
  createTerminalStageState,
  resolveTerminalStage,
  runTerminalStageCommand,
} from "@/lib/quiz/terminalToken";
import type { QuestionItem } from "@/types/content";

export default function QuizScreen() {
  const { state, ready, error, reload } = useLearning();
  const { session: sessionId } = useLocalSearchParams<{ session?: string }>();
  if (!ready)
    return (
      <Screen>
        <Body>
          <DText>{error || "学習記録を読み込み中…"}</DText>
          {Boolean(error) && <CtaButton label="再試行" onPress={reload} />}
        </Body>
      </Screen>
    );
  const s = state.session;
  if (!s || (sessionId && s.id !== sessionId))
    return (
      <Screen>
        <Body>
          <DText>学習するWeekと問題数を選んでください。</DText>
          <CtaButton label="Weekを選ぶ" href="/materials" />
        </Body>
      </Screen>
    );
  if (s.completedAt)
    return (
      <Screen>
        <Body>
          <DText>この学習は完了しています。</DText>
          <CtaButton
            label="結果を見る"
            href={{ pathname: "/done", params: { session: s.id } }}
          />
        </Body>
      </Screen>
    );
  const q = currentQuestion(state, catalog);
  if (!q)
    return (
      <Screen>
        <Body>
          <DText>問題を取得できません。教材を選び直してください。</DText>
          <CtaButton label="Weekを選ぶ" href="/materials" />
        </Body>
      </Screen>
    );
  return <QuestionScreen key={q.id + ":" + s.id} question={q} />;
}

function QuestionScreen({ question: q }: { question: QuestionItem }) {
  const router = useRouter();
  const { state, mutate, error } = useLearning();
  const session = state.session!;
  const draft = draftFor(state, q, catalog);
  const answer = answerFor(state, q);
  const checked = !!answer;
  const mode = questionMode(q);
  const [busy, setBusy] = useState(false);
  const [executed, setExecuted] = useState<string | null>(null);
  const [consoleResult, setConsoleResult] = useState<ConsoleResult | null>(
    null,
  );
  const [previewRun, setPreviewRun] = useState<{
    code: string;
    signature: string;
    id: number;
    generation: number;
  } | null>(null);
  const cancel = useRef<(() => void) | null>(null);
  const execution = useRef(0);
  useEffect(
    () => () => {
      execution.current++;
      cancel.current?.();
    },
    [],
  );
  const input =
    mode === "preview" ? JSON.stringify(draft.tokens) : draft.optionId;
  const resolved =
    q.payload.kind === "activityRef"
      ? resolveTerminalStage(catalog, q.payload)
      : null;
  const available =
    mode === "terminal"
      ? [...new Set(resolved?.stage.tokens.map((t) => t.label) ?? [])]
      : tokenBank(q);
  const code = codeFor(q, draft.optionId, draft.tokens);
  const attempt = (fn: Parameters<typeof mutate>[0]) => {
    if (busy) return;
    void mutate(fn).catch(() => {});
  };
  const change = (fn: Parameters<typeof mutate>[0]) => {
    if (busy) return;
    execution.current++;
    setExecuted(null);
    setConsoleResult(null);
    attempt(fn);
  };
  const execute = async () => {
    if (mode === "preview") {
      const generation = ++execution.current;
      setExecuted(null);
      setPreviewRun((previous) => ({
        code,
        signature: input,
        id: (previous?.id ?? 0) + 1,
        generation,
      }));
      return;
    }
    if (mode === "terminal" && resolved && draft.terminal) {
      attempt((s) => {
        const d = draftFor(s, q, catalog);
        return editDraft(
          s,
          q,
          {
            terminal: runTerminalStageCommand(
              resolved.stage,
              d.terminal!,
              d.tokens,
            ),
            tokens: [],
          },
          catalog,
        );
      });
      return;
    }
    if (mode === "console") {
      setBusy(true);
      setExecuted(null);
      const id = ++execution.current;
      cancel.current?.();
      const run = runConsoleCode(code);
      cancel.current = run.cancel;
      const result = await run.result;
      if (id === execution.current) {
        setConsoleResult(result);
        setExecuted(input);
        setBusy(false);
      }
    }
  };
  const canConfirm =
    !busy &&
    !checked &&
    (mode === "choice"
      ? !!draft.optionId
      : mode === "terminal"
        ? draft.terminal?.isComplete
        : executed === input &&
          (mode === "preview" ? draft.tokens.length > 0 : !!draft.optionId));
  const confirm = async () => {
    setBusy(true);
    try {
      await mutate((s) =>
        submitAnswer(s, q, catalog, {
          input,
          executed,
          status: consoleResult?.status,
          lines: consoleResult?.lines,
        }),
      );
    } catch {
    } finally {
      setBusy(false);
    }
  };
  const next = async () => {
    setBusy(true);
    try {
      const updated = await mutate((s) => nextQuestion(s, catalog));
      if (updated.session?.completedAt)
        router.replace({ pathname: "/done", params: { session: session.id } });
    } catch {
    } finally {
      setBusy(false);
    }
  };
  const onSelect = (id: string) => change(s => editDraft(s, q, { optionId: id }, catalog));
  const onHint = () => attempt(s => editDraft(s, q, { hintUsed: true }, catalog));
  const shared = { q, answer, busy, error, current: session.cursor + 1, total: session.refs.length,
    onSelect, onHint, onConfirm: () => void confirm(), onNext: () => void next() };
  if (mode === 'choice') return <ChoiceWorkspace {...shared} selectedId={draft.optionId} hintUsed={draft.hintUsed} />;
  return <InteractiveWorkspace {...shared} mode={mode} draft={draft} available={available}
    canConfirm={!!canConfirm && !((mode === 'console' || mode === 'preview') && Platform.OS !== 'web')}
    consoleResult={consoleResult} previewRun={previewRun} stale={!!(previewRun || consoleResult) && executed !== input}
    location={resolved ? resolved.stage.inputMode === 'pullRequest' ? 'PRの反映先・変更元を設定' : absoluteTerminalPath(resolved.activity.root.name, draft.terminal?.cwd ?? resolved.stage.startCwd) : undefined}
    onAdd={token => change(s => editDraft(s, q, { tokens: [...draftFor(s, q, catalog).tokens, token] }, catalog))}
    onUndo={() => change(s => editDraft(s, q, mode === 'console' ? { optionId: '' } : { tokens: draftFor(s, q, catalog).tokens.slice(0, -1) }, catalog))}
    onClear={() => { setPreviewRun(null); change(s => editDraft(s, q, { tokens: [], optionId: '', ...(resolved ? { terminal: createTerminalStageState(resolved.stage) } : {}) }, catalog)); }}
    onExecute={() => void execute()}
    onPreviewReady={() => { if (previewRun?.generation === execution.current) setExecuted(previewRun.signature); }}
  />;
}
