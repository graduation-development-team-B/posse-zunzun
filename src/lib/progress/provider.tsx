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
  type Progress,
} from "@/lib/quiz/session";
import { storage, STORAGE_KEY } from "./storage";

type Learning = {
  state: Progress;
  ready: boolean;
  error: string;
  mutate: (fn: (state: Progress) => Progress) => Promise<Progress>;
  reload: () => void;
};
const Context = createContext<Learning | null>(null);
export function LearningProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Progress>(emptyProgress);
  const ref = useRef(state);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  const [reloadKey, setReloadKey] = useState(0);
  useEffect(() => {
    let live = true;
    storage
      .getItem(STORAGE_KEY)
      .then((raw) => {
        if (live) {
          const restored = restoreProgress(raw, catalog);
          ref.current = restored;
          setState(restored);
          setReady(true);
          setError("");
        }
      })
      .catch(() => {
        if (live)
          setError(
            "学習記録を読み込めません。保存設定を確認して、再試行してください。",
          );
      });
    return () => {
      live = false;
    };
  }, [reloadKey]);
  const mutate = (fn: (state: Progress) => Progress): Promise<Progress> => {
    const task = queue.current
      .catch(() => {})
      .then(async () => {
        if (!ready) throw new Error("学習記録を読み込み中です。");
        const next = fn(ref.current);
        if (next === ref.current) return next;
        await storage.setItem(STORAGE_KEY, JSON.stringify(next));
        ref.current = next;
        setState(next);
        setError("");
        return next;
      });
    queue.current = task;
    return task.catch((error) => {
      setError(
        error instanceof Error
          ? error.message
          : "保存に失敗しました。再試行してください。",
      );
      throw error;
    });
  };
  return (
    <Context.Provider
      value={{
        state,
        ready,
        error,
        mutate,
        reload: () => {
          setReady(false);
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
