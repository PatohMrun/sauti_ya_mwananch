import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

// Cream canvas with slowly drifting contour lines, echoing the flyer's pattern.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const lines = 16;
  const step = height / lines;

  const path = (i: number) => {
    const baseY = i * step + step / 2;
    const phase = frame / 70 + i * 0.7;
    const amp = 40 + 25 * Math.sin(i * 1.3);
    let d = `M -50 ${baseY}`;
    for (let x = -50; x <= width + 50; x += 30) {
      const y = baseY + amp * Math.sin(x / 210 + phase) + 18 * Math.cos(x / 95 - phase * 1.4);
      d += ` L ${x} ${y.toFixed(1)}`;
    }
    return d;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: colors.cream }}>
      <svg width={width} height={height} style={{ position: "absolute" }}>
        {Array.from({ length: lines }).map((_, i) => (
          <path key={i} d={path(i)} fill="none" stroke={colors.line} strokeWidth={22} strokeLinecap="round" opacity={0.55} />
        ))}
      </svg>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 55%, rgba(78,154,47,0.10) 0%, transparent 55%)`,
        }}
      />
    </AbsoluteFill>
  );
};
