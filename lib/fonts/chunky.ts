import { Bowlby_One } from "next/font/google";

// Chunky, playful display font for the Socials & Trips section.
// (A free stand-in for Rowdy Std, which is a paid font.) It's further down the page,
// so it isn't preloaded and doesn't hold up the text at the top.
export const chunkyFont = Bowlby_One({ weight: "400", subsets: ["latin"], display: "swap", preload: false });
