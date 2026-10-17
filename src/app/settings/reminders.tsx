import { useState } from "react";
import { Platform, Pressable, View } from "react-native";
import { CtaButton } from "@/components/drill/buttons";
import { PwaNotificationSetup } from "@/components/drill/pwa-notification-setup";
import { ReminderTimeInput } from "@/components/drill/reminder-time-input";
import { DText } from "@/components/drill/ui";
import {
  SettingsGroup,
  SettingsPage,
  SettingsToggle,
  StatusMessage,
  s,
} from "@/components/settings/ui";
import { Drill } from "@/constants/drill";
import { useReminderSettings } from "@/lib/settings/use-reminder";

export default function RemindersScreen() {
  const r = useReminderSettings();
  const [details, setDetails] = useState(false);
  return (
    <SettingsPage
      title="学習リマインダー"
      description="毎日の学習を忘れないように、お知らせします。"
    >
      {Platform.OS === "web" ? (
        <>
          <SettingsGroup>
            <SettingsToggle
              first
              label="通知を受け取る"
              description={
                r.busy ? "保存しています…" : "変更は自動保存されます"
              }
              value={r.enabled}
              disabled={!r.ready || r.busy}
              onChange={(next) => void r.toggle(next)}
            />
          </SettingsGroup>
          <ReminderTimeInput
            value={r.time}
            onChange={r.setTime}
            disabled={!r.ready || r.busy}
          />
          {r.hasPreference && r.time !== r.savedTime && (
            <CtaButton
              label={r.busy ? "保存しています…" : "通知時刻を保存"}
              disabled={r.busy}
              onPress={() => void r.saveTime()}
            />
          )}
          {!r.hasPreference && r.ready && (
            <DText size={12} color={Drill.textSub}>
              通知をオンにすると、選んだ時刻を保存します。
            </DText>
          )}
          <StatusMessage error={r.error} notice={r.notice} />
          {!r.ready && Boolean(r.error) && (
            <CtaButton label="再読み込み" onPress={r.reload} />
          )}
          <View style={[s.card, { padding: 18, gap: 8 }]}>
            <DText size={12} color={Drill.textSub}>
              通知プレビュー
            </DText>
            <DText weight="bold" color={Drill.accentText}>
              🔥 POSSEずんずん
            </DText>
            <DText weight="bold">今日の3問、やってみませんか？</DText>
          </View>
          <DText color={Drill.textSub} size={13}>
            1日3問から、コツコツ学習を続けよう！
          </DText>
          <Pressable
            role="button"
            accessibilityState={{ expanded: details }}
            onPress={() => setDetails(!details)}
            style={{ minHeight: 44, justifyContent: "center" }}
          >
            <DText color={Drill.accentText} weight="bold">
              {details
                ? "通知の詳しい設定を閉じる"
                : "通知のルール・受け取り方"}
            </DText>
          </Pressable>
          {details && (
            <View style={{ gap: 12 }}>
              <DText color={Drill.textSub} size={13} lh={1.7}>
                端末のタイムゾーンに合わせ、0時〜23時から1時間単位で選べます。その日に1問以上解いている場合は通知しません。通知設定はこの端末ごとに保存されます。
              </DText>
              <PwaNotificationSetup />
            </View>
          )}
        </>
      ) : (
        <DText color={Drill.textSub} lh={1.7}>
          学習リマインダーはPWAで利用できます。ホーム画面に追加したPWAを開いて設定してください。
        </DText>
      )}
    </SettingsPage>
  );
}
