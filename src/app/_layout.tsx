import { DefaultTheme, Stack, ThemeProvider, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

import { Drill } from "@/constants/drill";
import { AuthProvider, useAuth } from "@/lib/auth/provider";
import { LearningProvider } from "@/lib/progress/provider";
import { FeedbackProvider } from "@/lib/feedback/provider";
import { Body, DText, Screen } from "@/components/drill/ui";

/** ミニドリルはライト固定。画面はすべてこの Stack の子として並ぶ */
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Drill.bg,
    card: Drill.surface,
    text: Drill.text,
    border: Drill.border,
    primary: Drill.accent,
  },
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider value={theme}>
        <LearningProvider>
          <FeedbackProvider>
            <AuthRouter />
          </FeedbackProvider>
        </LearningProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function AuthRouter() {
  const { user, ready } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const first = segments[0];
  const publicRoute = first === "onboarding" || first === "login" || first === "auth";

  useEffect(() => {
    if (!ready) return;
    if (!user && !publicRoute) router.replace("/onboarding");
    else if (user && (first === "onboarding" || first === "login")) router.replace("/");
  }, [first, publicRoute, ready, router, user]);

  if (!ready) {
    return (
      <Screen>
        <Body>
          <DText>ログイン状態を確認しています…</DText>
        </Body>
      </Screen>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Drill.bg },
      }}
    />
  );
}
