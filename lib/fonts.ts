import { Anton, Jost } from "next/font/google";

// Single loading point for fonts. Type locked Oct 22, 2026: pairing A
// (Anton display + Jost body/labels). Each `variable` is applied to <html>
// in app/layout.tsx.

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const fontVariables = `${anton.variable} ${jost.variable}`;
