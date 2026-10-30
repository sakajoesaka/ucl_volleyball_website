// Upcoming events shown on the Upcoming Events page.
//
// HOW TO ADD AN EVENT: copy one of the blocks below (from { to },) and change the details.
// - date:     the day of the event as "YYYY-MM-DD", e.g. "2027-03-14"
// - time:     any text, e.g. "8pm", "10am–5pm", "8pm until late"
// - featured: true puts it in the "Next Big Event" box (the soonest featured one is shown)
//
// Events disappear from the site automatically the day after their date,
// so there's no need to delete old ones (but you can).

export type ClubEvent = {
  date: string;
  time: string;
  title: string;
  location: string;
  description: string;
  featured?: boolean;
  // Shows an "Example" tag on the site. Remove the line for real events.
  example?: boolean;
};

export const events: ClubEvent[] = [
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
