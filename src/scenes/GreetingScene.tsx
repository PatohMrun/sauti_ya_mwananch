import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Leaf } from "../components/Leaf";
import { colors, fontFamily } from "../theme";

type Props = { top: string; main: string; day: string; year: number };

// Reveals text by sliding it up from behind a clipping mask.
const MaskReveal: React.FC<{ progress: number; children: React.ReactNode }> = ({ progress, children }) => (
  <div style={{ overflow: "hidden" }}>
    <div style={{ transform: `translateY(${interpolate(progress, [0, 1], [110, 0])}%)` }}>{children}</div>
  </div>
);

export const GreetingScene: React.FC<Props> = ({ top, main, day, year }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1080;

  const happy = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const mainIn = spring({ frame: frame - 14, fps, config: { damping: 15 } });
  const dayIn = spring({ frame: frame - 26, fps, config: { damping: 15 } });
  const count = Math.round(interpolate(frame, [30, 62], [year - 26, year], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const leafPop = spring({ frame: frame - 55, fps, config: { damping: 9 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 90 * s, fontFamily }}>
      <div
        style={{
          fontSize: 230 * s,
          fontWeight: 200,
          color: colors.brown,
          lineHeight: 1,
          letterSpacing: interpolate(happy, [0, 1], [60, -4]) * s,
          opacity: happy,
        }}
      >
        {top}
      </div>
      <MaskReveal progress={mainIn}>
        <div style={{ fontSize: 200 * s, fontWeight: 800, color: colors.green, lineHeight: 1.05 }}>{main}</div>
      </MaskReveal>
      <MaskReveal progress={dayIn}>
        <div style={{ fontSize: 200 * s, fontWeight: 800, lineHeight: 1.05, display: "flex", gap: 36 * s, alignItems: "center" }}>
          <span style={{ color: colors.green }}>{day}</span>
          <span style={{ color: colors.brown, fontVariantNumeric: "tabular-nums" }}>{count}</span>
          <Leaf size={110 * s} color={colors.leaf} rotate={35} style={{ transform: `scale(${leafPop}) rotate(35deg)` }} />
        </div>
      </MaskReveal>
      <div
        style={{
          marginTop: 40 * s,
          height: 10 * s,
          borderRadius: 5 * s,
          width: interpolate(frame, [40, 75], [0, 420], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * s,
          background: `linear-gradient(90deg, ${colors.green}, ${colors.leaf})`,
        }}
      />
    </AbsoluteFill>
  );
};
