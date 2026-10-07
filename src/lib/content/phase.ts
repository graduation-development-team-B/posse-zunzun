import type { ContentCatalog } from "../../types/content.ts";
import { CURRENT_PHASE, PHASES } from "../../data/drill.ts";

export function phaseForUnit(catalog: ContentCatalog, key: string) {
  const code = catalog.weekUnits.find((u) => u.key === key)?.phase ?? "PH1";
  return PHASES.find((p) => p.code === code) ?? CURRENT_PHASE;
}
export function availablePhaseCodes(catalog: ContentCatalog) {
  return [...new Set(catalog.weekUnits.map((u) => u.phase ?? "PH1"))].join(
    "・",
  );
}
