import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ?? "";
const key = process.env.EXPO_PUBLIC_SUPABASE_KEY?.trim() ?? "";

export const supabaseConfigured =
  url.startsWith("https://") &&
  key.startsWith("sb_publishable_") &&
  !key.includes("REPLACE_WITH");

export const supabase: SupabaseClient<Database> | null = supabaseConfigured
  ? createClient<Database>(url, key, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: "implicit",
      },
    })
  : null;

export function requireSupabase(): SupabaseClient<Database> {
  if (!supabase) {
    throw new Error("Supabaseの接続設定がありません。環境変数を確認してください。");
  }
  return supabase;
}

export function authCallbackUrl(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/auth/callback`;
}
