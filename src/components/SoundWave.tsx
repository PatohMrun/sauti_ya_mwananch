import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  bars?: number;
  height: number;
  barWidth: number;
  gap: number;
  colors: string[];
  delay?: number;
};

// Equaliser-style bars that grow in from the centre and keep pulsing.
export const SoundWave: React.FC<Props> = ({ bars = 21, height, barWidth, gap, colors, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mid = (bars - 1) / 2;

  return (
    <div style={{ display: "flex", alignItems: "center", gap, height }}>
      {Array.from({ length: bars }).map((_, i) => {
        const distance = Math.abs(i - mid);
        const grow = spring({ frame: frame - delay - distance * 2, fps, config: { damping: 12 } });
        const envelope = 1 - (distance / (mid + 1)) * 0.7;
        const pulse = 0.55 + 0.45 * Math.abs(Math.sin(frame / 6 + i * 0.9) * Math.cos(frame / 11 + i * 0.4));
        const h = Math.max(barWidth, height * envelope * pulse * grow);
        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: h,
              borderRadius: barWidth,
              backgroundColor: colors[i % colors.length],
              opacity: interpolate(grow, [0, 1], [0, 1]),
            }}
          />
        );
      })}
    </div>
  );
};
