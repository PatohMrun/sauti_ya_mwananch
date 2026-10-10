import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { PhoneIcon, WhatsAppIcon } from "../components/Icons";
import { colors, fontFamily } from "../theme";

type Props = { signOff: string; company: string; ctaLabel: string; phone: string };

export const OutroScene: React.FC<Props> = ({ signOff, company, ctaLabel, phone }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1080;

  const logoIn = spring({ frame, fps, config: { damping: 200 } });
  const textIn = spring({ frame: frame - 10, fps, config: { damping: 16 } });
  const companyIn = spring({ frame: frame - 20, fps, config: { damping: 12 } });
  const btnIn = spring({ frame: frame - 34, fps, config: { damping: 10 } });
  const phoneIn = spring({ frame: frame - 44, fps, config: { damping: 200 } });
  const pulse = frame > 50 ? 1 + 0.04 * Math.sin((frame - 50) / 5) : 1;
  const ring = ((frame - 50) % 40) / 40;

  return (
    <AbsoluteFill style={{ fontFamily, alignItems: "center" }}>
      <Img
        src={staticFile("img/logo.png")}
        style={{ position: "absolute", top: 230 * s, width: 460 * s, opacity: logoIn, transform: `translateY(${interpolate(logoIn, [0, 1], [-60 * s, 0])}px)` }}
      />
      <div style={{ position: "absolute", top: 720 * s, width: "100%", textAlign: "center", padding: `0 ${80 * s}px` }}>
        <div
          style={{
            fontSize: 80 * s,
            fontWeight: 400,
            color: colors.green,
            opacity: textIn,
            transform: `translateY(${interpolate(textIn, [0, 1], [40 * s, 0])}px)`,
          }}
        >
          {signOff}
        </div>
        <div
          style={{
            fontSize: 112 * s,
            fontWeight: 800,
            color: colors.green,
            lineHeight: 1.1,
            marginTop: 10 * s,
            opacity: companyIn,
            transform: `scale(${interpolate(companyIn, [0, 1], [0.6, 1])})`,
          }}
        >
          {company}.
        </div>
      </div>
      <div style={{ position: "absolute", top: 1330 * s, display: "flex", flexDirection: "column", alignItems: "center", gap: 50 * s }}>
        <div style={{ position: "relative", transform: `scale(${btnIn * pulse})` }}>
          {frame > 50 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 100 * s,
                border: `${4 * s}px solid ${colors.green}`,
                transform: `scale(${interpolate(ring, [0, 1], [1, 1.35])})`,
                opacity: interpolate(ring, [0, 1], [0.6, 0]),
              }}
            />
          )}
          <div
            style={{
              background: colors.green,
              color: "#fff",
              fontSize: 76 * s,
              fontWeight: 800,
              padding: `${28 * s}px ${80 * s}px`,
              borderRadius: 100 * s,
              boxShadow: `0 ${20 * s}px ${50 * s}px rgba(29,94,42,0.35)`,
            }}
          >
            {ctaLabel}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18 * s,
            opacity: phoneIn,
            transform: `translateY(${interpolate(phoneIn, [0, 1], [30 * s, 0])}px)`,
          }}
        >
          <WhatsAppIcon size={72 * s} color={colors.ink} />
          <PhoneIcon size={72 * s} color={colors.ink} />
          <span style={{ fontSize: 70 * s, fontWeight: 600, color: colors.brown, marginLeft: 8 * s }}>{phone}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
