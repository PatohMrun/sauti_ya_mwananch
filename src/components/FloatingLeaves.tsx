import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { Leaf } from "./Leaf";

// Leaves drifting upward across the whole ad.
export const FloatingLeaves: React.FC<{ count?: number }> = ({ count = 14 }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const s = width / 1080;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const speed = 0.6 + random(`speed-${i}`) * 0.9;
        const size = (26 + random(`size-${i}`) * 40) * s;
        const startX = random(`x-${i}`) * width;
        const offset = random(`off-${i}`) * (height + 200);
        const y = height + 100 - ((frame * speed * 3 + offset) % (height + 200));
        const x = startX + Math.sin(frame / 40 + i) * 60 * s;
        const rot = frame * (random(`rot-${i}`) - 0.5) * 3 + i * 40;
        const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
        const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
        return (
          <Leaf
            key={i}
            size={size}
            color={i % 3 === 0 ? colors.green : colors.leaf}
            rotate={rot}
            style={{ position: "absolute", left: x, top: y, opacity: 0.35 * fadeIn * fadeOut }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
