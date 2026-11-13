// Upcoming events shown on the Upcoming Events page.
//
// HOW TO ADD AN EVENT: copy one of the blocks below (from { to },) and change the details.
// - date:     the day of the event as "YYYY-MM-DD", e.g. "2027-03-14"
// - time:     any text, e.g. "8pm", "10am–5pm", "8pm until late"
// - featured: true puts it in the "Next Big Event" box (the soonest featured one is shown)
// - image:    optional poster or photo, e.g. image: { src: "/images/boat-ball-poster.jpg", alt: "...", label: "" }
//             (save the file in public/images). Without one, a purple date graphic is shown.
// - page:     optional link to the event's own page, e.g. "/events/halloween"
// - look:     optional themed design for its card in Past Events (currently only "halloween")
//
// The day after its date, an event moves from Upcoming Events to the Past Events archive
// further down the same page. Delete it from this list to remove it from the archive too.

import type { SiteImage } from "./images";

export type ClubEvent = {
  date: string;
  time: string;
  title: string;
  location: string;
  description: string;
  featured?: boolean;
  image?: SiteImage;
  page?: string;
  look?: "halloween";
  // Shows an "Example" tag on the site. Remove the line for real events.
  example?: boolean;
};

export const events: ClubEvent[] = [
  {
    // TODO: add the time and venue of the Halloween social.
    date: "2026-10-28",
    time: "[Time]",
    title: "Halloween Social",
    location: "[Venue]",
    description: "Costumes, spooky drinks and a costume competition.",
    page: "/events/halloween",
    look: "halloween",
  },
  {
    // TODO: add the venue.
    date: "2026-11-04",
    time: "8pm",
    title: "Lobsters and Mobsters",
    location: "[Venue]",
    description: "Sports night with UCL Dance Society. Theme: Lobsters vs Mobsters.",
    image: {
      src: "/images/lobsters-and-mobsters.jpg",
      alt: "Three club members in red lobster hats and claws at the Lobsters and Mobsters sports night",
      label: "Lobsters and Mobsters",
    },
  },

  // ---- EXAMPLE EVENTS: delete these three and add real ones. ----
  {
    date: "2026-11-12",
    time: "10:30pm until late",
    title: "Karaoke Night",
    location: "Venue shared in the WhatsApp group",
    description: "Straight after Thursday's session. No singing talent required, just enthusiasm.",
    example: true,
  },
  {
    date: "2026-12-05",
    time: "10am–5pm",
    title: "Winter Mixed Tournament",
    location: "Somers Town Leisure Centre",
    description:
      "Our end-of-term mixed tournament. Teams are drawn on the day, so come on your own or bring friends. All levels welcome.",
    featured: true,
    example: true,
  },
  {
    date: "2026-12-10",
    time: "8pm",
    title: "Christmas Pub Crawl",
    location: "Meet outside Somers Town Leisure Centre",
    description: "Festive jumpers strongly encouraged. Route announced in the WhatsApp group.",
    example: true,
  },
  // ---- END OF EXAMPLE EVENTS ----
];
