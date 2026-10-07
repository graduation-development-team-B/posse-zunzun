import { useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";

import { CtaButton, TextLink } from "@/components/drill/buttons";
import { PasswordField, TextField } from "@/components/drill/form";
import { Mascot } from "@/components/drill/mascot";
import { Body, DText, Footer, Screen } from "@/components/drill/ui";
import { Drill } from "@/constants/drill";
import { useAuth } from "@/lib/auth/provider";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (busy) return;
    if (!email.trim() || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await signIn(email, password);
      router.replace("/");
    } catch {
      setError("ログインできませんでした。入力内容を確認してください。");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen>
      <Body paddingTop={24} paddingBottom={24} gap={20}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Mascot name="default" width={72} alt="熱中くん" />
          <View style={{ flex: 1 }}>
            <DText size={20} weight="bold" role="heading" aria-level={1}>
              おかえりなさい！
            </DText>
            <DText size={13} color={Drill.textSub}>
              ログインして学習を続けよう
            </DText>
          </View>
        </View>
        <View style={{ gap: 14 }}>
          <TextField
            label="メールアドレス"
            value={email}
            onChangeText={setEmail}
            placeholder="メールアドレス"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <PasswordField
            label="パスワード"
            value={password}
            onChangeText={setPassword}
            autoComplete="current-password"
          />
        </View>
        {Boolean(error) && <DText role="alert" color={Drill.danger}>{error}</DText>}
      </Body>
      <Footer>
        <CtaButton
          label={busy ? "ログインしています…" : "ログイン"}
          onPress={() => void submit()}
          disabled={busy}
        />
        <TextLink label="アカウントを作成する" href="/onboarding" minHeight={40} />
      </Footer>
    </Screen>
  );
}
