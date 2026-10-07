import type { ContentCatalog, QuestionItem } from "../../types/content.ts";

export type QuizMode = "mix" | "choice" | "preview" | "console" | "terminal";
export const MODE_LABELS: Record<QuizMode, string> = {
  mix: "おまかせ",
  choice: "選択式",
  preview: "HTML組み立て",
  console: "JavaScript",
  terminal: "Git・ターミナル",
};
export function questionMode(q: QuestionItem): Exclude<QuizMode, "mix"> {
  return q.console
    ? "console"
    : q.preview
      ? "preview"
      : q.payload.kind === "activityRef"
        ? "terminal"
        : "choice";
}
export function unitKey(key: string): string {
  if (key === "git") return "git_github_level1";
  return /^w\d+$/.test(key) ? `week${Number(key.slice(1))}` : key;
}
export function selectQuestions(
  catalog: ContentCatalog,
  key: string,
  mode: QuizMode,
  web: boolean,
): QuestionItem[] {
  const unit = catalog.weekUnits.find((u) => u.key === unitKey(key));
  if (!unit) return [];
  return catalog.questions.filter(
    (q) =>
      q.weekUnitId === unit.id &&
      q.published &&
      !q.deleted &&
      (mode === "mix" || questionMode(q) === mode) &&
      (web || !["preview", "console"].includes(questionMode(q))),
  );
}
export function optionsFor(q: QuestionItem) {
  return "options" in q.payload ? q.payload.options : [];
}
export function correctOption(q: QuestionItem) {
  return "correctOptionId" in q.payload ? q.payload.correctOptionId : "";
}
export function splitTokens(q: QuestionItem, text: string): string[] {
  if (q.preview?.inputMode === "text") return [text];
  if (q.preview?.inputMode === "code")
    return (
      text
        .match(/<[^>]+>|[^<>]+/g)
        ?.map((t) => t.trim())
        .filter(Boolean) ?? []
    );
  return text.trim().split(/\s+/).filter(Boolean);
}
export function tokenBank(q: QuestionItem): string[] {
  return [...new Set(optionsFor(q).flatMap((o) => splitTokens(q, o.text)))];
}
export function tokenOption(q: QuestionItem, tokens: string[]): string {
  const signature = (values: string[]) =>
    JSON.stringify(
      q.preview && (!q.preview.inputMode || q.preview.inputMode === "classes")
        ? [...values].sort()
        : values,
    );
  return (
    optionsFor(q).find(
      (o) => signature(splitTokens(q, o.text)) === signature(tokens),
    )?.id ?? ""
  );
}
export function codeFor(
  q: QuestionItem,
  optionId: string,
  tokens: string[],
): string {
  const p = q.payload;
  if (p.kind !== "fillBlank") return p.kind === "bugDiagnosis" ? p.code : "";
  const text = q.preview
    ? tokens.join(q.preview.inputMode === "code" ? "" : " ")
    : (optionsFor(q).find((o) => o.id === optionId)?.text ?? "");
  return !text
    ? (q.preview?.starterCode ?? p.content)
    : p.content.replace(p.blankToken, () => text);
}
export function gradeChoice(q: QuestionItem, optionId: string) {
  const options = optionsFor(q);
  const canSubmit = options.some((o) => o.id === optionId);
  const correct = canSubmit && optionId === correctOption(q);
  const p = q.payload;
  const reasons: Record<string, string> | undefined =
    "incorrectReasons" in p ? p.incorrectReasons : undefined;
  return {
    canSubmit,
    correct,
    reason: !correct ? (reasons?.[optionId] ?? "") : "",
    correctText: options.find((o) => o.id === correctOption(q))?.text ?? "",
  };
}
export function sameExecution(input: string, executed: string | null): boolean {
  return !!input && input === executed;
}
