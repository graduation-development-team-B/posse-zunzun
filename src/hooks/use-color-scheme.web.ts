import { useSyncExternalStore } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";
const subscribe = () => () => {};
const client = () => true;
const server = () => false;
/** サーバーと初回のクライアント表示はlightにそろえる。 */
export function useColorScheme() {
  const hydrated = useSyncExternalStore(subscribe, client, server);
  const colorScheme = useRNColorScheme();
  return hydrated ? colorScheme : "light";
}
