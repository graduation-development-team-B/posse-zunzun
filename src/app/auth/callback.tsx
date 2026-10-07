import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { CtaButton } from "@/components/drill/buttons";
import { Body, DText, Screen } from "@/components/drill/ui";
import { Drill } from "@/constants/drill";
import { useAuth } from "@/lib/auth/provider";

export default function AuthCallbackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ error_description?: string }>();
  const { user, ready, error } = useAuth();
  const callbackError =
    typeof params.error_description === "string" ? params.error_description : "";

  useEffect(() => {
    if (ready && user) router.replace("/");
  }, [ready, router, user]);

  return (
    <Screen>
      <Body>
        <DText size={18} weight="bold" role="heading" aria-level={1}>
          メールを確認しています
        </DText>
        {Boolean(callbackError || error) ? (
          <>
            <DText role="alert" color={Drill.danger}>
              {callbackError || error}
            </DText>
            <CtaButton label="ログイン画面へ" href="/login" />
          </>
        ) : (
          <DText color={Drill.textSub}>
            確認が終わると、自動で学習画面へ進みます。
          </DText>
        )}
      </Body>
    </Screen>
  );
}
