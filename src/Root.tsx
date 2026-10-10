import { Composition } from "remotion";
import { AD_DURATION, Ad } from "./Ad";
import { adSchema, defaultAdProps } from "./schema";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="MazingiraAd"
    component={Ad}
    durationInFrames={AD_DURATION}
    fps={30}
    width={1080}
    height={1920}
    schema={adSchema}
    defaultProps={defaultAdProps}
  />
);
