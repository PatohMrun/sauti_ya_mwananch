import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

// Slowly drifting gradient blobs that sit behind every scene.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const t = frame / 30;
  const size = Math.max(width, height);

  const blob = (x: number, y: number, color: string, scale: number) => (
    <div
      style={{
        position: "absolute",
        left: x - (size * scale) / 2,
        top: y - (size * scale) / 2,
        width: size * scale,
        height: size * scale,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        opacity: 0.35,
      }}
    />
  );

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, overflow: "hidden" }}>
      {blob(width * (0.2 + 0.05 * Math.sin(t * 0.6)), height * (0.3 + 0.05 * Math.cos(t * 0.5)), colors.green, 0.9)}
      {blob(width * (0.85 + 0.04 * Math.cos(t * 0.4)), height * (0.8 + 0.05 * Math.sin(t * 0.7)), colors.bgAlt, 1.1)}
      {blob(width * (0.75 + 0.05 * Math.sin(t * 0.3)), height * (0.15 + 0.04 * Math.cos(t * 0.6)), colors.red, 0.5)}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.white}14 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};
