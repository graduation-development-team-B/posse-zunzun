import { DefaultTheme, Stack, ThemeProvider } from "expo-router";

import { Drill } from "@/constants/drill";
import { LearningProvider } from "@/lib/progress/provider";

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
    <LearningProvider>
      <ThemeProvider value={theme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Drill.bg },
          }}
        />
      </ThemeProvider>
    </LearningProvider>
  );
}
