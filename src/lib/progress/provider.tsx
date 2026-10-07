import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { catalog } from "@/lib/content/catalog";
import {
  emptyProgress,
  restoreProgress,
  submitAnswer,
  type ExecutionProof,
  type Progress,
} from "@/lib/quiz/session";
import type { QuestionItem } from "@/types/content";
import { loadAnswers, saveAnswer } from "./answerRepository";
import { storage, STORAGE_KEY } from "./storage";
import { useAuth } from "@/lib/auth/provider";

type Learning = {
  state: Progress;
  ready: boolean;
  error: string;
  mutate: (fn: (state: Progress) => Progress) => Promise<Progress>;
  confirmAnswer: (question: QuestionItem, proof?: ExecutionProof) => Promise<Progress>;
  reload: () => void;
};
const Context = createContext<Learning | null>(null);
type LoadedProgress = {
  key: string | null;
  value: Progress;
  ready: boolean;
  error: string;
};
export function LearningProvider({ children }: { children: ReactNode }) {
  const { user, ready: authReady } = useAuth();
  const storageKey = user ? `${STORAGE_KEY}:v2:${user.id}` : null;
  const userId = user?.id ?? null;
  const [loaded, setLoaded] = useState<LoadedProgress>({
    key: null,
    value: emptyProgress(),
    ready: false,
    error: "",
  });
  const ref = useRef<Progress>(emptyProgress());
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  const generation = useRef(0);
  const [reloadKey, setReloadKey] = useState(0);
  useEffect(() => {
    if (!authReady || !storageKey || !userId) return;
    let live = true;
    const currentGeneration = ++generation.current;
    queue.current = Promise.resolve();
    ref.current = emptyProgress();
    storage
      .getItem(storageKey)
      .then(async (raw) => {
        if (!live || generation.current !== currentGeneration) return;
        const local = restoreProgress(raw, catalog);
        const remote = await loadAnswers(userId);
        if (!live || generation.current !== currentGeneration) return;
        const byId = new Map(local.answers.map((answer) => [answer.id, answer]));
        for (const answer of remote) byId.set(answer.id, answer);
        const restored = restoreProgress(
          JSON.stringify({ ...local, answers: [...byId.values()] }),
          catalog,
        );
        await storage.setItem(storageKey, JSON.stringify(restored));
        if (live && generation.current === currentGeneration) {
          ref.current = restored;
          setLoaded({ key: storageKey, value: restored, ready: true, error: "" });
        }
      })
      .catch(() => {
        if (live && generation.current === currentGeneration) {
          setLoaded({
            key: storageKey,
            value: emptyProgress(),
            ready: false,
            error: "学習記録を読み込めません。保存設定を確認して、再試行してください。",
          });
        }
      });
    return () => {
      live = false;
    };
  }, [authReady, reloadKey, storageKey, userId]);
  const ready = authReady && Boolean(storageKey) && loaded.key === storageKey && loaded.ready;
  const state = ready ? loaded.value : emptyProgress();
  const visibleError = loaded.key === storageKey ? loaded.error : "";
  const mutate = (fn: (state: Progress) => Progress): Promise<Progress> => {
    const requestedKey = storageKey;
    const requestedGeneration = generation.current;
    const task = queue.current
      .catch(() => {})
      .then(async () => {
        if (!ready || !requestedKey || requestedGeneration !== generation.current)
          throw new Error("学習記録を読み込み中です。");
        const next = fn(ref.current);
        if (next === ref.current) return next;
        await storage.setItem(requestedKey, JSON.stringify(next));
        if (requestedGeneration !== generation.current) return next;
        ref.current = next;
        setLoaded({ key: requestedKey, value: next, ready: true, error: "" });
        return next;
      });
    queue.current = task;
    return task.catch((error) => {
      if (requestedGeneration === generation.current)
        setLoaded((previous) =>
          previous.key === requestedKey
            ? {
                ...previous,
                error: error instanceof Error ? error.message : "保存に失敗しました。再試行してください。",
              }
            : previous,
        );
      throw error;
    });
  };
  const confirmAnswer = (
    question: QuestionItem,
    proof?: ExecutionProof,
  ): Promise<Progress> => {
    const requestedKey = storageKey;
    const requestedGeneration = generation.current;
    const task = queue.current
      .catch(() => {})
      .then(async () => {
        if (!ready || !requestedKey || !user || requestedGeneration !== generation.current)
          throw new Error("ログイン状態を確認して再度お試しください。");
        const candidate = submitAnswer(ref.current, question, catalog, proof);
        if (candidate === ref.current) return ref.current;
        const pending = candidate.answers[candidate.answers.length - 1];
        const accepted = await saveAnswer(user.id, pending);
        if (requestedGeneration !== generation.current) return ref.current;
        const byId = new Map(ref.current.answers.map((answer) => [answer.id, answer]));
        byId.set(accepted.id, accepted);
        const next = { ...ref.current, answers: [...byId.values()] };
        await storage.setItem(requestedKey, JSON.stringify(next));
        if (requestedGeneration !== generation.current) return ref.current;
        ref.current = next;
        setLoaded({ key: requestedKey, value: next, ready: true, error: "" });
        return next;
      });
    queue.current = task;
    return task.catch((cause) => {
      if (requestedGeneration === generation.current) {
        setLoaded((previous) =>
          previous.key === requestedKey
            ? {
                ...previous,
                error: cause instanceof Error
                  ? cause.message
                  : "回答を保存できませんでした。通信を確認して再度お試しください。",
              }
            : previous,
        );
      }
      throw cause;
    });
  };
  return (
    <Context.Provider
      value={{
        state,
        ready,
        error: visibleError,
        mutate,
        confirmAnswer,
        reload: () => {
          setReloadKey((k) => k + 1);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useLearning(): Learning {
  const context = useContext(Context);
  if (!context) throw new Error("LearningProviderが必要");
  return context;
}
