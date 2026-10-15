import { StyleSheet, TextInput } from "react-native";

import { Drill, Typo } from "@/constants/drill";
import { Field } from "./form";

export function ReminderTimeInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <Field label="通知する時刻">
      <TextInput
        accessibilityLabel="通知する時刻"
        value={value}
        onChangeText={onChange}
        placeholder="20:00"
        editable={!disabled}
        style={styles.input}
      />
    </Field>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 48,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Drill.borderStrong,
    backgroundColor: Drill.surface,
    ...Typo.regular,
    fontSize: 16,
    color: Drill.text,
  },
});
