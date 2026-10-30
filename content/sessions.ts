// Weekly indoor sessions shown on the What We Offer page.

export type Session = {
  day: string;
  time: string;
  venue: string;
  area?: string;
  // Used for the "Map" link. Leave as is unless the venue changes.
  mapQuery: string;
};

export const sessions: Session[] = [
  {
    day: "Tuesday",
    time: "8–10pm",
    venue: "Somers Town Leisure Centre",
    area: "Euston",
    mapQuery: "Somers Town Leisure Centre London",
  },
  {
    day: "Thursday",
    time: "8–10pm",
    venue: "Somers Town Leisure Centre",
    area: "Euston",
    mapQuery: "Somers Town Leisure Centre London",
  },
  {
    day: "Sunday",
    time: "6–8pm",
    venue: "In2Sport",
    area: "Canary Wharf",
    mapQuery: "In2Sport Canary Wharf London",
  },
];

// Socials and trips listed on the What We Offer page.
export const socialHighlights = [
  "Pub crawls",
  "Karaoke nights",
  "Tournaments",
  "The annual Boat Ball",
  "Beach volleyball trip to Portugal",
];
