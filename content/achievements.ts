import { images, type SiteImage } from "./images";

// Teams on the Our Legacy page. Each card opens a panel with the full details.
//
// - `title: true` marks a championship win (shown with a trophy).
// - Text in [square brackets] shows on the site as a placeholder tag.
//   Replace it with the real details (and delete the brackets) when you have them.

export type Captain = {
  name: string;
  course: string;
  position?: string;
  email: string;
};

export type Team = {
  name: string;
  image: SiteImage;
  summary?: string;
  achievements: { text: string; title?: boolean }[];
  // The longer description shown when the card is opened. One string per paragraph.
  about: string[];
  // The team's own Instagram username, without the @.
  instagram?: string;
  // Add a second block for teams with two captains.
  captains: Captain[];
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
    about: [
      "Our top men's side and one of the most successful teams in the club's history, competing for titles indoors and on the beach.",
      "[Placeholder: league, training schedule and how trials work.]",
    ],
    captains: [
      {
        name: "Gruia Natasta",
        course: "Psychology, 2nd year",
        position: "Outside Hitter",
        email: "[Captain's email]",
      },
    ],
  },
  {
    name: "Men's 2nd Team",
    image: images.mensSecond,
    summary: "Competes in BUCS Division 3 South and is the development pathway into the 1st team.",
    achievements: [{ text: "Just missed out on promotion in their first season" }],
    about: ["[Placeholder: a longer description of the team, its league, training and trials.]"],
    captains: [
      {
        name: "Maayan Biran",
        course: "Mathematics with Physics, 3rd year",
        position: "Middle Blocker",
        email: "[Captain's email]",
      },
    ],
  },
  {
    name: "Women's 1st Team",
    image: images.womensFirst,
    achievements: [
      { text: "Volleyball England Student Cup Champions 2023, 2024 and 2025", title: true },
      { text: "Unbeaten on the way to the 2023 title" },
      { text: "Regular top-3 finishes in BUCS South Premier and the National Trophy" },
    ],
    about: ["[Placeholder: a longer description of the team, its league, training and trials.]"],
    captains: [
      {
        name: "Brooke Tluchak",
        course: "Arts and Sciences, 2nd year",
        position: "Middle Blocker",
        email: "[Captain's email]",
      },
    ],
  },
  {
    name: "Women's 2nd Team",
    image: images.womensSecond,
    achievements: [
      { text: "Won promotion out of their BUCS division in their first ever season", title: true },
    ],
    about: ["[Placeholder: a longer description of the team, its league, training and trials.]"],
    captains: [
      {
        name: "Ekaterina Komarova",
        course: "Media, 3rd year",
        position: "Opposite Hitter",
        email: "[Captain's email]",
      },
    ],
  },
  {
    name: "Mixed Team",
    image: images.mixedTeam,
    achievements: [{ text: "LUSL Mixed League Champions 2024", title: true }],
    about: [
      "Plays in the LUSL Prem League and the LUSL Cup.",
      "Go check out our Instagram for match memes and to see our team!",
    ],
    instagram: "ucl.mixed.volleyball",
    captains: [
      {
        name: "Joe Michael Sakamura Sissons",
        course: "BSc Natural Science, 3rd year",
        email: "joe.sissons.24@ucl.ac.uk",
      },
      {
        name: "Hei-Tou Wong",
        course: "Geography with Economics, 1st year",
        email: "hei-tou.wong.26@ucl.ac.uk",
      },
    ],
  },
];
