import { Platform } from "react-native";
import { requireSupabase } from "@/lib/supabase/client";
import { reminderStep } from "./errors";

export type ReminderPreference = {
  enabled: boolean;
  reminder_time: string;
};

function browserOnly(): void {
  if (Platform.OS !== "web" || typeof window === "undefined") {
    throw new Error("学習リマインダーはPWAで利用できます。");
  }
}

function applicationServerKey(value: string): ArrayBuffer {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const binary = window.atob(
    value.replace(/-/g, "+").replace(/_/g, "/") + padding,
  );
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let index = 0; index < binary.length; index++)
    bytes[index] = binary.charCodeAt(index);
  return buffer;
}

function encodeBase64Url(value: ArrayBuffer): string {
  const bytes = new Uint8Array(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return window
    .btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function getSubscription() {
  browserOnly();
  if (!("serviceWorker" in navigator) || !("PushManager" in window))
    return null;
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return null;
  return registration.pushManager.getSubscription();
}

function sameApplicationServerKey(
  subscription: PushSubscription,
  publicKey: string,
): boolean {
  const currentKey = subscription.options.applicationServerKey;
  if (!currentKey) return false;
  const expectedKey = new Uint8Array(applicationServerKey(publicKey));
  const actualKey = new Uint8Array(currentKey);
  return (
    expectedKey.length === actualKey.length &&
    expectedKey.every((byte, index) => byte === actualKey[index])
  );
}

export async function loadReminderPreference(
  userId: string,
): Promise<ReminderPreference | null> {
  const subscription = await getSubscription();
  if (!subscription) return null;
  const { data, error } = await requireSupabase()
    .from("push_subscriptions")
    .select("enabled, reminder_time")
    .eq("user_id", userId)
    .eq("endpoint", subscription.endpoint)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function enableReminder(
  userId: string,
  reminderTime: string,
): Promise<void> {
  browserOnly();
  if (
    !window.isSecureContext ||
    !("serviceWorker" in navigator) ||
    !("PushManager" in window)
  ) {
    throw new Error(
      "このブラウザーでは通知を利用できません。HTTPSのPWAからお試しください。",
    );
  }
  const publicKey = process.env.EXPO_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY?.trim();
  if (!publicKey) throw new Error("通知の公開鍵が設定されていません。");
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(reminderTime)) {
    throw new Error("通知時刻を選び直してください。");
  }

  const permission = await reminderStep(
    "通知の許可を確認できませんでした。",
    () => Notification.requestPermission(),
  );
  if (permission !== "granted")
    throw new Error(
      "通知が許可されていません。ブラウザーの設定をご確認ください。",
    );

  const registration = await reminderStep(
    "通知の準備に失敗しました。",
    async () => {
      await navigator.serviceWorker.register("/sw.js");
      return await navigator.serviceWorker.ready;
    },
  );
  const { subscription, previousEndpoint } = await reminderStep(
    "通知サービスへの登録に失敗しました。",
    async () => {
      let subscription = await registration.pushManager.getSubscription();
      let previousEndpoint: string | null = null;
      if (subscription && !sameApplicationServerKey(subscription, publicKey)) {
        previousEndpoint = subscription.endpoint;
        const unsubscribed = await subscription.unsubscribe();
        if (!unsubscribed)
          throw new Error(
            "以前の通知購読を更新できませんでした。ブラウザーの通知設定をご確認ください。",
          );
        subscription = null;
      }
      subscription ??= await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey(publicKey),
      });
      return { subscription, previousEndpoint };
    },
  );
  const p256dh = subscription.getKey("p256dh");
  const auth = subscription.getKey("auth");
  if (!p256dh || !auth)
    throw new Error("通知の購読情報を読み取れませんでした。");

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!timezone) throw new Error("端末のタイムゾーンを取得できませんでした。");

  await reminderStep("通知設定を保存できませんでした。", async () => {
    const { error } = await requireSupabase()
      .from("push_subscriptions")
      .upsert(
        {
          user_id: userId,
          endpoint: subscription.endpoint,
          p256dh: encodeBase64Url(p256dh),
          auth: encodeBase64Url(auth),
          enabled: true,
          reminder_time: reminderTime,
          reminder_timezone: timezone,
        },
        { onConflict: "endpoint" },
      );
    if (error) throw error;
  });
  if (previousEndpoint) {
    await reminderStep(
      "新しい通知設定は保存しましたが、以前の通知設定を整理できませんでした。",
      async () => {
        const { error: cleanupError } = await requireSupabase()
          .from("push_subscriptions")
          .delete()
          .eq("user_id", userId)
          .eq("endpoint", previousEndpoint);
        if (cleanupError) throw cleanupError;
      },
    );
  }
}

export async function updateReminderTime(
  userId: string,
  reminderTime: string,
): Promise<void> {
  browserOnly();
  const subscription = await getSubscription();
  if (!subscription)
    throw new Error("通知をオンにしてから時刻を保存してください。");
  const { error, data } = await requireSupabase()
    .from("push_subscriptions")
    .update({
      reminder_time: reminderTime,
      reminder_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
    .eq("user_id", userId)
    .eq("endpoint", subscription.endpoint)
    .select("id");
  if (error) throw error;
  if (!data?.length)
    throw new Error(
      "通知設定を見つけられませんでした。通知をもう一度オンにしてください。",
    );
}

export async function disableReminder(userId: string): Promise<void> {
  browserOnly();
  const subscription = await getSubscription();
  if (!subscription) return;
  const { error } = await requireSupabase()
    .from("push_subscriptions")
    .update({ enabled: false })
    .eq("user_id", userId)
    .eq("endpoint", subscription.endpoint);
  if (error) throw error;
}
