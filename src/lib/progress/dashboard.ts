import { catalog } from "@/lib/content/catalog";
import { PHASES } from "@/data/drill";
import { useAuth } from "@/lib/auth/provider";
import { useLearning } from "./provider";
import { presentationData } from "./presentation";
export function useDashboard() {
  const learning = useLearning();
  const { settings, profileReady } = useAuth();
  const phase = PHASES.find((item) => item.id === settings?.phase);
  const data = presentationData(
    learning.state,
    catalog,
    new Date(),
    phase?.code ?? "",
  );
  const phaseGroups = data.phaseGroups
    .flatMap((group) => {
      const groupPhase = PHASES.find((item) => item.code === group.code);
      return groupPhase ? [{ phase: groupPhase, weeks: group.weeks }] : [];
    })
    .sort(
      (a, b) =>
        Number(b.phase.id === phase?.id) - Number(a.phase.id === phase?.id),
    );
  return {
    ...learning,
    ...data,
    phase,
    phaseGroups,
    ready: learning.ready && profileReady,
  };
}
