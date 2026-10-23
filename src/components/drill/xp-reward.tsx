import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useReducedMotion,
  useSharedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { Drill, Radius } from "@/constants/drill";
import { levelDisplay } from "@/lib/progress/presentation";
import { xpFrame, xpTimeline } from "@/lib/progress/xp-animation";
import { Icon } from "./icons";
import { DText } from "./ui";

export function XpReward({ before, after, onLevelChange }: { before: number; after: number; onLevelChange?: (level: number) => void }) {
  const timeline = useMemo(() => xpTimeline(before, after), [before, after]);
  const reducedMotion = useReducedMotion();
  const clock = useSharedValue(reducedMotion ? timeline.duration : 0);
  const trackWidth = useSharedValue(0);
  const frame = useDerivedValue(() => xpFrame(timeline, clock.get()));
  const [display, setDisplay] = useState(() =>
    xpFrame(timeline, reducedMotion ? timeline.duration : 0),
  );
  useEffect(() => {
    onLevelChange?.(display.level);
  }, [display.level, onLevelChange]);

  useAnimatedReaction(
    () => ({
      level: frame.get().level,
      xp: Math.floor(frame.get().xp + 0.00001),
      total: Math.floor(frame.get().total + 0.00001),
    }),
    (value, previous) => {
      if (
        !previous ||
        value.level !== previous.level ||
        value.xp !== previous.xp ||
        value.total !== previous.total
      )
        scheduleOnRN(setDisplay, { ...value, baseline: 0, pulse: 0 });
    },
  );
  useEffect(() => {
    clock.set(reducedMotion ? timeline.duration : 0);
    if (!reducedMotion && timeline.gained > 0)
      clock.set(
        withTiming(timeline.duration, {
          duration: timeline.duration,
          easing: Easing.linear,
        }),
      );
    return () => cancelAnimation(clock);
  }, [clock, reducedMotion, timeline]);

  const baseline = useAnimatedStyle(() => ({
    width: `${frame.get().baseline}%`,
  }));
  const earned = useAnimatedStyle(() => ({
    left: `${frame.get().baseline}%`,
    width: `${Math.max(0, frame.get().xp - frame.get().baseline)}%`,
  }));
  const glow = useAnimatedStyle(() => ({
    opacity:
      reducedMotion || timeline.gained === 0
        ? 0
        : clock.get() < timeline.duration - 220
          ? 0.35 + 0.15 * Math.sin(clock.get() / 100) + frame.get().pulse * 0.4
          : 0,
    transform: [{ scaleY: 1 + frame.get().pulse * 0.7 }],
  }));
  const head = useAnimatedStyle(() => ({
    left: `${frame.get().xp}%`,
    opacity:
      reducedMotion ||
      timeline.gained === 0 ||
      clock.get() < 380 ||
      clock.get() > timeline.duration - 220
        ? 0
        : 1,
    transform: [{ scale: 1 + frame.get().pulse * 0.8 }],
  }));
  const shine = useAnimatedStyle(() => ({
    opacity: reducedMotion || clock.get() > timeline.duration - 220 ? 0 : 0.65,
    transform: [
      {
        translateX:
          ((clock.get() / Math.max(1, timeline.duration)) * 1.5 - 0.25) *
          trackWidth.get(),
      },
      { skewX: "-20deg" },
    ],
  }));
  const badge = useAnimatedStyle(() => {
    const t = Math.max(0, Math.min(1, clock.get() / 1050));
    return {
      opacity:
        reducedMotion || timeline.gained === 0
          ? 0
          : Math.min(1, t * 7) * (1 - Math.pow(t, 3)),
      transform: [
        { translateY: -8 + t * 14 },
        { scale: 0.8 + Math.sin(t * Math.PI) * 0.28 },
      ],
    };
  });
  const levelPulse = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + frame.get().pulse * 0.1 }],
  }));
  const impact = useAnimatedStyle(() => {
    const end = timeline.segments[timeline.segments.length - 1]?.end ?? 0;
    const t = Math.max(0, Math.min(1, (clock.get() - end) / 440));
    return {
      left: `${frame.get().xp}%`,
      opacity: reducedMotion || timeline.gained === 0 || t === 0 ? 0 : 1 - t,
      transform: [{ scale: 0.3 + t * 1.5 }],
    };
  });
  const level = levelDisplay((display.level - 1) * 100);
  const leveledUp = display.level > Math.floor(timeline.before / 100) + 1;
  const evolved = level.mascot !== levelDisplay(timeline.before).mascot;

  return (
    <View style={styles.block}>
      <View style={styles.row}>
        <Animated.View style={[styles.level, levelPulse]}>
          <Icon name="star" size={14} color={Drill.xpText} />
          <DText size={12} weight="bold" color={Drill.xpText}>
            Lv.{display.level} {level.name}
          </DText>
        </Animated.View>
        <DText size={12} weight="bold" mono color={Drill.xpText}>
          {display.xp} / 100 XP
        </DText>
      </View>
      <View
        style={styles.stage}
        onLayout={(event) => {
          trackWidth.set(event.nativeEvent.layout.width);
        }}
      >
        <Animated.View
          aria-hidden
          style={[styles.glow, { pointerEvents: "none" }, glow]}
        />
        <View
          role="progressbar"
          aria-label="経験値"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={display.xp}
          style={styles.track}
        >
          <Animated.View style={[styles.fill, baseline]} />
          <Animated.View style={[styles.fill, styles.earned, earned]}>
            <View style={styles.highlight} />
            <Animated.View style={[styles.shine, shine]} />
          </Animated.View>
        </View>
        <Animated.View
          aria-hidden
          style={[styles.head, { pointerEvents: "none" }, head]}
        />
        <Animated.View
          aria-hidden
          style={[styles.impact, { pointerEvents: "none" }, impact]}
        />
        {!reducedMotion &&
          timeline.gained > 0 &&
          Array.from({ length: 8 }, (_, index) => (
            <XpSpark
              key={index}
              index={index}
              clock={clock}
              trackWidth={trackWidth}
              frame={frame}
            />
          ))}
        <Animated.View
          aria-hidden
          style={[styles.badge, { pointerEvents: "none" }, badge]}
        >
          <Icon name="star" size={13} color="#FFF8D8" />
          <DText size={14} weight="bold" mono color="#FFFFFF">
            +{timeline.gained} XP
          </DText>
        </Animated.View>
      </View>
      <View style={[styles.message, leveledUp && styles.levelUp]}>
        <Icon
          name={leveledUp ? "trophy" : "star"}
          size={18}
          color={Drill.xpText}
        />
        <DText size={13} weight="bold" color={Drill.xpText}>
          {evolved
            ? `進化！ ${level.name}になった！`
            : leveledUp
              ? `レベルアップ！ Lv.${display.level}になった！`
              : `あと${100 - display.xp} XPでLv.${display.level + 1}！`}
        </DText>
      </View>
    </View>
  );
}

