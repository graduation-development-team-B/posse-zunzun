import type { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { authCallbackUrl, requireSupabase, supabase, supabaseConfigured } from "@/lib/supabase/client";
import type { PhaseId } from "@/data/drill";

export type Profile = {
  user_id: string;
  display_name: string;
  posse: string | null;
  cohort: string | null;
};

export type LearningSettings = {
  user_id: string;
  phase: "ph1" | "ph2";
};

type SignUpInput = {
  name: string;
  email: string;
  password: string;
  posse: string | null;
  cohort: string | null;
  phase: "ph1" | "ph2";
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  ready: boolean;
  profile: Profile | null;
  settings: LearningSettings | null;
  profileReady: boolean;
  error: string;
  signUp: (input: SignUpInput) => Promise<{ needsEmailConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  savePhase: (phase: PhaseId) => Promise<void>;
  saveProfile: (profile: { posse: string | null; cohort: string | null }) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function nullableChoice(value: string | null): string | null {
  const clean = value?.trim();
  return clean || null;
}

function metadataString(user: User, key: string): string | null {
  const value = user.user_metadata?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

async function ensureProfile(user: User): Promise<Profile> {
  const client = requireSupabase();
  const found = await client
    .from("profiles")
    .select("user_id, display_name, posse, cohort")
    .eq("user_id", user.id)
    .maybeSingle();
  if (found.error) throw found.error;
  if (found.data) return found.data as Profile;

  const inserted = await client
    .from("profiles")
    .insert({
      user_id: user.id,
      display_name: metadataString(user, "display_name") ?? "POSSEユーザー",
      posse: nullableChoice(metadataString(user, "posse")),
      cohort: nullableChoice(metadataString(user, "cohort")),
    })
    .select("user_id, display_name, posse, cohort")
    .single();
  if (!inserted.error) return inserted.data as Profile;
  if (inserted.error.code !== "23505") throw inserted.error;

  const raced = await client
    .from("profiles")
    .select("user_id, display_name, posse, cohort")
    .eq("user_id", user.id)
    .single();
  if (raced.error) throw raced.error;
  return raced.data as Profile;
}

async function ensureSettings(user: User): Promise<LearningSettings> {
  const client = requireSupabase();
  const found = await client
    .from("learning_settings")
    .select("user_id, phase")
    .eq("user_id", user.id)
    .maybeSingle();
  if (found.error) throw found.error;
  if (found.data) return found.data as LearningSettings;

  const requested = user.user_metadata?.phase;
  const phase = requested === "ph2" ? "ph2" : "ph1";
  const inserted = await client
    .from("learning_settings")
    .insert({ user_id: user.id, phase })
    .select("user_id, phase")
    .single();
  if (!inserted.error) return inserted.data as LearningSettings;
  if (inserted.error.code !== "23505") throw inserted.error;

  const raced = await client
    .from("learning_settings")
    .select("user_id, phase")
    .eq("user_id", user.id)
    .single();
  if (raced.error) throw raced.error;
  return raced.data as LearningSettings;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(!supabaseConfigured);
  const [error, setError] = useState(supabaseConfigured ? "" : "Supabaseの環境変数が未設定です。");
  const [account, setAccount] = useState<{
    userId: string | null;
    profile: Profile | null;
    settings: LearningSettings | null;
    ready: boolean;
    error: string;
  }>({ userId: null, profile: null, settings: null, ready: false, error: "" });
  const lastUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let live = true;
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      if (!live) return;
      const nextUserId = next?.user.id ?? null;
      if (lastUserId.current !== nextUserId) {
        setAccount({ userId: nextUserId, profile: null, settings: null, ready: false, error: "" });
        lastUserId.current = nextUserId;
      }
      setSession(next);
      setError("");
    });
    void supabase.auth.getSession().then(({ data: value, error: sessionError }) => {
      if (!live) return;
      if (sessionError) setError("ログイン状態を確認できません。再読み込みしてください。");
      setSession(value.session);
      setReady(true);
    });
    return () => {
      live = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const user = session?.user ?? null;
  useEffect(() => {
    if (!ready || !user) return;
    let live = true;
    void Promise.all([ensureProfile(user), ensureSettings(user)])
      .then(([nextProfile, nextSettings]) => {
        if (!live) return;
        setAccount({ userId: user.id, profile: nextProfile, settings: nextSettings, ready: true, error: "" });
      })
      .catch(() => {
        if (!live) return;
        setAccount({
          userId: user.id,
          profile: null,
          settings: null,
          ready: true,
          error: "アカウント情報を読み込めません。接続設定を確認して再試行してください。",
        });
      });
    return () => {
      live = false;
    };
  }, [ready, user]);

  const signUp = useCallback(async (input: SignUpInput) => {
    const client = requireSupabase();
    const { data, error: signUpError } = await client.auth.signUp({
      email: input.email.trim(),
      password: input.password,
      options: {
        emailRedirectTo: authCallbackUrl(),
        data: {
          display_name: input.name.trim(),
          posse: nullableChoice(input.posse),
          cohort: nullableChoice(input.cohort),
          phase: input.phase,
        },
      },
    });
    if (signUpError) throw signUpError;
    return { needsEmailConfirmation: !data.session };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const client = requireSupabase();
    const { error: signInError } = await client.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) throw signInError;
  }, []);

  const signOut = useCallback(async () => {
    const client = requireSupabase();
    const { error: signOutError } = await client.auth.signOut();
    if (signOutError) throw signOutError;
  }, []);

  const savePhase = useCallback(async (phase: PhaseId) => {
    if (phase === "ph3") throw new Error("PH3のクイズはまだ利用できません。");
    const client = requireSupabase();
    const currentUser = session?.user;
    if (!currentUser) throw new Error("ログインしてください。");
    const { data, error: saveError } = await client
      .from("learning_settings")
      .update({ phase })
      .eq("user_id", currentUser.id)
      .select("user_id, phase")
      .single();
    if (saveError) throw saveError;
    setAccount((previous) =>
      previous.userId === currentUser.id
        ? { ...previous, settings: data as LearningSettings, ready: true }
        : previous,
    );
  }, [session?.user]);

  const saveProfile = useCallback(async (profile: { posse: string | null; cohort: string | null }) => {
    const client = requireSupabase();
    const currentUser = session?.user;
    if (!currentUser) throw new Error("ログインしてください。");
    const { data, error: saveError } = await client
      .from("profiles")
      .update({
        posse: nullableChoice(profile.posse),
        cohort: nullableChoice(profile.cohort),
      })
      .eq("user_id", currentUser.id)
      .select("user_id, display_name, posse, cohort")
      .single();
    if (saveError) throw saveError;
    setAccount((previous) =>
      previous.userId === currentUser.id
        ? { ...previous, profile: data as Profile, ready: true }
        : previous,
    );
  }, [session?.user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        ready,
        profile: account.userId === user?.id ? account.profile : null,
        settings: account.userId === user?.id ? account.settings : null,
        profileReady: Boolean(user && account.userId === user.id && account.ready),
        error: error || (account.userId === user?.id ? account.error : ""),
        signUp,
        signIn,
        signOut,
        savePhase,
        saveProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthProviderが必要です。");
  return context;
}
