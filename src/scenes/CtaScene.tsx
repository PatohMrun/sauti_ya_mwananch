import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SoundWave } from "../components/SoundWave";
import { colors, fontFamily } from "../theme";

type Props = { cta: string; url: string; title: string; accentColor: string };

export const CtaScene: React.FC<Props> = ({ cta, url, title, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1080;

  const pop = spring({ frame, fps, config: { damping: 12 } });
  const urlIn = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const rings = [0, 20, 40];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", fontFamily }}>
      {rings.map((offset) => {
        const t = ((frame + offset) % 60) / 60;
        return (
          <div
            key={offset}
            style={{
              position: "absolute",
              width: 400 * s,
              height: 400 * s,
              borderRadius: "50%",
              border: `${4 * s}px solid ${accentColor}`,
              transform: `scale(${interpolate(t, [0, 1], [0.6, 2.6])})`,
              opacity: interpolate(t, [0, 1], [0.5, 0]),
            }}
          />
        );
      })}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 * s, padding: 60 * s }}>
        <div
          style={{
            fontSize: 104 * s,
            fontWeight: 800,
            color: colors.white,
            transform: `scale(${pop})`,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          {cta}
        </div>
        <div
          style={{
            fontSize: 44 * s,
            fontWeight: 600,
            color: colors.bg,
            background: accentColor,
            padding: `${18 * s}px ${48 * s}px`,
            borderRadius: 100 * s,
            opacity: urlIn,
            transform: `translateY(${interpolate(urlIn, [0, 1], [30 * s, 0])}px)`,
          }}
        >
          {url}
        </div>
        <div style={{ marginTop: 30 * s, display: "flex", alignItems: "center", gap: 24 * s, opacity: urlIn }}>
          <SoundWave bars={7} height={56 * s} barWidth={8 * s} gap={6 * s} colors={[colors.green, accentColor, colors.red]} delay={20} />
          <span style={{ fontSize: 38 * s, fontWeight: 600, color: colors.muted }}>{title}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
