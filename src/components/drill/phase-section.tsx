import { useState, type ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Drill } from "@/constants/drill";
import { Icon } from "./icons";
import { DText } from "./ui";

/** 選択中のPHは開き、他のPHも見出しからすぐに展開できる。 */
export function PhaseSection({
  title,
  summary,
  initiallyExpanded,
  children,
}: {
  title: string;
  summary: string;
  initiallyExpanded: boolean;
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  return (
    <View>
      <Pressable
        role="button"
        aria-label={`${title}を${expanded ? "折りたたむ" : "表示"}`}
        accessibilityState={{ expanded }}
        onPress={() => setExpanded((value) => !value)}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}
      >
        <DText
          size={15}
          weight="bold"
          role="heading"
          aria-level={2}
          style={styles.title}
        >
          {title}
        </DText>
        {expanded && (
          <DText size={12} color={Drill.textSub}>
            {summary}
          </DText>
        )}
        <View style={expanded ? styles.expanded : undefined}>
          <Icon name="chevronRight" size={18} color={Drill.textSub} />
        </View>
      </Pressable>
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 48, flexDirection: "row", alignItems: "center", gap: 8 },
  title: { flex: 1, minWidth: 0 },
  pressed: { opacity: 0.75 },
  expanded: { transform: [{ rotate: "90deg" }] },
  content: { gap: 8, paddingTop: 4 },
});
