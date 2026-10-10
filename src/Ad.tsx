import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Background } from "./components/Background";
import { FloatingLeaves } from "./components/FloatingLeaves";
import { DateScene } from "./scenes/DateScene";
import { GreetingScene } from "./scenes/GreetingScene";
import { LogoScene } from "./scenes/LogoScene";
import { MessageScene } from "./scenes/MessageScene";
import { OutroScene } from "./scenes/OutroScene";
import { AdProps } from "./schema";

// Scene lengths in frames (30 fps).
export const SCENES = { logo: 75, greeting: 115, message: 140, date: 100, outro: 150 };
export const TRANSITION = 16;
export const AD_DURATION =
  Object.values(SCENES).reduce((a, b) => a + b, 0) - TRANSITION * (Object.keys(SCENES).length - 1);

// Frame at which each scene starts, accounting for overlapping transitions.
const starts = (() => {
  const out: Record<keyof typeof SCENES, number> = { logo: 0, greeting: 0, message: 0, date: 0, outro: 0 };
  let t = 0;
  for (const key of Object.keys(SCENES) as (keyof typeof SCENES)[]) {
    out[key] = t;
    t += SCENES[key] - TRANSITION;
  }
  return out;
})();

const Sfx: React.FC<{ at: number; src: string; volume?: number }> = ({ at, src, volume = 1 }) => (
  <Sequence from={Math.max(0, at)} layout="none">
    <Audio src={staticFile(`audio/${src}`)} volume={volume} />
  </Sequence>
);

export const Ad: React.FC<AdProps> = (props) => {
  const timing = springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION });

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/music.wav")} volume={0.85} />
      <Sfx at={starts.logo + 4} src="pop.wav" volume={0.7} />
      {[starts.greeting, starts.message, starts.date, starts.outro].map((f) => (
        <Sfx key={f} at={f - 6} src="whoosh.wav" volume={0.45} />
      ))}
      <Sfx at={starts.date + 6} src="impact.wav" volume={0.8} />
      <Sfx at={starts.outro + 34} src="chime.wav" volume={0.6} />
      <Background />
      <FloatingLeaves />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.logo}>
          <LogoScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.greeting}>
          <GreetingScene top={props.greetingTop} main={props.greetingMain} day={props.greetingDay} year={props.year} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.message}>
          <MessageScene message={props.message} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.date}>
          <DateScene day={props.day} month={props.month} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.outro}>
          <OutroScene signOff={props.signOff} company={props.company} ctaLabel={props.ctaLabel} phone={props.phone} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
