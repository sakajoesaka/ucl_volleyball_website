// Every photo on the site, in one place.
//
// To add a real photo: save it into the /public/images folder using the file
// name shown in `src` below (e.g. public/images/beach-trip.jpg). That's it.
// Until the file exists, the site shows a grey placeholder box with the `label`.
//
// `alt` describes the photo for screen readers and search engines.
// Update it to match what is actually in your photo.

export type SiteImage = {
  src: string;
  alt: string;
  label: string;
};

export const images = {
  hero: {
    src: "/images/hero.jpg",
    alt: "A UCL player in purple leaps above the net to spike the ball past two blockers",
    label: "Hero: player jump-serving",
  },
  teamHuddle: {
    src: "/images/team-huddle.jpg",
    alt: "UCL players in purple kit huddle together between points",
    label: "Team huddle",
  },
  teamCelebration: {
    src: "/images/team-celebration.jpg",
    alt: "UCL players in purple and white kit hug in a circle on court",
    label: "Players celebrating together",
  },
  mensFirst: {
    src: "/images/mens-1st-team.jpg",
    alt: "The UCL men's 1st team in action",
    label: "Men's 1st team in action",
  },
  mensSecond: {
    src: "/images/mens-2nd-team.jpg",
    alt: "The UCL men's 2nd team on court",
    label: "Men's 2nd team on court",
  },
  womensFirst: {
    src: "/images/womens-1st-trophy.jpg",
    alt: "The UCL women's 1st team holding their trophy",
    label: "Women's 1st team with trophy",
  },
  womensSecond: {
    src: "/images/womens-2nd-team.jpg",
    alt: "The UCL women's 2nd team after a match",
    label: "Women's 2nd team after a match",
  },
  mixedTeam: {
    src: "/images/mixed-team.jpg",
    alt: "The UCL mixed team posing together on court in purple and pale blue kit",
    label: "Mixed team photo",
  },
  beachTrip: {
    src: "/images/beach-trip.jpg",
    alt: "UCL Volleyball members on the beach trip to Portugal",
    label: "Beach trip group photo",
  },
  socialNight: {
    src: "/images/social-night.jpg",
    alt: "UCL Volleyball members on a social night out",
    label: "Social night out",
  },
  pubCrawl: {
    src: "/images/pub-crawl.jpg",
    alt: "UCL Volleyball members on a pub crawl",
    label: "Pub crawl photo",
  },
  karaoke: {
    src: "/images/karaoke-night.jpg",
    alt: "UCL Volleyball members singing at a karaoke night",
    label: "Karaoke night photo",
  },
  tournament: {
    src: "/images/tournament.jpg",
    alt: "UCL Volleyball members playing in a club tournament",
    label: "Tournament photo",
  },
  boatBall: {
    src: "/images/boat-ball.jpg",
    alt: "UCL Volleyball members dressed up at the annual Boat Ball",
    label: "Boat Ball photo",
  },
  // Halloween social photos (the slideshow on the Halloween page)
  halloweenCostumes: {
    src: "/images/halloween-costumes.jpg",
    alt: "UCL Volleyball members in Halloween costumes",
    label: "Halloween: costumes group photo",
  },
  halloweenParty: {
    src: "/images/halloween-party.jpg",
    alt: "UCL Volleyball members at the Halloween social",
    label: "Halloween: the party",
  },
  halloweenWinners: {
    src: "/images/halloween-winners.jpg",
    alt: "The costume competition winners at the Halloween social",
    label: "Halloween: costume winners",
  },
  halloweenNight: {
    src: "/images/halloween-night.jpg",
    alt: "UCL Volleyball members out on Halloween night",
    label: "Halloween: later in the night",
  },
  logo: {
    src: "/images/logo.png",
    alt: "UCL Volleyball Society logo",
    label: "Logo",
  },
} satisfies Record<string, SiteImage>;

// The "Life at the Club" slideshow on the Home page, in order.
// Add, remove or reorder photos here.
export const lifeAtTheClub: SiteImage[] = [
  images.teamCelebration,
  images.teamHuddle,
  images.beachTrip,
  images.socialNight,
  images.boatBall,
];
