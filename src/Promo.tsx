import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Background } from "./components/Background";
import { CtaScene } from "./scenes/CtaScene";
import { IntroScene } from "./scenes/IntroScene";
import { PillarsScene } from "./scenes/PillarsScene";
import { TaglineScene } from "./scenes/TaglineScene";
import { PromoProps } from "./schema";

export const SCENES = { intro: 110, tagline: 100, pillars: 140, cta: 120 };
export const TRANSITION = 20;
export const PROMO_DURATION =
  Object.values(SCENES).reduce((a, b) => a + b, 0) - TRANSITION * (Object.keys(SCENES).length - 1);

export const Promo: React.FC<PromoProps> = (props) => {
  const timing = springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION });

  return (
    <AbsoluteFill>
      <Background />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.intro}>
          <IntroScene title={props.title} subtitle={props.subtitle} accentColor={props.accentColor} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.tagline}>
          <TaglineScene tagline={props.tagline} accentColor={props.accentColor} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom-left" })} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={SCENES.pillars}>
          <PillarsScene pillars={props.pillars} accentColor={props.accentColor} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION })} />
        <TransitionSeries.Sequence durationInFrames={SCENES.cta}>
          <CtaScene cta={props.cta} url={props.url} title={props.title} accentColor={props.accentColor} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
