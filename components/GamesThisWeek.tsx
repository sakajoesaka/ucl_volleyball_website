import { connection } from "next/server";
import { Clock, MapPin } from "lucide-react";
import type { Game } from "@/content/games";
import { getThisWeek } from "@/lib/games";
import { Container, Heading, SoftCircles } from "@/components/ui";

// "Games This Week" on the Home page: a Monday-to-Sunday calendar of our matches, with results.
// Works out the week on each visit, so it moves on by itself every Monday.
export async function GamesThisWeek() {
  await connection();
  const week = getThisWeek();
  const first = week[0];
  const last = week[6];
  const all = week.flatMap((day) => day.games);

  return (
    <section
      aria-labelledby="games-this-week"
      className="relative isolate overflow-hidden bg-white py-16 md:py-24"
    >
      <SoftCircles layout="corners" />
      <Container>
        <Heading id="games-this-week" className="text-brand">
          Games This Week
        </Heading>
        <p className="mt-3 text-lg text-muted">
          {first.weekday} {first.day} {first.month} – {last.weekday} {last.day} {last.month}
        </p>

        {all.length === 0 ? (
          <p className="mt-10 rounded-[var(--radius-card)] border border-line bg-paper p-8 text-center text-lg text-muted">
            No games this week. Check back next week.
          </p>
        ) : (
          <ol className="mt-10 grid gap-2 lg:grid-cols-7">
            {week.map((day) => (
              <li
                key={day.date}
                aria-current={day.isToday ? "date" : undefined}
                className={`flex gap-4 rounded-2xl border p-3 lg:min-h-64 lg:flex-col lg:gap-3 ${
                  day.isToday ? "border-brand bg-lilac-50 ring-2 ring-brand" : "border-line bg-paper"
                } ${day.games.length === 0 ? "items-center lg:items-stretch" : ""}`}
              >
                <p className="w-20 shrink-0 lg:w-auto">
                  <span className="block text-sm font-semibold text-muted">{day.weekday}</span>
                  <span className="heading block text-3xl whitespace-nowrap text-ink">
                    {day.day} <span className="text-base text-muted">{day.month}</span>
                  </span>
                  {day.isToday && (
                    <span className="mt-1.5 inline-block rounded-full bg-brand px-2.5 py-0.5 text-xs font-semibold text-white">
                      Today
                    </span>
                  )}
                </p>
                {day.games.length === 0 ? (
                  <p className="text-sm text-muted">No games</p>
                ) : (
                  <ul className="flex flex-1 flex-col gap-2">
                    {day.games.map((game) => (
                      <li key={`${game.team}-${game.opponent}`}>
                        <GameCard game={game} />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        )}
      </Container>
    </section>
  );
}

function GameCard({ game }: { game: Game }) {
  const result = game.score
    ? game.score[0] > game.score[1]
      ? "Won"
      : game.score[0] < game.score[1]
        ? "Lost"
        : "Drew"
    : null;

  return (
    <article className="rounded-xl bg-brand p-3 text-white">
      {/* Our team is the headline; the opponent goes underneath. */}
      <h3 className="heading text-lg leading-tight">{game.team}</h3>
      <p className="mt-1 text-sm font-semibold text-lilac-200">vs {game.opponent}</p>
      <p className="mt-2 flex items-start gap-1.5 text-xs text-white/80">
        <Clock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        {game.time}
      </p>
      <p className="mt-1 flex items-start gap-1.5 text-xs text-white/80">
        <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        {game.venue}
      </p>
      {game.score && (
        <p
          className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-sm font-bold ${
            result === "Won" ? "bg-lilac text-brand-950" : "bg-white/15 text-white"
          }`}
        >
          {result} {game.score[0]}–{game.score[1]}
        </p>
      )}
    </article>
  );
}

// Shown while the week is worked out.
export function GamesThisWeekSkeleton() {
  return (
    <section aria-hidden="true" className="bg-white py-16 md:py-24">
      <Container>
        <div className="h-12 w-72 animate-pulse rounded-xl bg-lilac-100" />
        <div className="mt-10 h-64 animate-pulse rounded-2xl bg-paper" />
      </Container>
    </section>
  );
}
