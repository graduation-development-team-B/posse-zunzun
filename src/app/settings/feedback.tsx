import { useState } from "react";
import {
  SettingsGroup,
  SettingsPage,
  SettingsToggle,
  StatusMessage,
} from "@/components/settings/ui";
import { useFeedback, type FeedbackPreferences } from "@/lib/feedback/provider";

export default function FeedbackScreen() {
  const { preferences, preferencesReady, updatePreferences } = useFeedback();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const save = async (next: FeedbackPreferences) => {
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await updatePreferences(next);
      setNotice("この端末に保存しました。");
    } catch {
      setError("保存できませんでした。もう一度お試しください。");
    } finally {
      setBusy(false);
    }
  };
  return (
    <SettingsPage
      title="操作フィードバック"
      description="選択や回答の反応を、自分好みに。変更はこの端末に自動保存されます。"
    >
      <SettingsGroup>
        <SettingsToggle
          first
          label="振動"
          description="選択・回答・次の問題への移動"
          value={preferences.hapticsEnabled}
          disabled={!preferencesReady || busy}
          onChange={(hapticsEnabled) =>
            void save({ ...preferences, hapticsEnabled })
          }
        />
        <SettingsToggle
          label="効果音"
          description="正解・不正解の回答時"
          value={preferences.soundEnabled}
          disabled={!preferencesReady || busy}
          onChange={(soundEnabled) =>
            void save({ ...preferences, soundEnabled })
          }
        />
      </SettingsGroup>
      <StatusMessage error={error} notice={notice} />
    </SettingsPage>
  );
}
