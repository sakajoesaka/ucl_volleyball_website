import { events, type ClubEvent } from "@/content/events";

// Today's date in London as "YYYY-MM-DD", whatever time zone the server runs in.
export function londonToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Events from today onwards, soonest first. An event stays listed until the end of its day.
export function getUpcomingEvents(): ClubEvent[] {
  const today = londonToday();
  return events.filter((event) => event.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

// Events before today, most recent first.
export function getPastEvents(): ClubEvent[] {
  const today = londonToday();
  return events.filter((event) => event.date < today).sort((a, b) => b.date.localeCompare(a.date));
}

const toDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

export function formatEventDate(isoDate: string) {
  const date = toDate(isoDate);
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...options }).format(date);
  return {
    weekday: part({ weekday: "short" }),
    day: part({ day: "numeric" }),
    month: part({ month: "short" }),
    year: part({ year: "numeric" }),
    full: part({ weekday: "long", day: "numeric", month: "long", year: "numeric" }),
  };
}
