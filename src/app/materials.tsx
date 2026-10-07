import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { BottomNav } from "@/components/drill/bottom-nav";
import { RadioDot, SelectCard } from "@/components/drill/select";
import { SetupHeader } from "@/components/drill/setup-header";
import { Body, DText, Pill, ProgressBar, Screen } from "@/components/drill/ui";
import { Drill } from "@/constants/drill";
import { WEEK_STATE_LABEL } from "@/data/drill";
import { catalog } from "@/lib/content/catalog";
import { availablePhaseCodes } from "@/lib/content/phase";
import { useDashboard } from "@/lib/progress/dashboard";

/** 教材タブ ＝ 出題を選ぶ 1/2：Weekを1つ選ぶ */
export default function MaterialsScreen() {
  const router = useRouter();
  const { weeks: WEEKS, ready, error } = useDashboard();
  const [selected, setSelected] = useState("");

  const pick = (id: string) => {
    if (!ready) return;
    setSelected(id);
    router.push({ pathname: "/options", params: { week: id } });
  };

  return (
    <Screen>
      <SetupHeader title="Weekを選ぶ" step={1} />
      <Body paddingTop={20} paddingBottom={28} gap={8}>
        <DText size={13} color={Drill.textSub} style={styles.lead}>
          {`${availablePhaseCodes(catalog)} の中から、出題するWeekを1つ選んでください`}
        </DText>
        {Boolean(error) && <DText color={Drill.danger}>{error}</DText>}
        <View role="radiogroup" aria-label="Week" style={styles.list}>
          {WEEKS.map((week) => {
            const tag = WEEK_STATE_LABEL[week.state];
            return (
              <SelectCard
                key={week.id}
                label={week.title}
                selected={week.id === selected}
                onPress={() => pick(week.id)}
                style={styles.card}
              >
                <View style={styles.row}>
                  <RadioDot selected={week.id === selected} />
                  <View style={styles.main}>
                    <View style={styles.titleRow}>
                      <DText size={15} weight="bold">
                        {week.title}
                      </DText>
                      {week.state === "done" && (
                        <Pill
                          label={tag}
                          background={Drill.chip}
                          color={Drill.chipText}
                          paddingV={1}
                        />
                      )}
                      {week.state === "now" && (
                        <Pill
                          label={tag}
                          background={Drill.accent}
                          color={Drill.text}
                          paddingV={1}
                        />
                      )}
                      {week.state === "next" && (
                        <Pill
                          label={tag}
                          background={Drill.accentSoft}
                          color={Drill.accentText}
                          paddingV={1}
                        />
                      )}
                    </View>
                    <View style={styles.progressRow}>
                      <View style={styles.bar}>
                        <ProgressBar
                          ratio={week.done / week.total}
                          height={5}
                          track={Drill.track}
                        />
                      </View>
                      <DText
                        size={12}
                        color={Drill.textSub}
                        style={styles.count}
                      >
                        {week.done > 0
                          ? `${week.done} / ${week.total}問`
                          : "未着手"}
                      </DText>
                    </View>
                  </View>
                </View>
              </SelectCard>
            );
          })}
        </View>
      </Body>
      <BottomNav active="materials" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  lead: { marginBottom: 4 },
  list: { gap: 8 },
  card: { minHeight: 64, justifyContent: "center" },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  main: { flex: 1, minWidth: 0, gap: 6 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  progressRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  bar: { flex: 1 },
  count: { minWidth: 64, textAlign: "right" },
});
