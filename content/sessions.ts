import { images, type SiteImage } from "./images";

// Weekly indoor sessions for the Social Membership (shown inside its slide on What We Offer).

export type Session = {
  day: string;
  time: string;
  venue: string;
  area?: string;
  // Used for the "Map" link. Leave empty ("") to hide the link.
  mapQuery: string;
};

export const socialSessions: Session[] = [
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
  // One short line shown under the photo.
  description: string;
  // The little picture on its button: "sun", "ship", "trophy", "beer" or "mic".
  icon: "sun" | "ship" | "trophy" | "beer" | "mic";
  images: SiteImage[];
};

export const socialEvents: SocialEvent[] = [
  {
    name: "Beach volleyball trip to Portugal",
    description: "Sun, sand and a lot of beach volleyball.",
    icon: "sun",
    images: [images.beachTrip],
  },
  {
    name: "The annual Boat Ball",
    description: "Our big night of the year: dressed up, on the water.",
    icon: "ship",
    images: [images.boatBall],
  },
  {
    name: "Tournaments",
    description: "Mixed teams and friendly competition, whatever your level.",
    icon: "trophy",
    images: [images.tournament],
  },
  {
    name: "Pub crawls",
    description: "A night out across London with the whole club.",
    icon: "beer",
    images: [images.pubCrawl],
  },
  {
    name: "Karaoke nights",
    description: "Mic in hand. No singing talent required.",
    icon: "mic",
    images: [images.karaoke],
  },
];
