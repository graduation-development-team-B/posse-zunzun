import { useState } from "react";
import { View } from "react-native";
import { RadioDot, SelectCard } from "@/components/drill/select";
import { DText } from "@/components/drill/ui";
import {
  ConfirmDialog,
  SettingsPage,
  StatusMessage,
} from "@/components/settings/ui";
import { Drill } from "@/constants/drill";
import { PHASES, type Phase } from "@/data/drill";
import { useAuth } from "@/lib/auth/provider";

export default function PhaseScreen() {
  const { settings, profileReady, savePhase, error: authError } = useAuth();
  const [pending, setPending] = useState<Phase | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const save = async () => {
    if (!pending || busy) return;
    setBusy(true);
    setError("");
    try {
      await savePhase(pending.id);
      setNotice(`${pending.code}に切り替えました。`);
      setPending(null);
    } catch {
      setError("フェーズを変更できませんでした。もう一度お試しください。");
    } finally {
      setBusy(false);
    }
  };
  return (
    <SettingsPage
      title="学習フェーズ"
      description="今の学習に合うフェーズを選びましょう。これまでの学習記録は残ります。"
    >
      <View role="radiogroup" aria-label="学習フェーズ" style={{ gap: 12 }}>
        {PHASES.map((phase) => (
          <SelectCard
            key={phase.id}
            label={`${phase.code} ${phase.title}`}
            selected={phase.id === settings?.phase}
            style={
              phase.id === settings?.phase
                ? {
                    borderColor: Drill.accent,
                    backgroundColor: Drill.accentSoft,
                  }
                : undefined
            }
            disabled={!profileReady || !settings || busy}
            onPress={() => {
              if (phase.id !== settings?.phase) {
                setError("");
                setNotice("");
                setPending(phase);
              }
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 14, alignItems: "center" }}
            >
              <RadioDot selected={phase.id === settings?.phase} />
              <View style={{ flex: 1, gap: 4 }}>
                <DText weight="bold" color={Drill.accentText}>
                  {phase.code}
                  {phase.id === settings?.phase ? "・学習中" : ""}
                </DText>
                <DText weight="bold">{phase.title}</DText>
                <DText size={12} color={Drill.textSub}>{phase.sub}</DText>
              </View>
            </View>
          </SelectCard>
        ))}
      </View>
      <StatusMessage error={authError} notice={notice} />
      <ConfirmDialog
        visible={Boolean(pending)}
        title={`${pending?.code ?? ""}に切り替えますか？`}
        description="ホームに表示する教材が変わります。以前のフェーズの学習記録はそのまま残ります。"
        confirmLabel="このフェーズに切り替える"
        busy={busy}
        error={error}
        onCancel={() => setPending(null)}
        onConfirm={() => void save()}
      />
    </SettingsPage>
  );
}
