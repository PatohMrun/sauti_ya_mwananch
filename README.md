# Sauti ya Mwananchi — Motion Graphic Video

A ~14 second promo video built with [Remotion](https://www.remotion.dev) (React → MP4).

## Scenes

| # | Scene | What happens |
|---|-------|--------------|
| 1 | Intro | Animated sound-wave bars, word-by-word title reveal, subtitle |
| 2 | Tagline | Each sentence of the tagline slides in, with colour-coded first words |
| 3 | Pillars | Three cards with icons spring up ("Speak Up / Be Heard / Drive Change") |
| 4 | Call to action | Pulsing rings, CTA headline, URL pill, logo lock-up |

Two compositions share the same scenes:

- `SautiPromo` — 1920×1080 (YouTube, presentations)
- `SautiPromoVertical` — 1080×1920 (Reels, TikTok, WhatsApp Status)

## Usage

```bash
npm install
npm run dev              # open Remotion Studio to preview and edit
npm run render           # out/sauti-promo.mp4
npm run render:vertical  # out/sauti-promo-vertical.mp4
npm run still            # out/thumbnail.png
```

## Customising

All text and the accent colour are props defined in `src/schema.ts`
(`defaultPromoProps`). You can edit them there, or live in the Studio's
props panel.

- Scene lengths: `SCENES` in `src/Promo.tsx` (in frames, 30 fps)
- Palette: `colors` in `src/theme.ts`
- Fonts: Poppins (OFL) is bundled in `public/fonts`, so renders work offline
