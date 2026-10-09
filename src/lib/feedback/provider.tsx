import { useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { storage } from '@/lib/progress/storage';

const FEEDBACK_KEY = 'posse-zunzun:feedback:v1';

export type FeedbackPreferences = {
  hapticsEnabled: boolean;
  soundEnabled: boolean;
};

const DEFAULT_PREFERENCES: FeedbackPreferences = {
  hapticsEnabled: true,
  soundEnabled: false,
};

type FeedbackContextValue = {
  preferences: FeedbackPreferences;
  preferencesReady: boolean;
  updatePreferences: (next: FeedbackPreferences) => void;
  selection: () => void;
  answer: (correct: boolean) => void;
  next: () => void;
};

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const correctPlayer = useAudioPlayer(require('../../../assets/sounds/correct.wav'));
  const incorrectPlayer = useAudioPlayer(require('../../../assets/sounds/incorrect.wav'));
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [preferencesReady, setPreferencesReady] = useState(false);

  useEffect(() => {
    let active = true;
    void storage.getItem(FEEDBACK_KEY).then((saved) => {
      if (!active || !saved) return;
      try {
        const parsed = JSON.parse(saved) as Partial<FeedbackPreferences>;
        setPreferences({
          hapticsEnabled: parsed.hapticsEnabled !== false,
          soundEnabled: parsed.soundEnabled === true,
        });
      } catch {
        // Ignore invalid local preference data and keep defaults.
      }
    }).catch(() => {}).finally(() => {
      if (active) setPreferencesReady(true);
    });
    return () => { active = false; };
  }, []);

  const updatePreferences = useCallback((next: FeedbackPreferences) => {
    setPreferences(next);
    void storage.setItem(FEEDBACK_KEY, JSON.stringify(next)).catch(() => {});
  }, []);

  const selection = useCallback(() => {
    if (preferences.hapticsEnabled) void Haptics.selectionAsync().catch(() => {});
  }, [preferences.hapticsEnabled]);

  const answer = useCallback((correct: boolean) => {
    if (preferences.hapticsEnabled) {
      void Haptics.notificationAsync(
        correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning,
      ).catch(() => {});
    }
    if (preferences.soundEnabled) {
      const player = correct ? correctPlayer : incorrectPlayer;
      void player.seekTo(0).then(() => player.play()).catch(() => {});
    }
  }, [correctPlayer, incorrectPlayer, preferences.hapticsEnabled, preferences.soundEnabled]);

  const next = useCallback(() => {
    if (preferences.hapticsEnabled) void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }, [preferences.hapticsEnabled]);

  const value = useMemo(() => ({ preferences, preferencesReady, updatePreferences, selection, answer, next }),
    [preferences, preferencesReady, updatePreferences, selection, answer, next]);

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error('useFeedback must be used within FeedbackProvider');
  return context;
}
