import type { AnswerRecord } from "@/lib/quiz/session";
import { requireSupabase } from "@/lib/supabase/client";

const PAGE_SIZE = 1000;

type AnswerRow = {
  user_id: string;
  record_id: string;
  session_id: string;
  question_id: string;
  revision: number;
  week_unit_id: string;
  correct: boolean;
  hint_used: boolean;
  option_id: string;
  received_at: string;
};

function toRecord(row: AnswerRow): AnswerRecord {
  return {
    id: row.record_id,
    sessionId: row.session_id,
    questionId: row.question_id,
    revision: row.revision,
    weekUnitId: row.week_unit_id,
    correct: row.correct,
    hintUsed: row.hint_used,
    optionId: row.option_id,
    at: row.received_at,
    xp: 5 + (row.correct ? 5 : 0),
  };
}

function rowFromRecord(userId: string, record: AnswerRecord) {
  return {
    user_id: userId,
    record_id: record.id,
    session_id: record.sessionId,
    question_id: record.questionId,
    revision: record.revision,
    week_unit_id: record.weekUnitId,
    correct: record.correct,
    hint_used: record.hintUsed,
    option_id: record.optionId,
  };
}

function sameAnswer(row: AnswerRow, userId: string, record: AnswerRecord): boolean {
  const expected = rowFromRecord(userId, record);
  return (
    row.user_id === expected.user_id &&
    row.record_id === expected.record_id &&
    row.session_id === expected.session_id &&
    row.question_id === expected.question_id &&
    row.revision === expected.revision &&
    row.week_unit_id === expected.week_unit_id &&
    row.correct === expected.correct &&
    row.hint_used === expected.hint_used &&
    row.option_id === expected.option_id
  );
}

export async function saveAnswer(
  userId: string,
  record: AnswerRecord,
): Promise<AnswerRecord> {
  const client = requireSupabase();
  const payload = rowFromRecord(userId, record);
  const inserted = await client
    .from("answer_records")
    .insert(payload)
    .select("user_id, record_id, session_id, question_id, revision, week_unit_id, correct, hint_used, option_id, received_at")
    .single();
  if (!inserted.error) return toRecord(inserted.data);
  if (inserted.error.code !== "23505") throw inserted.error;

  const existing = await client
    .from("answer_records")
    .select("user_id, record_id, session_id, question_id, revision, week_unit_id, correct, hint_used, option_id, received_at")
    .eq("user_id", userId)
    .eq("record_id", record.id)
    .maybeSingle();
  if (existing.error) throw existing.error;
  if (!existing.data || !sameAnswer(existing.data, userId, record)) {
    throw new Error("この回答IDには別の回答が保存済みです。記録を確認してください。");
  }
  return toRecord(existing.data);
}

export async function loadAnswers(userId: string): Promise<AnswerRecord[]> {
  const client = requireSupabase();
  const rows: AnswerRow[] = [];
  for (let start = 0; ; start += PAGE_SIZE) {
    const { data, error } = await client
      .from("answer_records")
      .select("user_id, record_id, session_id, question_id, revision, week_unit_id, correct, hint_used, option_id, received_at")
      .eq("user_id", userId)
      .order("received_at", { ascending: false })
      .order("record_id", { ascending: false })
      .range(start, start + PAGE_SIZE - 1);
    if (error) throw error;
    rows.push(...(data as AnswerRow[]));
    if (data.length < PAGE_SIZE) break;
  }
  return rows.map(toRecord);
}
