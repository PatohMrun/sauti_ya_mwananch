import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const promoSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  tagline: z.string(),
  pillars: z
    .array(z.object({ heading: z.string(), body: z.string() }))
    .length(3),
  cta: z.string(),
  url: z.string(),
  accentColor: zColor(),
});

export type PromoProps = z.infer<typeof promoSchema>;

export const defaultPromoProps: PromoProps = {
  title: "Sauti ya Mwananchi",
  subtitle: "The Voice of the Citizen",
  tagline: "Your voice. Your community. Your future.",
  pillars: [
    { heading: "Speak Up", body: "Share the issues that matter to you" },
    { heading: "Be Heard", body: "Reach leaders and decision makers" },
    { heading: "Drive Change", body: "Track action in your community" },
  ],
  cta: "Join the conversation",
  url: "sautiyamwananchi.org",
  accentColor: "#F5B82E",
};
