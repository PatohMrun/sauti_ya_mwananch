import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cableColors } from "../theme";

type Props = { delay?: number; y: number };

// Colourful network cables with RJ45 plugs sweeping in from the left.
export const Cables: React.FC<Props> = ({ delay = 0, y }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1080;
  const gap = 62 * s;

  return (
    <svg width={width} height={cableColors.length * gap + 120 * s} style={{ position: "absolute", left: 0, top: y, overflow: "visible" }}>
      {cableColors.map((color, i) => {
        const p = spring({ frame: frame - delay - i * 4, fps, config: { damping: 16, mass: 0.7 } });
        const tipX = interpolate(p, [0, 1], [-260 * s, (520 + i * 70) * s]);
        const cy = 40 * s + i * gap;
        const wave = 10 * s * Math.sin(frame / 12 + i);
        const plugW = 120 * s;
        const plugH = 46 * s;
        return (
          <g key={i}>
            <path
              d={`M ${-400 * s} ${cy + 60 * s} C ${tipX * 0.3} ${cy + 60 * s + wave}, ${tipX * 0.6} ${cy - wave}, ${tipX} ${cy}`}
              stroke={color}
              strokeWidth={28 * s}
              fill="none"
              strokeLinecap="round"
            />
            <g transform={`translate(${tipX}, ${cy - plugH / 2}) scale(1.4)`}>
              <rect x={-10 * s} y={4 * s} width={34 * s} height={plugH - 8 * s} rx={8 * s} fill={color} />
              <rect x={20 * s} y={0} width={plugW * 0.7} height={plugH} rx={6 * s} fill="rgba(255,255,255,0.85)" stroke="rgba(0,0,0,0.2)" strokeWidth={2 * s} />
              {[0, 1, 2, 3].map((k) => (
                <rect key={k} x={(32 + k * 14) * s} y={8 * s} width={7 * s} height={14 * s} rx={2 * s} fill="#C9A44C" />
              ))}
            </g>
          </g>
        );
      })}
    </svg>
  );
};
