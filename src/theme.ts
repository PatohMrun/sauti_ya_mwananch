import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontFamily = "Outfit";

// Fonts are bundled in public/fonts so renders work offline.
for (const weight of ["200", "400", "600", "800"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/outfit-latin-${weight}-normal.woff2`),
    weight,
  });
}

// Palette sampled from the Vaultline Mazingira Day flyer.
export const colors = {
  cream: "#FAF8F3",
  green: "#1D5E2A",
  leaf: "#4E9A2F",
  brown: "#5B2F1D",
  maroon: "#6A1B26",
  ink: "#3A2A22",
  line: "#E4E2DC",
};

export const cableColors = ["#7FA7D9", "#86C27C", "#F1D04E", "#E0574F", "#CFCFCF"];
