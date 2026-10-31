import { Creepster, Press_Start_2P } from "next/font/google";

// The pixel and spooky fonts again, but not preloaded. For pages where they're only small
// or further down (the Movember banner and Past Events cards on Upcoming Events), so they
// don't slow down the rest of the site, which prefetches that page in the background.
export const pixelFontLazy = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
export const spookyFontLazy = Creepster({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
