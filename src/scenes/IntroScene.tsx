import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SoundWave } from "../components/SoundWave";
import { colors, fontFamily } from "../theme";

type Props = { title: string; subtitle: string; accentColor: string };

export const IntroScene: React.FC<Props> = ({ title, subtitle, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1080;
  const words = title.split(" ");

  const subtitleIn = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  const lineWidth = interpolate(frame, [32, 55], [0, 260 * s], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", fontFamily, gap: 40 * s }}>
      <SoundWave
        height={180 * s}
        barWidth={14 * s}
        gap={10 * s}
        colors={[colors.green, accentColor, colors.red, colors.white]}
      />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: `0 ${28 * s}px`, padding: `0 ${60 * s}px` }}>
        {words.map((word, i) => {
          const p = spring({ frame: frame - 12 - i * 6, fps, config: { damping: 14, mass: 0.6 } });
          return (
            <span
              key={i}
              style={{
                fontSize: 130 * s,
                fontWeight: 800,
                color: i === words.length - 1 ? accentColor : colors.white,
                display: "inline-block",
                transform: `translateY(${interpolate(p, [0, 1], [60 * s, 0])}px)`,
                opacity: p,
                letterSpacing: -2 * s,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
      <div style={{ height: 6 * s, width: lineWidth, borderRadius: 3 * s, background: accentColor }} />
      <div
        style={{
          fontSize: 44 * s,
          fontWeight: 400,
          color: colors.muted,
          letterSpacing: 8 * s,
          textTransform: "uppercase",
          opacity: subtitleIn,
          transform: `translateY(${interpolate(subtitleIn, [0, 1], [20 * s, 0])}px)`,
          textAlign: "center",
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
