import { useState, type ComponentProps, type ReactNode } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

type PressFeedbackProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  role?: ComponentProps<typeof Pressable>['role'];
  'aria-label'?: string;
  'aria-checked'?: boolean;
  'aria-disabled'?: boolean;
};

/** Immediate, restrained press-in feedback shared by the main quiz controls. */
export function PressFeedback({ children, style, ...props }: PressFeedbackProps) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      {...props}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={StyleSheet.flatten([style, pressed && styles.pressed])}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.88, transform: [{ scale: 0.985 }] },
});
