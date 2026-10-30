import { images, type SiteImage } from "./images";

// Team achievements shown on the Our Legacy page, one card per team.
// `title: true` marks a championship win (shown with a trophy).

export type Team = {
  name: string;
  image: SiteImage;
  summary?: string;
  achievements: { text: string; title?: boolean }[];
};

export const teams: Team[] = [
  {
    name: "Men's 1st Team",
    image: images.mensFirst,
    achievements: [
      { text: "BUCS Beach National Champions 2025", title: true },
      // Check: 1st and 2nd at the same 2025 BUCS Beach event, confirm this is correct.
      { text: "2nd at the BUCS Beach National Championship 2025" },
      { text: "2nd at the Volleyball England Student Cup 2025" },
      { text: "3rd at the Volleyball England Student Cup 2026" },
    ],
  },
  {
    name: "Men's 2nd Team",
    image: images.mensSecond,
    summary: "Competes in BUCS Division 3 South and is the development pathway into the 1st team.",
    achievements: [{ text: "Just missed out on promotion in their first season" }],
  },
  {
    name: "Women's 1st Team",
    image: images.womensFirst,
    achievements: [
      { text: "Volleyball England Student Cup Champions 2023, 2024 and 2025", title: true },
      { text: "Unbeaten on the way to the 2023 title" },
      { text: "Regular top-3 finishes in BUCS South Premier and the National Trophy" },
    ],
  },
  {
    name: "Women's 2nd Team",
    image: images.womensSecond,
    achievements: [
      { text: "Won promotion out of their BUCS division in their first ever season", title: true },
    ],
  },
  {
    name: "Mixed Team",
    image: images.mixedTeam,
    achievements: [{ text: "LUSL Mixed League Champions 2024", title: true }],
  },
];
