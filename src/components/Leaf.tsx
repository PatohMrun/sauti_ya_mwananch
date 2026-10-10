type Props = { size: number; color: string; rotate?: number; style?: React.CSSProperties };

export const Leaf: React.FC<Props> = ({ size, color, rotate = 0, style }) => (
  <svg width={size} height={size} viewBox="-24 -24 48 48" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M0,-22 C15,-12 15,12 0,22 C-15,12 -15,-12 0,-22 Z" fill={color} />
    <path d="M0,-18 L0,20" stroke="rgba(255,255,255,0.45)" strokeWidth={1.6} strokeLinecap="round" />
  </svg>
);
