import { useState } from "react";
import { CtaButton } from "@/components/drill/buttons";
import { TextField } from "@/components/drill/form";
import { DText } from "@/components/drill/ui";
import { SettingsPage, StatusMessage } from "@/components/settings/ui";
import { Drill } from "@/constants/drill";
import { useAuth } from "@/lib/auth/provider";
import { accountUpdateError } from "@/lib/settings/auth-error";
import { authCallbackUrl, requireSupabase } from "@/lib/supabase/client";

export default function EmailScreen() {
  const { user } = useAuth();
  const [email, setEmail] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitted, setSubmitted] = useState("");
  const draft = email ?? user?.email ?? "";
  const dirty = draft.trim() !== user?.email && draft.trim() !== submitted;
  const save = async () => {
    if (!user || busy || !dirty) return;
    const target = draft.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target)) {
      setError("有効なメールアドレスを入力してください。");
      return;
    }
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const { data, error: failure } = await requireSupabase().auth.updateUser(
        { email: target },
        { emailRedirectTo: authCallbackUrl() },
      );
      if (failure) throw failure;
      setSubmitted(target);
      setNotice(
        data.user?.email === target
          ? "メールアドレスを変更しました。"
          : "変更確認のメールを送りました。届いたメールの案内に沿って変更を完了してください。",
      );
    } catch (cause) {
      setError(accountUpdateError(cause));
    } finally {
      setBusy(false);
    }
  };
  return (
    <SettingsPage
      title="メールアドレス"
      description="ログインに使うメールアドレスを変更します。"
    >
      <DText size={13} color={Drill.textSub}>
        登録中：{user?.email ?? "読み込み中…"}
      </DText>
      {Boolean(user?.new_email) && (
        <DText size={13} color={Drill.accentText}>
          確認待ち：{user?.new_email}
        </DText>
      )}
      <TextField
        label="新しいメールアドレス"
        value={draft}
        editable={!busy && Boolean(user)}
        onChangeText={(value) => {
          setEmail(value);
          setError("");
          setNotice("");
        }}
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <DText size={12} color={Drill.textSub} lh={1.7}>
        確認メールが届いた場合は、メール内のリンクを開いてください。現在と変更先の両方に届く場合があります。
      </DText>
      <StatusMessage error={error} notice={notice} />
      {dirty && (
        <CtaButton
          label={busy ? "変更しています…" : "メールアドレスを変更"}
          disabled={busy || !draft.trim() || !user}
          onPress={() => void save()}
        />
      )}
    </SettingsPage>
  );
}
