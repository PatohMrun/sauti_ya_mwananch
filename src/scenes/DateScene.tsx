import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Cables } from "../components/Cables";
import { colors, fontFamily } from "../theme";

type Props = { day: string; month: string };

export const DateScene: React.FC<Props> = ({ day, month }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1080;

  const slam = spring({ frame: frame - 4, fps, config: { damping: 9, mass: 0.9 } });
  const monthIn = spring({ frame: frame - 16, fps, config: { damping: 14 } });
  const shake = frame > 4 && frame < 16 ? Math.sin(frame * 3) * (16 - frame) * 1.2 * s : 0;

  return (
    <AbsoluteFill style={{ fontFamily, transform: `translateX(${shake}px)` }}>
      <div style={{ position: "absolute", top: 380 * s, width: "100%", textAlign: "center" }}>
        <div
          style={{
            fontSize: 560 * s,
            fontWeight: 800,
            color: colors.green,
            lineHeight: 0.9,
            transform: `scale(${interpolate(slam, [0, 1], [2.6, 1])})`,
            opacity: Math.min(1, slam * 2),
          }}
        >
          {day}
        </div>
        <div
          style={{
            fontSize: 250 * s,
            fontWeight: 600,
            color: colors.maroon,
            letterSpacing: interpolate(monthIn, [0, 1], [80, 10]) * s,
            opacity: monthIn,
            transform: `translateY(${interpolate(monthIn, [0, 1], [80 * s, 0])}px)`,
          }}
        >
          {month}
        </div>
      </div>
      <Cables delay={22} y={1300 * s} />
    </AbsoluteFill>
  );
};
