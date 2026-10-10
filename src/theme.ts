import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontFamily = "Poppins";

// Fonts are bundled in public/fonts so renders work offline.
for (const weight of ["400", "600", "800"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/poppins-latin-${weight}-normal.woff2`),
    weight,
  });
}

export const colors = {
  bg: "#0B1F17",
  bgAlt: "#12392A",
  green: "#1FA864",
  amber: "#F5B82E",
  red: "#E2412F",
  white: "#F7F5EF",
  muted: "#A9C2B5",
};
