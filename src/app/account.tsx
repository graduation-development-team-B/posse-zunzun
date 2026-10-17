import { useState } from "react";
import { Image, Platform, Pressable, StyleSheet, View } from "react-native";
import { BottomNav } from "@/components/drill/bottom-nav";
import { Body, DText, Pill, Screen } from "@/components/drill/ui";
import {
  ConfirmDialog,
  SettingsGroup,
  SettingsLink,
  StatusMessage,
} from "@/components/settings/ui";
import { Drill, Radius } from "@/constants/drill";
import { PHASES } from "@/data/drill";
import { useAuth } from "@/lib/auth/provider";
import { useFeedback } from "@/lib/feedback/provider";
import { useReminderSettings } from "@/lib/settings/use-reminder";

export default function AccountScreen() {
  const {
    user,
    profile,
    settings,
    profileReady,
    signOut,
    error: authError,
  } = useAuth();
  const { preferences, preferencesReady } = useFeedback();
  const reminder = useReminderSettings();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const phase = PHASES.find((p) => p.id === settings?.phase);
  const phaseLabel = phase ? `${phase.code} ${phase.title}` : "読み込み中…";
  const feedback = preferencesReady
    ? `振動 ${preferences.hapticsEnabled ? "オン" : "オフ"}・効果音 ${preferences.soundEnabled ? "オン" : "オフ"}`
    : "読み込み中…";
  const reminderLabel =
    Platform.OS !== "web"
      ? "PWAで設定できます"
      : reminder.error
        ? "設定を確認してください"
        : !reminder.ready
          ? "読み込み中…"
          : `毎日 ${reminder.savedTime}・${reminder.enabled ? "オン" : "オフ"}`;
  const logout = async () => {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await signOut();
    } catch {
      setError("ログアウトできませんでした。もう一度お試しください。");
    } finally {
      setBusy(false);
    }
  };
  return (
    <Screen>
      <View style={styles.heading}>
        <DText size={24} weight="bold" role="heading" aria-level={1}>
          設定
        </DText>
      </View>
      <Body paddingTop={4} gap={22}>
        <View style={styles.profile}>
          <Image
            source={require("../../assets/images/nettyu/default.png")}
            style={styles.mascot}
            accessibilityLabel="POSSEずんずんのマスコット"
          />
          <View style={styles.profileCopy}>
            <DText size={19} weight="bold">
              {profile?.display_name ?? "読み込み中…"}
            </DText>
            <DText size={12} color={Drill.textSub}>
              {profileReady
                ? `${profile?.posse ?? "所属未設定"}・${profile?.cohort ?? "期生未設定"}`
                : "アカウントを確認しています"}
            </DText>
            {phase && (
              <Pill
                label={`${phase.code} 学習中`}
                background={Drill.accentSoft}
                color={Drill.accentText}
              />
            )}
          </View>
        </View>
        <SettingsGroup title="学習設定">
          <SettingsLink
            first
            label="学習フェーズ"
            value={phaseLabel}
            icon="book"
            href="/settings/phase"
          />
          <SettingsLink
            label="学習リマインダー"
            value={reminderLabel}
            icon="bell"
            href="/settings/reminders"
          />
          <SettingsLink
            label="操作フィードバック"
            value={feedback}
            icon="vibration"
            href="/settings/feedback"
          />
        </SettingsGroup>
        <SettingsGroup title="アカウント管理">
          <SettingsLink
            first
            label="プロフィール編集"
            value="名前・所属POSSE・期生"
            icon="user"
            href="/settings/profile"
          />
          <SettingsLink
            label="メールアドレス"
            value={user?.email ?? "読み込み中…"}
            icon="mail"
            href="/settings/email"
          />
          <SettingsLink
            label="パスワード変更"
            value="ログインに使うパスワード"
            icon="lock"
            href="/settings/password"
          />
        </SettingsGroup>
        <StatusMessage error={authError} />
        <Pressable
          role="button"
          onPress={() => {
            setError("");
            setConfirmLogout(true);
          }}
          style={styles.logout}
        >
          <DText weight="bold" color={Drill.dangerText}>
            ログアウト
          </DText>
        </Pressable>
      </Body>
      <BottomNav active="account" />
      <ConfirmDialog
        visible={confirmLogout}
        title="ログアウトしますか？"
        description="学習記録は保存されています。再びログインすると続きから学習できます。"
        confirmLabel="ログアウト"
        busy={busy}
        error={error}
        onCancel={() => setConfirmLogout(false)}
        onConfirm={() => void logout()}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  heading: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 18 },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    backgroundColor: Drill.surface,
    borderRadius: Radius.xl,
  },
  mascot: { width: 64, height: 72, resizeMode: "contain" },
  profileCopy: { flex: 1, gap: 6 },
  logout: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Drill.surface,
    borderRadius: Radius.lg,
  },
});
