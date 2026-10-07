import type { ContentCatalog, QuestionItem } from "../../types/content.ts";
import {
  correctOption,
  gradeChoice,
  optionsFor,
  questionMode,
  selectQuestions,
  tokenBank,
  tokenOption,
  type QuizMode,
} from "./core.ts";
import {
  createTerminalStageState,
  resolveTerminalStage,
  runTerminalStageCommand,
  type TerminalStageState,
} from "./terminalToken.ts";

export interface Draft {
  optionId: string;
  tokens: string[];
  hintUsed: boolean;
  terminal?: TerminalStageState;
}
export interface AnswerRecord {
  id: string;
  sessionId: string;
  questionId: string;
  revision: number;
  weekUnitId: string;
  correct: boolean;
  hintUsed: boolean;
  optionId: string;
  at: string;
  xp: number;
}
export interface QuizSession {
  id: string;
  weekKey: string;
  mode: QuizMode;
  refs: { id: string; revision: number }[];
  cursor: number;
  drafts: Record<string, Draft>;
  startedAt: string;
  completedAt?: string;
}
export interface Progress {
  version: 1;
  session: QuizSession | null;
  answers: AnswerRecord[];
}
export const emptyProgress = (): Progress => ({
  version: 1,
  session: null,
  answers: [],
});
export const emptyDraft = (): Draft => ({
  optionId: "",
  tokens: [],
  hintUsed: false,
});
export function beginSession(
  state: Progress,
  catalog: ContentCatalog,
  weekKey: string,
  mode: QuizMode,
  count: number,
  web: boolean,
  random = Math.random,
  now = new Date(),
): Progress {
  const candidates = selectQuestions(catalog, weekKey, mode, web);
  if (!Number.isInteger(count) || count < 1 || count > 15 || !candidates.length)
    throw new Error(
      "指定した条件では出題できません。Weekと問題形式を選び直してください。",
    );
  const shuffled = [...candidates];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const questions = shuffled.slice(0, Math.min(count, shuffled.length));
  return {
    ...state,
    session: {
      id: `${now.getTime()}-${random().toString(36).slice(2, 12)}`,
      weekKey: questions[0].sourceReference.weekKey,
      mode,
      refs: questions.map((q) => ({ id: q.id, revision: q.learning.revision })),
      cursor: 0,
      drafts: {},
      startedAt: now.toISOString(),
    },
  };
}
export function currentQuestion(
  state: Progress,
  catalog: ContentCatalog,
): QuestionItem | undefined {
  return catalog.questions.find(
    (q) => q.id === state.session?.refs[state.session.cursor]?.id,
  );
}
export function draftFor(
  state: Progress,
  q: QuestionItem,
  catalog: ContentCatalog,
): Draft {
  const draft = state.session?.drafts[q.id] ?? emptyDraft();
  if (q.payload.kind !== "activityRef" || draft.terminal) return draft;
  const resolved = resolveTerminalStage(catalog, q.payload);
  return resolved
    ? { ...draft, terminal: createTerminalStageState(resolved.stage) }
    : draft;
}
export function answerFor(
  state: Progress,
  q: QuestionItem,
): AnswerRecord | undefined {
  return state.answers.find(
    (a) => a.sessionId === state.session?.id && a.questionId === q.id,
  );
}
export function editDraft(
  state: Progress,
  q: QuestionItem,
  patch: Partial<Draft>,
  catalog: ContentCatalog,
): Progress {
  if (
    !state.session ||
    currentQuestion(state, catalog)?.id !== q.id ||
    answerFor(state, q)
  )
    return state;
  const draft = { ...draftFor(state, q, catalog), ...patch };
  return {
    ...state,
    session: {
      ...state.session,
      drafts: { ...state.session.drafts, [q.id]: draft },
    },
  };
}
export interface ExecutionProof {
  input: string;
  executed: string | null;
  status?: string;
  lines?: string[];
}
export function submitAnswer(
  state: Progress,
  q: QuestionItem,
  catalog: ContentCatalog,
  proof?: ExecutionProof,
  now = new Date(),
): Progress {
  const session = state.session;
  if (
    !session ||
    currentQuestion(state, catalog)?.id !== q.id ||
    answerFor(state, q)
  )
    return state;
  const draft = draftFor(state, q, catalog);
  const mode = questionMode(q);
  let optionId = draft.optionId;
  let correct = false;
  if (mode === "choice") {
    const result = gradeChoice(q, optionId);
    if (!result.canSubmit) throw new Error("選択肢を選んでください。");
    correct = result.correct;
  } else if (mode === "preview" || mode === "console") {
    const input =
      mode === "preview" ? JSON.stringify(draft.tokens) : draft.optionId;
    if (
      !proof ||
      proof.input !== input ||
      proof.executed !== input ||
      (mode === "preview" ? !draft.tokens.length : !draft.optionId)
    )
      throw new Error("現在の回答を実行してから確定してください。");
    optionId =
      mode === "preview" ? tokenOption(q, draft.tokens) : draft.optionId;
    correct = optionId === correctOption(q);
    if (q.console)
      correct =
        correct &&
        proof.status === "success" &&
        JSON.stringify(proof.lines) ===
          JSON.stringify(q.console.expectedOutput);
  } else {
    if (!draft.terminal?.isComplete)
      throw new Error("模擬操作を完了してください。");
    correct = true;
  }
  const record: AnswerRecord = {
    id: `${session.id}:${q.id}`,
    sessionId: session.id,
    questionId: q.id,
    revision: q.learning.revision,
    weekUnitId: q.weekUnitId,
    correct,
    hintUsed: draft.hintUsed,
    optionId,
    at: now.toISOString(),
    xp: 5 + (correct ? 5 : 0),
  };
  return { ...state, answers: [...state.answers, record] };
}
export function nextQuestion(
  state: Progress,
  catalog: ContentCatalog,
  now = new Date(),
): Progress {
  const q = currentQuestion(state, catalog);
  const s = state.session;
  if (!s || !q || !answerFor(state, q)) return state;
  const cursor = s.cursor + 1;
  return {
    ...state,
    session: {
      ...s,
      cursor,
      ...(cursor === s.refs.length ? { completedAt: now.toISOString() } : {}),
    },
  };
}
export function restoreProgress(
  raw: string | null,
  catalog: ContentCatalog,
): Progress {
  try {
    const value = JSON.parse(raw ?? "null") as Progress;
    if (value?.version !== 1 || !Array.isArray(value.answers))
      return emptyProgress();
    const ids = new Set<string>();
    const answers = value.answers.filter((a) => {
      const valid =
        a &&
        typeof a.id === "string" &&
        a.id === `${a.sessionId}:${a.questionId}` &&
        !ids.has(a.id) &&
        typeof a.correct === "boolean" &&
        typeof a.hintUsed === "boolean" &&
        Number.isInteger(a.revision) &&
        a.revision > 0 &&
        typeof a.weekUnitId === "string" &&
        typeof a.optionId === "string" &&
        Number.isFinite(Date.parse(a.at)) &&
        a.xp === 5 + (a.correct ? 5 : 0);
      if (valid) ids.add(a.id);
      return valid;
    });
    const s = value.session;
    if (
      !s ||
      typeof s.id !== "string" ||
      typeof s.weekKey !== "string" ||
      !["mix", "choice", "preview", "console", "terminal"].includes(s.mode) ||
      !Array.isArray(s.refs) ||
      s.refs.length < 1 ||
      s.refs.length > 15 ||
      new Set(s.refs.map((r) => r.id)).size !== s.refs.length ||
      !Number.isInteger(s.cursor) ||
      s.cursor < 0 ||
      s.cursor > s.refs.length ||
      !Number.isFinite(Date.parse(s.startedAt))
    )
      return { version: 1, session: null, answers };
    if (
      !s.refs.every((r) =>
        catalog.questions.some(
          (q) =>
            q.id === r.id &&
            q.learning.revision === r.revision &&
            q.sourceReference.weekKey === s.weekKey,
        ),
      )
    )
      return { version: 1, session: null, answers };
    const drafts: Record<string, Draft> = {};
    for (const ref of s.refs) {
      const q = catalog.questions.find((q) => q.id === ref.id)!;
      const d = s.drafts?.[q.id];
      if (!d) continue;
      const resolved =
        q.payload.kind === "activityRef"
          ? resolveTerminalStage(catalog, q.payload)
          : null;
      const bank = resolved
        ? resolved.stage.tokens.map((t) => t.label)
        : tokenBank(q);
      const tokens =
        Array.isArray(d.tokens) &&
        d.tokens.length <= 24 &&
        d.tokens.every((t) => typeof t === "string" && bank.includes(t))
          ? d.tokens
          : [];
      const draft: Draft = {
        tokens,
        optionId: optionsFor(q).some((o) => o.id === d.optionId)
          ? d.optionId
          : "",
        hintUsed: d.hintUsed === true,
      };
      if (q.payload.kind === "activityRef") {
        const resolved = resolveTerminalStage(catalog, q.payload);
        if (resolved)
          draft.terminal = (
            Array.isArray(d.terminal?.history) ? d.terminal.history : []
          )
            .filter((h) => !h.isError)
            .reduce((st, h) => {
              const command = resolved.stage.commands.find(
                (c) => c.argv.join(" ") === h.command,
              );
              return command
                ? runTerminalStageCommand(resolved.stage, st, command.argv)
                : st;
            }, createTerminalStageState(resolved.stage));
      }
      drafts[q.id] = draft;
    }
    if (
      s.refs
        .slice(0, s.cursor)
        .some(
          (r) =>
            !answers.some((a) => a.sessionId === s.id && a.questionId === r.id),
        )
    )
      return { version: 1, session: null, answers };
    const completedAt =
      s.cursor === s.refs.length
        ? Number.isFinite(Date.parse(s.completedAt ?? ""))
          ? s.completedAt
          : answers.filter((a) => a.sessionId === s.id).at(-1)?.at
        : undefined;
    return { version: 1, answers, session: { ...s, drafts, completedAt } };
  } catch {
    return emptyProgress();
  }
}
export function localDay(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function metrics(state: Progress, now = new Date()) {
  const counts: Record<string, number> = {};
  for (const a of state.answers) {
    const key = localDay(new Date(a.at));
    counts[key] = (counts[key] ?? 0) + 1;
  }
  const dates = Object.keys(counts).sort();
  let longest = 0;
  let run = 0;
  let previous = "";
  for (const key of dates) {
    const d = new Date(key + "T12:00:00");
    d.setDate(d.getDate() - 1);
    run = localDay(d) === previous ? run + 1 : 1;
    longest = Math.max(longest, run);
    previous = key;
  }
  const cursor = new Date(now);
  if (!counts[localDay(cursor)]) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (counts[localDay(cursor)]) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  const latest = new Map<string, AnswerRecord>();
  for (const a of state.answers) latest.set(a.questionId, a);
  return {
    counts,
    streak,
    longest,
    answered: state.answers.length,
    xp: state.answers.reduce((sum, a) => sum + a.xp, 0),
    reviewIds: [...latest.values()]
      .filter((a) => !a.correct)
      .map((a) => a.questionId),
  };
}
