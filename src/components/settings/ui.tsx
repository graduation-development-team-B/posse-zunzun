import { router, type Href } from "expo-router";
import type { ReactNode } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  View,
} from "react-native";
import { CtaButton } from "@/components/drill/buttons";
import { Icon, type IconName } from "@/components/drill/icons";
import { Body, DText, Screen } from "@/components/drill/ui";
import { Drill, Radius } from "@/constants/drill";

export function SettingsPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Screen>
      <View style={s.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="設定に戻る"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/account")
          }
          style={s.back}
        >
          <Icon name="back" color={Drill.accentText} />
        </Pressable>
        <DText size={18} weight="bold" role="heading" aria-level={1}>
          {title}
        </DText>
      </View>
      <Body gap={20}>
        {Boolean(description) && (
          <DText color={Drill.textSub} lh={1.7}>
            {description}
          </DText>
        )}
        {children}
      </Body>
    </Screen>
  );
}

export function SettingsGroup({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <View style={s.group}>
      {Boolean(title) && (
        <DText
          weight="bold"
          size={13}
          color={Drill.textSub}
          role="heading"
          aria-level={2}
        >
          {title}
        </DText>
      )}
      <View style={s.card}>{children}</View>
    </View>
  );
}

export function SettingsLink({
  label,
  value,
  icon,
  href,
  first = false,
}: {
  label: string;
  value: string;
  icon: IconName;
  href: Href;
  first?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}、${value}`}
      onPress={() => router.push(href)}
      style={({ pressed }) => [s.row, !first && s.border, pressed && s.pressed]}
    >
      <View style={s.icon}>
        <Icon name={icon} size={20} color={Drill.accentText} />
      </View>
      <View style={s.copy}>
        <DText weight="bold">{label}</DText>
        <DText size={12} color={Drill.textSub} numberOfLines={1}>
          {value}
        </DText>
      </View>
      <Icon name="chevronRight" size={18} color={Drill.textFaint} />
    </Pressable>
  );
}

export function SettingsToggle({
  label,
  description,
  value,
  disabled,
  onChange,
  first = false,
}: {
  label: string;
  description: string;
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  first?: boolean;
}) {
  return (
    <View style={[s.row, !first && s.border]}>
      <View style={s.copy}>
        <DText weight="bold">{label}</DText>
        <DText size={12} color={Drill.textSub}>
          {description}
        </DText>
      </View>
      <Switch
        accessibilityLabel={label}
        value={value}
        disabled={disabled}
        onValueChange={onChange}
        trackColor={{ false: Drill.border, true: Drill.accent }}
        thumbColor={Drill.surface}
        {...(Platform.OS === "web" ? { activeThumbColor: Drill.surface } : {})}
      />
    </View>
  );
}

export function StatusMessage({
  error,
  notice,
}: {
  error?: string;
  notice?: string;
}) {
  if (error)
    return (
      <DText role="alert" color={Drill.danger} lh={1.6}>
        {error}
      </DText>
    );
  if (notice)
    return (
      <DText accessibilityLiveRegion="polite" color={Drill.success} lh={1.6}>
        {notice}
      </DText>
    );
  return null;
}

export function ConfirmDialog({
  visible,
  title,
  description,
  confirmLabel,
  busy,
  error,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  busy: boolean;
  error?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        if (!busy) onCancel();
      }}
    >
      <View style={s.overlay}>
        <View
          style={s.dialog}
          accessibilityViewIsModal
          role="dialog"
          aria-label={title}
        >
          <DText size={18} weight="bold" role="heading">
            {title}
          </DText>
          <DText color={Drill.textSub} lh={1.7}>
            {description}
          </DText>
          <StatusMessage error={error} />
          <CtaButton
            label={busy ? "処理しています…" : confirmLabel}
            disabled={busy}
            onPress={onConfirm}
          />
          <Pressable
            role="button"
            disabled={busy}
            onPress={onCancel}
            style={s.cancel}
          >
            <DText weight="bold" color={Drill.textSub}>
              キャンセル
            </DText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingRight: 20,
    gap: 4,
  },
  back: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  group: { gap: 10 },
  card: {
    backgroundColor: Drill.surface,
    borderRadius: Radius.lg,
    overflow: "hidden",
  },
  row: {
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  border: { borderTopWidth: 1, borderTopColor: Drill.divider },
  copy: { flex: 1, minWidth: 0, gap: 3 },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Drill.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { backgroundColor: Drill.accentSoft },
  form: { gap: 18 },
  cancel: { minHeight: 48, alignItems: "center", justifyContent: "center" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(28,31,38,0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  dialog: {
    backgroundColor: Drill.surface,
    padding: 24,
    borderRadius: Radius.xl,
    gap: 16,
    maxWidth: 400,
    width: "100%",
  },
});
