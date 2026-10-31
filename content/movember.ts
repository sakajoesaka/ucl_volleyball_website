// The Movember fundraiser page (/events/movember).
// Text in [square brackets] shows on the site as a placeholder tag.

export const movember = {
  year: 2026,
  // Show the Movember banner at the top of the Upcoming Events page. Set to false once it's over.
  showOnEventsPage: true,
  intro: "Every November, UCL Volleyball swaps kneepads for moustaches to raise money for men's health.",
  // TODO: say what the club is doing this year.
  plans: "[What we're doing this year, e.g. growing moustaches, a charity match or a sponsored challenge.]",

  // Fundraising progress in pounds. Update these as donations come in.
  // TODO: replace the placeholder figures with the real goal and total.
  goal: 1000,
  raised: 350,
  // Set to false once the figures above are real, to remove the "placeholder" note.
  figuresArePlaceholders: true,

  // TODO: replace with the club's own Movember team page once it's set up.
  donateUrl: "https://movember.com",
  movemberUrl: "https://movember.com",
};
