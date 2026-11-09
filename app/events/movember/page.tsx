import { ArrowLeft, Check, Lock } from "lucide-react";
import { movember } from "@/content/movember";
import { pixelFont } from "@/lib/fonts/pixel";
import { pageMetadata } from "@/lib/metadata";
import { DonationBar } from "@/components/DonationBar";
import { PixelButton } from "@/components/PixelButton";
import { PixelArt, moustache } from "@/components/PixelArt";
import { WithPlaceholders } from "@/components/Placeholder";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { Container, Heading } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Movember",
  description: `UCL Volleyball is raising money for men's health this Movember. See our events, what each fundraising goal unlocks, and donate.`,
  path: "/events/movember",
});

// The Movember fundraiser. It has its own black, brown and white look, and the cursor
// turns into a moustache here (see VolleyballCursor).
export default function MovemberPage() {
  return (
    <div className="bg-mo-cream text-mo-black">
      <section className="relative isolate overflow-hidden bg-mo-black text-white">
        <PixelScatter />
        <Container className="grid items-center gap-12 pt-28 pb-16 md:grid-cols-[1.25fr_1fr] md:pt-40 md:pb-24">
          <div>
            <TransitionLink
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Upcoming Events
            </TransitionLink>
            <p className={`${pixelFont.className} mt-8 text-xs leading-relaxed text-mo-tan sm:text-sm`}>
              UCL Volleyball × Movember {movember.year}
            </p>
            <Heading as="h1" size="xl" className="mt-4">
              Movember
            </Heading>
            <p className="mt-6 max-w-xl text-lg text-white/85 md:text-xl">{movember.intro}</p>
            <p className="mt-4 max-w-xl text-white/75">
              <WithPlaceholders text={movember.plans} tone="light" />
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <PixelButton href={movember.donateUrl} variant="light">
                Donate to Our Team
              </PixelButton>
              <PixelButton href={movember.movemberUrl} variant="outline">
                Visit Movember.com
              </PixelButton>
            </div>
          </div>
          <PixelArt
            sprite={moustache("#ffffff")}
            className="mx-auto w-3/4 max-w-sm motion-safe:animate-[mo-bob_1.2s_steps(2)_infinite] md:w-full"
          />
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <Heading>Our Fundraising</Heading>
          <p className="mt-4 max-w-2xl text-lg text-mo-black/75">
            Every donation moves the bar, and each goal we hit unlocks something new.
          </p>
          <div className="mt-10">
            <DonationBar
              raised={movember.raised}
              goal={movember.goal}
              placeholder={movember.figuresArePlaceholders}
            />
          </div>
          <Heading as="h3" size="md" className="mt-14">
            Fundraising Goals
          </Heading>
          <Milestones />
          <div className="mt-10">
            <PixelButton href={movember.donateUrl} variant="dark">
              Donate to Our Team
            </PixelButton>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <Heading>What&apos;s On in November</Heading>
          <MonthTable />
          <Agenda />
        </Container>
      </section>
    </div>
  );
}

