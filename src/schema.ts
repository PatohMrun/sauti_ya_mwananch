import { z } from "zod";

export const adSchema = z.object({
  company: z.string(),
  greetingTop: z.string(),
  greetingMain: z.string(),
  greetingDay: z.string(),
  year: z.number().int(),
  message: z.string(),
  signOff: z.string(),
  day: z.string(),
  month: z.string(),
  ctaLabel: z.string(),
  phone: z.string(),
});

export type AdProps = z.infer<typeof adSchema>;

export const defaultAdProps: AdProps = {
  company: "Vaultline Solutions",
  greetingTop: "Happy",
  greetingMain: "Mazingira",
  greetingDay: "Day",
  year: 2026,
  message: "True connectivity means caring for the environment that sustains us.",
  signOff: "Happy Mazingira Day from",
  day: "10",
  month: "OCT",
  ctaLabel: "Reach Us",
  phone: "+254 745 838 420",
};
