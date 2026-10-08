import { useState, type ComponentProps, type CSSProperties, type ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Drill, Typo } from '@/constants/drill';
import { Icon } from './icons';
import { DText } from './ui';

/** ラベル付きの入力欄まわり */
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.field}>
      <DText size={13} weight="bold">
        {label}
      </DText>
      {children}
    </View>
  );
}

type TextFieldProps = Pick<
  ComponentProps<typeof TextInput>,
  | 'value'
  | 'onChangeText'
  | 'placeholder'
  | 'inputMode'
  | 'autoComplete'
  | 'secureTextEntry'
  | 'autoCapitalize'
  | 'autoCorrect'
> & { label: string };

export function TextField({ label, ...input }: TextFieldProps) {
  return (
    <Field label={label}>
      <TextInput
        aria-label={label}
        placeholderTextColor={Drill.textFaint}
        style={styles.input}
        {...input}
      />
    </Field>
  );
}

type PasswordFieldProps = Pick<ComponentProps<typeof TextInput>, 'value' | 'onChangeText' | 'autoComplete'> & { label: string };

/** 表示／非表示を切り替えられるパスワード欄 */
export function PasswordField({ label, value, onChangeText, autoComplete = 'new-password' }: PasswordFieldProps) {
  const [shown, setShown] = useState(false);
  return (
    <Field label={label}>
      <View style={styles.passwordWrap}>
        <TextInput
          aria-label={label}
          value={value}
          onChangeText={onChangeText}
          placeholder="8文字以上"
          placeholderTextColor={Drill.textFaint}
          autoComplete={autoComplete}
          secureTextEntry={!shown}
          style={styles.passwordInput}
        />
        <Pressable
          role="button"
          aria-label={shown ? 'パスワードを隠す' : 'パスワードを表示'}
          onPress={() => setShown(!shown)}
          style={styles.eye}>
          <Icon name="eye" size={20} color={shown ? Drill.text : Drill.textSub} />
        </Pressable>
      </View>
    </Field>
  );
}

type SelectFieldProps = {
  label: string;
  value: string | null;
  options: string[];
  onChange: (value: string) => void;
  webNativeSelect?: boolean;
};

/** タップで候補が開くセレクト欄 */
export function SelectField({ label, value, options, onChange, webNativeSelect = false }: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  if (Platform.OS === 'web' && webNativeSelect) {
    return (
      <Field label={label}>
        <select
          aria-label={label}
          value={value ?? ''}
          onChange={(event) => onChange(event.currentTarget.value)}
          style={webSelectStyle}>
          <option value="" disabled>
            選択してください
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
    );
  }

  return (
    <Field label={label}>
      <Pressable
        role="combobox"
        aria-label={label}
        aria-expanded={open}
        onPress={() => setOpen(!open)}
        style={styles.select}>
        <DText size={14} color={value ? Drill.text : Drill.textFaint} style={styles.selectText} numberOfLines={1}>
          {value ?? '選択してください'}
        </DText>
        <View style={{ transform: [{ rotate: open ? '-90deg' : '90deg' }] }}>
          <Icon name="chevronRight" size={16} color={Drill.textSub} />
        </View>
      </Pressable>
      {open && (
        <View role="radiogroup" aria-label={label} style={styles.options}>
          {options.map((option) => (
            <Pressable
              key={option}
              role="radio"
              aria-checked={option === value}
              onPress={() => {
                onChange(option);
                setOpen(false);
              }}
              style={styles.option}>
              <DText size={15} weight={option === value ? 'bold' : 'regular'}>
                {option}
              </DText>
            </Pressable>
          ))}
        </View>
      )}
    </Field>
  );
}

const styles = StyleSheet.create({
  field: { gap: 6 },
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
  passwordWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Drill.borderStrong,
    backgroundColor: Drill.surface,
  },
  passwordInput: {
    flex: 1,
    minWidth: 0,
    minHeight: 46,
    paddingHorizontal: 14,
    ...Typo.regular,
    fontSize: 16,
    color: Drill.text,
  },
  eye: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 48,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Drill.borderStrong,
    backgroundColor: Drill.surface,
  },
  selectText: { flex: 1 },
  options: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Drill.borderStrong,
    backgroundColor: Drill.surface,
    overflow: 'hidden',
  },
  option: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 12 },
});

const webSelectStyle: CSSProperties = {
  width: '100%',
  minHeight: 48,
  padding: '0 12px',
  borderRadius: 12,
  border: `1px solid ${Drill.borderStrong}`,
  backgroundColor: Drill.surface,
  color: Drill.text,
  fontSize: 16,
  fontFamily: 'inherit',
  appearance: 'auto',
};