// What each total unlocks. Nothing shows as unlocked while the total is still a placeholder.
function Milestones() {
  const total = movember.figuresArePlaceholders ? 0 : movember.raised;
  const nextAmount = movember.milestones.find((milestone) => milestone.amount > total)?.amount;

  return (
    <ol className="mt-6">
      {movember.milestones.map(({ amount, text }) => {
        const unlocked = total >= amount;
        const isNext = amount === nextAmount;
        const rowColours = unlocked
          ? "bg-mo-brown text-white"
          : isNext
            ? "bg-mo-black text-white"
            : "bg-white text-mo-black";

        return (
          <li
            key={amount}
            className={`-mt-1 grid grid-cols-[5rem_1fr_2.75rem] items-center gap-3 border-4 border-mo-black px-4 py-4 first:mt-0 sm:grid-cols-[7rem_1fr_3.5rem] sm:gap-5 sm:px-6 sm:py-5 ${rowColours}`}
          >
            <p className={`${pixelFont.className} text-sm sm:text-lg`}>£{amount}</p>
            <p className="font-semibold">{text}</p>
            <p className="justify-self-end">
              {unlocked && <Check className="size-5" aria-hidden="true" />}
              {isNext && (
                <span className={`${pixelFont.className} text-[0.6rem] text-mo-tan sm:text-xs`}>Next</span>
              )}
              {!unlocked && !isNext && <Lock className="size-4 text-mo-black/45" aria-hidden="true" />}
              {!isNext && <span className="sr-only">{unlocked ? "Unlocked" : "Locked"}</span>}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

const dateOf = (day: number) => new Date(Date.UTC(movember.year, 10, day));
const shortWeekday = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "UTC" });
const isReadingWeek = (day: number) => day >= movember.readingWeek.start && day <= movember.readingWeek.end;
const DAYS_IN_NOVEMBER = 30;

// The whole month at a glance, on larger screens.
function MonthTable() {
  const emptyBefore = (dateOf(1).getUTCDay() + 6) % 7; // Weeks start on Monday.
  const cells = [
    ...Array<null>(emptyBefore).fill(null),
    ...Array.from({ length: DAYS_IN_NOVEMBER }, (_, i) => i + 1),
  ];
  while (cells.length % 7 > 0) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));

  return (
    <table className="mt-10 hidden w-full table-fixed border-collapse border-4 border-mo-black lg:table">
      <caption className="sr-only">November {movember.year} events</caption>
      <thead>
        <tr className="bg-mo-black text-white">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <th key={day} scope="col" className={`${pixelFont.className} p-3 text-left text-xs font-normal`}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week) => (
          <tr key={week.find(Boolean)}>
            {week.map((day, i) => {
              if (day === null) {
                return <td key={`empty-${i}`} className="border-2 border-mo-black bg-mo-cream" />;
              }
              const event = movember.calendar.find((entry) => entry.day === day);
              const cellColours = event?.highlight
                ? "bg-mo-brown text-white"
                : isReadingWeek(day)
                  ? "bg-mo-tan/25"
                  : "";
              return (
                <td key={day} className={`h-28 border-2 border-mo-black p-3 align-top ${cellColours}`}>
                  <span className={`${pixelFont.className} block text-xs`}>{day}</span>
                  {event && (
                    <span className="mt-2 block text-sm leading-snug font-semibold">{event.title}</span>
                  )}
                  {day === movember.readingWeek.start && (
                    <span className="mt-2 block text-sm leading-snug font-semibold">Reading week</span>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// The same dates as a simple list, on phones and tablets.
function Agenda() {
  const { start, end } = movember.readingWeek;
  const entries = [
    ...movember.calendar.map((entry) => ({
      ...entry,
      date: `${shortWeekday.format(dateOf(entry.day))} ${entry.day}`,
    })),
    { day: start, title: "Reading week", date: `${start}–${end}`, highlight: false },
  ].sort((a, b) => a.day - b.day);

  return (
    <ol className="mt-8 lg:hidden">
      {entries.map((entry) => (
        <li
          key={entry.day}
          className={`-mt-1 grid grid-cols-[5.5rem_1fr] items-center gap-3 border-4 border-mo-black px-4 py-4 first:mt-0 ${
            entry.highlight
              ? "bg-mo-brown text-white"
              : entry.title === "Reading week"
                ? "bg-mo-tan/25"
                : "bg-white"
          }`}
        >
          <p className={`${pixelFont.className} text-xs`}>{entry.date}</p>
          <p className="font-semibold">{entry.title}</p>
        </li>
      ))}
    </ol>
  );
}

// Brown pixel squares scattered over the black header. Purely decorative.
function PixelScatter() {
  const squares = [
    "top-[18%] left-[52%] size-3",
    "top-[30%] right-[6%] size-5",
    "top-[70%] left-[46%] size-4",
    "bottom-[8%] right-[30%] size-3",
    "top-[12%] right-[22%] size-2",
    "bottom-[20%] left-[4%] size-2",
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {squares.map((square) => (
        <span key={square} className={`absolute bg-mo-brown ${square}`} />
      ))}
    </div>
  );
}
