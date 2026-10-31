import { games, type Game } from "@/content/games";
import { londonToday } from "@/lib/events";

export type WeekDay = {
  date: string;
  weekday: string;
  day: string;
  month: string;
  isToday: boolean;
  games: Game[];
};

const fromIso = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
const toIso = (date: Date) => date.toISOString().slice(0, 10);
const format = (date: Date, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...options }).format(date);

// The current week in London, Monday to Sunday, with each day's games.
export function getThisWeek(): WeekDay[] {
  const today = londonToday();
  const monday = fromIso(today);
  monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setUTCDate(monday.getUTCDate() + i);
    const iso = toIso(date);
    return {
      date: iso,
      weekday: format(date, { weekday: "short" }),
      day: format(date, { day: "numeric" }),
      month: format(date, { month: "short" }),
      isToday: iso === today,
      games: games.filter((game) => game.date === iso),
    };
  });
}
