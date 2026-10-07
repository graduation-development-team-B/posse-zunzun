import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

/** 熱中くん。幅を指定すると、元画像の縦横比で高さが決まる */
const SOURCES = {
  default: { src: require('@/assets/images/nettyu/default.png'), ratio: 318 / 320 },
  happy: { src: require('@/assets/images/nettyu/happy.png'), ratio: 277 / 320 },
  cheer: { src: require('@/assets/images/nettyu/cheer.png'), ratio: 232 / 320 },
  sorry: { src: require('@/assets/images/nettyu/sorry.png'), ratio: 285 / 320 },
  lv2: { src: require('@/assets/images/nettyu/lv2.png'), ratio: 251 / 320 },
  lv2Glow: { src: require('@/assets/images/nettyu/lv2-glow.png'), ratio: 203 / 320 },
} as const;

export type MascotName = keyof typeof SOURCES;

type MascotProps = {
  name: MascotName;
  width: number;
  /** 読み上げ用の説明。装飾なら省略 */
  alt?: string;
  /** 未解放の進化段階用 */
  locked?: boolean;
  onPress?: () => void;
  pressLabel?: string;
};

export function Mascot({ name, width, alt, locked, onPress, pressLabel }: MascotProps) {
  const { src, ratio } = SOURCES[name];
  const image = (
    <View style={locked ? { filter: 'grayscale(1)', opacity: 0.35 } : undefined}>
      <Image
        source={src}
        alt={alt ?? ''}
        contentFit="contain"
        style={{ width, height: width / ratio }}
      />
    </View>
  );

  if (!onPress) return image;
  return (
    <Pressable role="button" aria-label={pressLabel} onPress={onPress}>
      {image}
    </Pressable>
  );
}
