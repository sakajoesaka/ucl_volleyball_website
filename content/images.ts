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
    alt: "The UCL mixed team in a huddle",
    label: "Mixed team huddle",
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
  logo: {
    src: "/images/logo.png",
    alt: "UCL Volleyball Society logo",
    label: "Logo",
  },
} satisfies Record<string, SiteImage>;
