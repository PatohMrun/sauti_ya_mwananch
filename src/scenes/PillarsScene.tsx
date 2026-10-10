import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ChangeIcon, EarIcon, MegaphoneIcon } from "../components/Icons";
import { PromoProps } from "../schema";
import { colors, fontFamily } from "../theme";

type Props = { pillars: PromoProps["pillars"]; accentColor: string };

const icons = [MegaphoneIcon, EarIcon, ChangeIcon];

export const PillarsScene: React.FC<Props> = ({ pillars, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1080;
  const vertical = height > width;
  const tints = [accentColor, colors.green, colors.red];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: vertical ? "center" : "stretch",
        alignContent: "center",
        flexDirection: vertical ? "column" : "row",
        gap: 48 * s,
        fontFamily,
        padding: vertical ? 80 * s : `${300 * s}px ${80 * s}px`,
      }}
    >
      {pillars.map((pillar, i) => {
        const p = spring({ frame: frame - i * 10, fps, config: { damping: 13, mass: 0.8 } });
        const iconPop = spring({ frame: frame - i * 10 - 10, fps, config: { damping: 8 } });
        const Icon = icons[i % icons.length];
        return (
          <div
            key={i}
            style={{
              width: vertical ? 820 * s : 500 * s,
              padding: 48 * s,
              borderRadius: 36 * s,
              background: "rgba(255,255,255,0.06)",
              border: `2px solid ${tints[i]}55`,
              boxShadow: `0 ${30 * s}px ${80 * s}px rgba(0,0,0,0.35)`,
              opacity: p,
              transform: `translateY(${interpolate(p, [0, 1], [140 * s, 0])}px) scale(${interpolate(p, [0, 1], [0.85, 1])})`,
              display: "flex",
              flexDirection: "column",
              gap: 20 * s,
            }}
          >
            <div
              style={{
                width: 120 * s,
                height: 120 * s,
                borderRadius: "50%",
                background: `${tints[i]}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${iconPop})`,
              }}
            >
              <Icon color={tints[i]} size={68 * s} />
            </div>
            <div style={{ fontSize: 54 * s, fontWeight: 800, color: colors.white, whiteSpace: "nowrap" }}>{pillar.heading}</div>
            <div style={{ fontSize: 34 * s, fontWeight: 400, color: colors.muted, lineHeight: 1.35 }}>{pillar.body}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
