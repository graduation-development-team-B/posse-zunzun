import { useState } from "react";
import { CtaButton } from "@/components/drill/buttons";
import { PasswordField } from "@/components/drill/form";
import { SettingsPage, StatusMessage } from "@/components/settings/ui";
import { useAuth } from "@/lib/auth/provider";
import { accountUpdateError } from "@/lib/settings/auth-error";
import { requireSupabase } from "@/lib/supabase/client";

export default function PasswordScreen() {
  const { user, signIn } = useAuth();
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const save = async () => {
    if (busy || !user?.email) return;
    setError("");
    setNotice("");
    if (password.length < 8) {
      setError("新しいパスワードは8文字以上で入力してください。");
      return;
    }
    if (password !== confirmation) {
      setError("新しいパスワードが一致していません。");
      return;
    }
    if (password === current) {
      setError("現在とは異なるパスワードを入力してください。");
      return;
    }
    setBusy(true);
    try {
      await signIn(user.email, current);
      const { error: failure } = await requireSupabase().auth.updateUser({
        password,
        current_password: current,
      });
      if (failure) throw failure;
      setCurrent("");
      setPassword("");
      setConfirmation("");
      setNotice("パスワードを変更しました。");
    } catch (cause) {
      setError(accountUpdateError(cause));
    } finally {
      setBusy(false);
    }
  };
  return (
    <SettingsPage
      title="パスワード変更"
      description="新しいパスワードは8文字以上で設定してください。"
    >
      <PasswordField
        label="現在のパスワード"
        autoComplete="current-password"
        value={current}
        editable={!busy}
        onChangeText={(value) => {
          setCurrent(value);
          setNotice("");
        }}
      />
      <PasswordField
        label="新しいパスワード"
        value={password}
        editable={!busy}
        onChangeText={(value) => {
          setPassword(value);
          setNotice("");
        }}
      />
      <PasswordField
        label="新しいパスワード（確認）"
        value={confirmation}
        editable={!busy}
        onChangeText={(value) => {
          setConfirmation(value);
          setNotice("");
        }}
      />
      <StatusMessage error={error} notice={notice} />
      {Boolean(current || password || confirmation) && (
        <CtaButton
          label={busy ? "変更しています…" : "パスワードを変更"}
          disabled={
            busy || !user?.email || !current || !password || !confirmation
          }
          onPress={() => void save()}
        />
      )}
    </SettingsPage>
  );
}
