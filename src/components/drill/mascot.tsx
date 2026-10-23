import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import { evolutionSprite, type EvolutionMascotName } from '@/lib/progress/evolution';
import { Drill } from '@/constants/drill';
import { DText } from './ui';

const EVOLUTION_ATLAS = require('@/assets/images/nettyu/evolution-atlas.png');

/** 熱中くん。幅を指定すると、元画像の縦横比で高さが決まる */
const SOURCES = {
  default: { src: require('@/assets/images/nettyu/default.png'), ratio: 318 / 320 },
  happy: { src: require('@/assets/images/nettyu/happy.png'), ratio: 277 / 320 },
  cheer: { src: require('@/assets/images/nettyu/cheer.png'), ratio: 232 / 320 },
  sorry: { src: require('@/assets/images/nettyu/sorry.png'), ratio: 285 / 320 },
  lv2: { src: require('@/assets/images/nettyu/lv2.png'), ratio: 251 / 320 },
  lv2Glow: { src: require('@/assets/images/nettyu/lv2-glow.png'), ratio: 203 / 320 },
} as const;

export type MascotName = keyof typeof SOURCES | EvolutionMascotName;

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
  if (name === 'legend' && locked) {
    return (
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel="レジェンド期の姿はLv.100で解放"
        style={{ width, height: width, borderRadius: width / 2, alignItems: 'center', justifyContent: 'center', backgroundColor: Drill.chip }}>
        <DText size={Math.round(width * 0.6)} weight="bold" color={Drill.textMuted}>？</DText>
      </View>
    );
  }
  const sprite = evolutionSprite(name);
  const legacy = sprite ? null : SOURCES[name as keyof typeof SOURCES];
  const image = (
    <View style={locked ? { filter: 'grayscale(1)', opacity: 0.35 } : undefined}>
      {sprite ? (
        <View style={{ width, height: width, overflow: 'hidden' }}>
          <Image
            source={EVOLUTION_ATLAS}
            cachePolicy="memory-disk"
            accessibilityLabel={alt ?? ''}
            accessible={Boolean(alt)}
            contentFit="fill"
            style={{
              position: 'absolute', width: width * 5, height: width * 2,
              left: -sprite.column * width, top: -sprite.row * width,
            }}
          />
        </View>
      ) : legacy && (
      <Image
        source={legacy.src}
        accessibilityLabel={alt ?? ''}
        accessible={Boolean(alt)}
        contentFit="contain"
        style={{ width, height: width / legacy.ratio }}
      />
      )}
    </View>
  );

  if (!onPress) return image;
  return (
    <Pressable role="button" aria-label={pressLabel} onPress={onPress}>
      {image}
    </Pressable>
  );
}
