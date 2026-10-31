import { Press_Start_2P } from "next/font/google";

// Retro game font, for the themed event pages (Movember, Halloween) and their cards.
// Each decorative font has its own file, so a page only preloads the fonts it uses.
export const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"], display: "swap" });
