import { images } from "./images";

// The Halloween social page (/events/halloween).
// Text in [square brackets] shows on the site as a placeholder tag.

export const halloween = {
  year: 2026,
  intro: "Our Halloween social: the night the club swapped kit for costumes.",
  // TODO: a line or two about the night.
  recap: "[A line about the night: where we went, the best moments, who stole the show.]",

  // The photo slideshow, in order. Add the files to public/images (see content/images.ts).
  photos: [images.halloweenCostumes, images.halloweenParty, images.halloweenWinners, images.halloweenNight],
};
