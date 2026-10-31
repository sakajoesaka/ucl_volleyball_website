// Matches shown in "Games This Week" on the Home page.
//
// HOW TO ADD A GAME: copy one of the blocks below (from { to },) and change the details.
// - date:     the day of the game as "YYYY-MM-DD"
// - time:     any text, e.g. "4–6pm"
// - team:     which of our teams is playing, e.g. "Mixed Team", "Men's 1st Team"
// - opponent: who we're playing
// - venue:    where
// - score:    add it once the game is played, OUR sets first: e.g. score: [3, 1]
//             Leave it out for games that haven't happened yet.
//
// The Home page only shows games from the current week (Monday to Sunday) and updates by
// itself, so old games can stay in this list.

export type Game = {
  date: string;
  time: string;
  team: string;
  opponent: string;
  venue: string;
  score?: [number, number];
};

export const games: Game[] = [
  {
    date: "2026-10-26",
    time: "4–6pm",
    team: "Mixed Team",
    opponent: "Greenwich",
    venue: "Academy Sport",
    score: [3, 0],
  },
  {
    date: "2026-10-28",
    time: "5:30–7:30pm",
    team: "Men's 1st Team",
    opponent: "Imperial M2",
    venue: "Somers Town Leisure Centre",
    score: [3, 0],
  },
];
