import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import { Platform } from "react-native";
import { useAuth } from "@/lib/auth/provider";
import {
  disableReminder,
  enableReminder,
  loadReminderPreference,
  updateReminderTime,
} from "@/lib/notifications/webPush";
import { reminderErrorMessage } from "@/lib/notifications/errors";

export function useReminderSettings() {
  const { user } = useAuth();
  const userId = user?.id;
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState("20:00");
  const [savedTime, setSavedTime] = useState("20:00");
  const [hasPreference, setHasPreference] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const requestId = useRef(0);
  const locked = useRef(false);
  const load = useCallback(async () => {
    const request = ++requestId.current;
    setReady(false);
    setError("");
    if (Platform.OS !== "web" || !userId) return;
    await loadReminderPreference(userId)
      .then((value) => {
        if (request !== requestId.current) return;
        const next = value ? `${value.reminder_time.slice(0, 2)}:00` : "20:00";
        setEnabled(value?.enabled ?? false);
        setHasPreference(Boolean(value));
        setTime(next);
        setSavedTime(next);
        setReady(true);
      })
      .catch((cause) => {
        if (request === requestId.current)
          setError(
            reminderErrorMessage(cause, "通知設定を読み込めませんでした。"),
          );
      });
  }, [userId]);
  useFocusEffect(
    useCallback(() => {
      void load();
      return () => {
        requestId.current += 1;
      };
    }, [load]),
  );

  const run = async (operation: () => Promise<void>) => {
    if (!userId || !ready || locked.current) return;
    locked.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await operation();
    } catch (cause) {
      setError(reminderErrorMessage(cause, "通知設定を保存できませんでした。"));
    } finally {
      locked.current = false;
      setBusy(false);
    }
  };
  return {
    enabled,
    time,
    savedTime,
    hasPreference,
    ready,
    busy,
    error,
    notice,
    setTime: (value: string) => {
      setTime(value);
      setNotice("");
    },
    reload: () => void load(),
    toggle: (next: boolean) =>
      run(async () => {
        if (next) {
          await enableReminder(userId!, time);
          setSavedTime(time);
          setHasPreference(true);
        } else await disableReminder(userId!);
        setEnabled(next);
        setNotice(
          next
            ? "学習リマインダーをオンにしました。"
            : "学習リマインダーをオフにしました。",
        );
      }),
    saveTime: () =>
      run(async () => {
        await updateReminderTime(userId!, time);
        setSavedTime(time);
        setNotice("通知時刻を保存しました。");
      }),
  };
}
