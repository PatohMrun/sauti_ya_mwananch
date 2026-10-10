import { Composition } from "remotion";
import { PROMO_DURATION, Promo } from "./Promo";
import { defaultPromoProps, promoSchema } from "./schema";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="SautiPromo"
      component={Promo}
      durationInFrames={PROMO_DURATION}
      fps={30}
      width={1920}
      height={1080}
      schema={promoSchema}
      defaultProps={defaultPromoProps}
    />
    <Composition
      id="SautiPromoVertical"
      component={Promo}
      durationInFrames={PROMO_DURATION}
      fps={30}
      width={1080}
      height={1920}
      schema={promoSchema}
      defaultProps={defaultPromoProps}
    />
  </>
);
