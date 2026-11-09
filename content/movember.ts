// The Movember fundraiser page (/events/movember).
// Text in [square brackets] shows on the site as a placeholder tag.

export const movember = {
  year: 2026,
  // Show the Movember banner at the top of the Upcoming Events page. Set to false once it's over.
  showOnEventsPage: true,
  intro: "Every November, UCL Volleyball swaps kneepads for moustaches to raise money for men's health.",
  plans: "A month of socials and collabs, with a new goal unlocked every time the total climbs.",

  // Fundraising progress in pounds. Update these as donations come in.
  // TODO: replace the placeholder total with the real one.
  goal: 1000,
  raised: 350,
  // Set to false once the figures above are real, to remove the "placeholder" note.
  figuresArePlaceholders: true,

  // TODO: replace with the club's own Movember team page once it's set up.
  donateUrl: "https://movember.com",
  movemberUrl: "https://movember.com",

  // What each fundraising total unlocks, lowest first.
  milestones: [
    { amount: 50, text: "Pick a costume for Cruz or Jane for our “Moustache Legends” social" },
    { amount: 100, text: "Chosen committee member does the ice bucket challenge" },
    { amount: 150, text: "Chosen committee member does a TikTok dance chosen by you guys" },
    { amount: 200, text: "Gru dyes his moustache" },
    { amount: 500, text: "You decide Henry De Lima's next haircut" },
    { amount: 1000, text: "Last social session of the year has no ticketing system" },
  ],

  // The November calendar. `day` is the date in November; `highlight: true` makes it stand out.
  calendar: [
    { day: 4, title: "Mobsters and Lobsters × Dance Soc" },
    { day: 18, title: "UCL Volleyball × Men's & Women's Basketball" },
    { day: 21, title: "Student Cup Qualifiers", highlight: true },
    { day: 25, title: "Moustache Legends + Movember at Scala", highlight: true },
    { day: 28, title: "Sponge the Committee" },
  ] as { day: number; title: string; highlight?: boolean }[],
  readingWeek: { start: 9, end: 15 },
};
