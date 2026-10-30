import { Suspense } from "react";
import { connection } from "next/server";
import { CalendarDays, MapPin } from "lucide-react";
import type { ClubEvent } from "@/content/events";
import { site } from "@/content/site";
import { formatEventDate, getUpcomingEvents } from "@/lib/events";
import { pageMetadata } from "@/lib/metadata";
import { BrandIcon } from "@/components/BrandIcon";
import { Photo } from "@/components/Photo";
import { ButtonLink, Container, Heading, PageHeader } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Upcoming Events",
  description: "Tournaments, socials and trips coming up at UCL Volleyball Society.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <PageHeader
        backdrop="rings"
        title="Upcoming Events"
        intro="Tournaments, socials and trips. Here's what's coming up."
      />
      <Container className="py-12 md:py-20">
        <Suspense fallback={<EventsSkeleton />}>
          <EventList />
        </Suspense>
      </Container>
    </>
  );
}

// Runs on each visit (not at build time), so past events drop off automatically.
async function EventList() {
  await connection();
  const upcoming = getUpcomingEvents();

  if (upcoming.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-white p-8 text-center md:p-12">
        <CalendarDays className="mx-auto size-10 text-lilac" aria-hidden="true" />
        <p className="mt-4 text-lg font-semibold text-ink">
          No upcoming events right now — check the WhatsApp group
        </p>
        <ButtonLink
          href={site.whatsappUrl}
          className="mt-6"
          icon={<BrandIcon platform="whatsapp" className="size-5" />}
        >
          Join our WhatsApp
        </ButtonLink>
      </div>
    );
  }

  // The soonest featured event goes first, as the large "Next Big Event" card.
  const featured = upcoming.find((event) => event.featured);
  const ordered = featured ? [featured, ...upcoming.filter((event) => event !== featured)] : upcoming;

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {ordered.map((event, i) => {
        const isFeatured = event === featured;
        return (
          <li key={`${event.date}-${event.title}`} className={isFeatured ? "sm:col-span-2" : ""}>
            <EventCard event={event} featured={isFeatured} palette={i} />
          </li>
        );
      })}
    </ul>
  );
}

// Poster-style card: picture on top, bold title, then the date and time along the bottom.
function EventCard({ event, featured, palette }: { event: ClubEvent; featured: boolean; palette: number }) {
  const date = formatEventDate(event.date);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
      <div className="relative">
        {event.image ? (
          <Photo
            image={event.image}
            sizes={featured ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 370px, 100vw"}
            className={featured ? "aspect-[16/9]" : "aspect-[4/3]"}
          />
        ) : (
          <EventPoster date={date} palette={palette} featured={featured} />
        )}
        {featured && (
          <p className="absolute top-4 left-4 rounded-full bg-brand-950 px-3.5 py-1.5 text-sm font-semibold text-white">
            Next Big Event
          </p>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <Heading
          as="h2"
          size={featured ? "lg" : "md"}
          className="flex flex-wrap items-center gap-2.5 text-ink"
        >
          {event.title}
          {event.example && <ExampleTag />}
        </Heading>
        <p className={`mt-3 text-muted ${featured ? "md:text-lg" : ""}`}>{event.description}</p>
        <p className="mt-4 flex items-start gap-2 text-ink/85">
          <MapPin className="mt-1 size-4 shrink-0 text-lilac" aria-hidden="true" />
          {event.location}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-4 font-semibold text-ink">
          <time dateTime={event.date}>
            {date.weekday} {date.day} {date.month} {date.year}
          </time>
          <span className="text-right">{event.time}</span>
        </div>
      </div>
    </article>
  );
}

// Shown when an event has no image: overlapping circles with the date, in rotating club colours.
const posterPalettes = [
  { bg: "bg-brand", circle: "bg-blush", text: "text-white" },
  { bg: "bg-band", circle: "bg-brand", text: "text-brand-950" },
  { bg: "bg-blush", circle: "bg-lilac", text: "text-brand-950" },
];

function EventPoster({
  date,
  palette,
  featured,
}: {
  date: ReturnType<typeof formatEventDate>;
  palette: number;
  featured: boolean;
}) {
  const colours = posterPalettes[palette % posterPalettes.length];
  return (
    <div
      aria-hidden="true"
      className={`relative isolate overflow-hidden ${colours.bg} ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}
    >
      <div
        className={`absolute top-[-35%] right-[-42%] -z-10 aspect-square h-[150%] rounded-full ${colours.circle}`}
      />
      <div className={`absolute bottom-5 left-6 ${colours.text}`}>
        <p className="heading text-7xl md:text-8xl">{date.day}</p>
        <p className="heading text-2xl md:text-3xl">{date.month}</p>
      </div>
    </div>
  );
}

function ExampleTag() {
  return (
    <span className="rounded-full border border-dashed border-muted/50 px-2.5 py-0.5 font-sans text-xs font-semibold tracking-normal text-muted">
      Example
    </span>
  );
}

function EventsSkeleton() {
  return (
    <div aria-hidden="true" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="h-[30rem] animate-pulse rounded-[var(--radius-card)] bg-lilac-100 sm:col-span-2" />
      <div className="h-[30rem] animate-pulse rounded-[var(--radius-card)] bg-white" />
    </div>
  );
}
