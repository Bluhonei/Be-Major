import { Anton, Archivo, Big_Shoulders, Jost, Manrope } from "next/font/google";

// Single loading point for every Google font. Each object's `variable`
// is applied to <html> in app/layout.tsx. While type is unlocked, all
// candidate faces load here so /type can compare them; once Brae picks a
// pairing, the unused faces get deleted from this file.

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

// Google merged "Big Shoulders Display" into the single "Big Shoulders"
// family; the display cut is the opsz axis at its maximum (72).
export const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  // next/font has no fallback metrics for this family yet.
  adjustFontFallback: false,
  variable: "--font-big-shoulders",
  display: "swap",
});

export const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const fontVariables = [anton, bigShoulders, jost, archivo, manrope]
  .map((f) => f.variable)
  .join(" ");
