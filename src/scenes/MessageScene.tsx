import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fontFamily } from "../theme";

type Props = { message: string };

export const MessageScene: React.FC<Props> = ({ message }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1080;
  const words = message.split(" ");
  // Words that get the brand green emphasis.
  const highlight = new Set(["connectivity", "environment"]);

  const rise = spring({ frame, fps, config: { damping: 14, mass: 1.1 } });
  const bob = Math.sin(frame / 18) * 10 * s;
  const glow = 0.5 + 0.5 * Math.sin(frame / 15);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <div
        style={{
          position: "absolute",
          top: 250 * s,
          left: 90 * s,
          right: 90 * s,
          display: "flex",
          flexWrap: "wrap",
          gap: `${8 * s}px ${22 * s}px`,
        }}
      >
        {words.map((w, i) => {
          const p = spring({ frame: frame - 10 - i * 3, fps, config: { damping: 18 } });
          const clean = w.replace(/[^a-z]/gi, "").toLowerCase();
          return (
            <span
              key={i}
              style={{
                fontSize: 78 * s,
                fontWeight: highlight.has(clean) ? 800 : 400,
                color: highlight.has(clean) ? colors.green : colors.ink,
                opacity: p,
                transform: `translateY(${interpolate(p, [0, 1], [40 * s, 0])}px)`,
                display: "inline-block",
                lineHeight: 1.2,
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          left: 200 * s,
          bottom: 190 * s,
          width: 760 * s,
          height: 760 * s,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(78,154,47,${0.18 + 0.08 * glow}) 0%, transparent 65%)`,
          transform: `scale(${rise})`,
        }}
      />
      <Img
        src={staticFile("img/hand-plant.png")}
        style={{
          position: "absolute",
          right: -40 * s,
          bottom: 150 * s,
          width: 1000 * s,
          transform: `translateY(${interpolate(rise, [0, 1], [900 * s, 0]) + bob}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
