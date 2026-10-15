import { Field } from "./form";
import { Drill } from "@/constants/drill";

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
      <select
        aria-label="通知する時刻"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.currentTarget.value)}
        style={{
          boxSizing: "border-box",
          width: "100%",
          minHeight: 48,
          padding: "0 14px",
          borderRadius: 12,
          border: `1px solid ${Drill.borderStrong}`,
          background: Drill.surface,
          color: Drill.text,
          font: "inherit",
          fontSize: 16,
          opacity: disabled ? 0.55 : 1,
        }}
      >
        {Array.from({ length: 24 }, (_, hour) => {
          const time = `${String(hour).padStart(2, "0")}:00`;
          return <option key={time} value={time}>{time}</option>;
        })}
      </select>
    </Field>
  );
}
