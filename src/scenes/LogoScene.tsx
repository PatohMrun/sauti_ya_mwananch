import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

export const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1080;

  const pop = spring({ frame: frame - 6, fps, config: { damping: 11, mass: 0.8 } });
  const blur = interpolate(frame, [6, 24], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {[0, 15, 30].map((o) => {
        const t = ((frame + o) % 45) / 45;
        return (
          <div
            key={o}
            style={{
              position: "absolute",
              width: 520 * s,
              height: 520 * s,
              borderRadius: "50%",
              border: `${3 * s}px solid ${colors.maroon}`,
              transform: `scale(${interpolate(t, [0, 1], [0.7, 1.9])})`,
              opacity: interpolate(t, [0, 1], [0.35, 0]) * interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
            }}
          />
        );
      })}
      <Img
        src={staticFile("img/logo.png")}
        style={{
          width: 640 * s,
          transform: `scale(${pop}) rotate(${interpolate(pop, [0, 1], [-8, 0])}deg)`,
          filter: `blur(${blur}px)`,
          opacity: Math.min(1, pop * 1.5),
        }}
      />
    </AbsoluteFill>
  );
};
