import Svg, { Circle, Path } from 'react-native-svg';

export type IconName =
  | 'back'
  | 'close'
  | 'user'
  | 'flame'
  | 'moon'
  | 'check'
  | 'arrowRight'
  | 'chevronRight'
  | 'refresh'
  | 'book'
  | 'trophy'
  | 'eye'
  | 'checkCircle'
  | 'crossCircle'
  | 'undo'
  | 'bulb'
  | 'star';

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const FLAME =
  'M12 2.5c1.2 3.4 5.5 6 5.5 11a5.5 5.5 0 0 1-11 0c0-2.2 1.1-3.9 2.2-5 .5 1.6 1.6 2.7 2.7 2.7-.5-3.3.6-6.4.6-8.7z';

/** デザインのインラインSVGをそのまま移植したアイコン集（24×24 viewBox） */
export function Icon({ name, size = 24, color = '#1C1F26', strokeWidth = 2 }: IconProps) {
  const stroke = {
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      {name === 'back' && <Path d="M15 6l-6 6 6 6" {...stroke} />}
      {name === 'close' && <Path d="M6 6l12 12M18 6L6 18" {...stroke} />}
      {name === 'user' && (
        <>
          <Circle cx={12} cy={8} r={4} {...stroke} />
          <Path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" {...stroke} />
        </>
      )}
      {name === 'flame' && <Path d={FLAME} fill={color} />}
      {name === 'moon' && <Path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" {...stroke} />}
      {name === 'check' && <Path d="M5 12.5l4.5 4.5L19 7.5" {...stroke} />}
      {name === 'arrowRight' && <Path d="M5 12h14M13 6l6 6-6 6" {...stroke} />}
      {name === 'chevronRight' && <Path d="M9 6l6 6-6 6" {...stroke} />}
      {name === 'refresh' && (
        <>
          <Path d="M3 12a9 9 0 1 0 3-6.7" {...stroke} />
          <Path d="M3 4v5h5" {...stroke} />
        </>
      )}
      {name === 'book' && (
        <>
          <Path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z" {...stroke} />
          <Path d="M4 19V5" {...stroke} />
        </>
      )}
      {name === 'trophy' && (
        <>
          <Path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" {...stroke} />
          <Path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" {...stroke} />
        </>
      )}
      {name === 'eye' && (
        <>
          <Path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" {...stroke} />
          <Circle cx={12} cy={12} r={3} {...stroke} />
        </>
      )}
      {name === 'checkCircle' && (
        <>
          <Circle cx={12} cy={12} r={10} {...stroke} />
          <Path d="M7.5 12.5l3 3 6-6.5" {...stroke} />
        </>
      )}
      {name === 'crossCircle' && (
        <>
          <Circle cx={12} cy={12} r={10} {...stroke} />
          <Path d="M9 9l6 6M15 9l-6 6" {...stroke} />
        </>
      )}
      {name === 'undo' && (
        <>
          <Path d="M9 14L4 9l5-5" {...stroke} />
          <Path d="M4 9h10a6 6 0 0 1 0 12h-3" {...stroke} />
        </>
      )}
      {name === 'bulb' && (
        <Path
          d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"
          {...stroke}
        />
      )}
      {name === 'star' && (
        <Path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" {...stroke} />
      )}
    </Svg>
  );
}
