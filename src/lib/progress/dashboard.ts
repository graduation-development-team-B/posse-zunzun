import { catalog } from "@/lib/content/catalog";
import { useLearning } from "./provider";
import { presentationData } from "./presentation";
export function useDashboard() {
  const learning = useLearning();
  return { ...learning, ...presentationData(learning.state, catalog) };
}
