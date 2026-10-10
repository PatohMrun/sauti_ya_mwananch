import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fontFamily } from "../theme";

type Props = { tagline: string; accentColor: string };

// Each sentence of the tagline slides in on its own line.
export const TaglineScene: React.FC<Props> = ({ tagline, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1080;
  const lines = tagline.split(/(?<=\.)\s+/);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", fontFamily, padding: 80 * s }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 * s }}>
        {lines.map((line, i) => {
          const p = spring({ frame: frame - i * 14, fps, config: { damping: 18 } });
          const [first, ...rest] = line.split(" ");
          return (
            <div
              key={i}
              style={{
                fontSize: 110 * s,
                fontWeight: 800,
                color: colors.white,
                opacity: p,
                transform: `translateX(${interpolate(p, [0, 1], [-120 * s, 0])}px)`,
                lineHeight: 1.1,
              }}
            >
              <span style={{ color: [accentColor, colors.green, colors.red][i % 3] }}>{first}</span>{" "}
              {rest.join(" ")}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
