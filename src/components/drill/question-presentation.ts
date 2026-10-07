import type { QuestionItem } from "@/types/content";
export function targetLabel(q: QuestionItem) {
  return (
    (
      {
        言葉の理解: "言葉の理解",
        知識の選択: "使いどころ",
        知識の組み立て: "組み合わせ",
        "結果の確認・修正": "確認・修正",
      } as Record<string, string>
    )[q.learning.target] ?? q.learning.target
  );
}
export function questionSource(q: QuestionItem) {
  return `教材で確認：${q.sourceReference.weekKey}「${q.sourceReference.sectionHeading}」`;
}
