import { images, type SiteImage } from "./images";

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

// Socials and trips on the What We Offer page. Clicking one shows its photos.
// Add more photos to an event by adding more entries to its `images` list
// (define them in content/images.ts first).
export type SocialEvent = {
  name: string;
  images: SiteImage[];
};

export const socialEvents: SocialEvent[] = [
  { name: "Beach volleyball trip to Portugal", images: [images.beachTrip] },
  { name: "The annual Boat Ball", images: [images.boatBall] },
  { name: "Tournaments", images: [images.tournament] },
  { name: "Pub crawls", images: [images.pubCrawl] },
  { name: "Karaoke nights", images: [images.karaoke] },
];