function XpSpark({
  index,
  clock,
  trackWidth,
  frame,
}: {
  index: number;
  clock: SharedValue<number>;
  trackWidth: SharedValue<number>;
  frame: Readonly<SharedValue<ReturnType<typeof xpFrame>>>;
}) {
  const motion = useAnimatedStyle(() => {
    const t = Math.max(0, Math.min(1, (clock.get() - 130 - index * 105) / 650));
    const startX = trackWidth.get() * (0.12 + index * 0.105);
    const targetX = (trackWidth.get() * frame.get().xp) / 100;
    return {
      opacity: Math.min(1, t * 8) * (1 - Math.pow(t, 4)),
      transform: [
        { translateX: startX + (targetX - startX) * t * t - 5 },
        {
          translateY:
            (-26 - (index % 3) * 6) * (1 - t) - Math.sin(t * Math.PI) * 10,
        },
        { scale: 0.35 + Math.sin(t * Math.PI) * 0.85 },
        { rotate: `${index * 35 + t * 120}deg` },
      ],
    };
  });
  return (
    <Animated.View
      aria-hidden
      style={[styles.spark, { pointerEvents: "none" }, motion]}
    >
      <Icon
        name="star"
        size={index % 2 ? 10 : 13}
        color={index % 2 ? "#F39824" : "#FFC83D"}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Drill.divider,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  level: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Radius.pill,
    backgroundColor: Drill.xpSoft,
  },
  stage: { position: "relative", paddingTop: 18, paddingBottom: 3 },
  track: {
    height: 14,
    borderRadius: Radius.pill,
    backgroundColor: Drill.trackWarm,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EBD7B9",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: Radius.pill,
    backgroundColor: "#F5CF72",
    overflow: "hidden",
  },
  earned: {
    backgroundColor: "#FFAE19",
    borderLeftWidth: 1,
    borderLeftColor: "#FFF2AC",
  },
  highlight: {
    position: "absolute",
    top: 1,
    left: 1,
    right: 1,
    height: 4,
    borderRadius: Radius.pill,
    backgroundColor: "#FFE997",
  },
  shine: {
    position: "absolute",
    left: -24,
    top: -4,
    bottom: -4,
    width: 22,
    backgroundColor: "#FFFFFF",
  },
  glow: {
    position: "absolute",
    left: -4,
    right: -4,
    top: 15,
    bottom: -3,
    borderRadius: Radius.pill,
    backgroundColor: "#FFE38A",
    boxShadow: "0 0 16px rgba(255,186,37,0.6)",
  },
  head: {
    position: "absolute",
    top: 15,
    width: 9,
    height: 20,
    marginLeft: -5,
    borderRadius: Radius.pill,
    backgroundColor: "#FFF6C6",
    boxShadow: "0 0 12px 3px rgba(255,177,25,0.85)",
  },
  badge: {
    position: "absolute",
    right: 8,
    top: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    backgroundColor: "#D98708",
    boxShadow: "0 3px 12px rgba(201,123,0,0.22)",
  },
  spark: { position: "absolute", top: 19, left: 0 },
  impact: {
    position: "absolute",
    top: 12,
    width: 26,
    height: 26,
    marginLeft: -13,
    borderRadius: Radius.pill,
    borderWidth: 2,
    borderColor: "#FFC83D",
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Drill.xpSoft,
  },
  levelUp: {
    backgroundColor: "#FFF0AF",
    borderWidth: 1,
    borderColor: "#FFD66C",
  },
});
