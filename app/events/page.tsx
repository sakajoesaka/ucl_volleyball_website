import { Suspense } from "react";
import { connection } from "next/server";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { ClubEvent } from "@/content/events";
import { movember } from "@/content/movember";
import { site } from "@/content/site";
import { formatEventDate, getUpcomingEvents } from "@/lib/events";
import { pixelFont } from "@/lib/fonts";
import { pageMetadata } from "@/lib/metadata";
import { BrandIcon } from "@/components/BrandIcon";
import { Photo } from "@/components/Photo";
import { PixelMoustache } from "@/components/PixelMoustache";
import { TransitionLink } from "@/components/transition/TransitionLink";
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
        {movember.showOnEventsPage && <MovemberBanner />}
        <Suspense fallback={<EventsSkeleton />}>
          <EventList />
        </Suspense>
      </Container>
    </>
  );
}

// Points to the Movember fundraiser page, in that page's black, brown and white.
function MovemberBanner() {
  return (
    <section
      aria-labelledby="movember-banner"
      className="relative isolate mb-10 grid items-center gap-6 overflow-hidden border-4 border-mo-black bg-mo-black p-6 text-white shadow-[8px_8px_0_var(--color-mo-brown)] sm:grid-cols-[auto_1fr_auto] sm:gap-8 md:mb-14 md:p-8"
    >
      <PixelMoustache colour="#ffffff" highlight="#c08a5a" className="w-24 md:w-32" />
      <div>
        <p className={`${pixelFont.className} text-[0.65rem] leading-relaxed text-mo-tan sm:text-xs`}>
          Movember {movember.year}
        </p>
        <Heading as="h2" size="md" id="movember-banner" className="mt-2">
          We&apos;re Raising Money for Men&apos;s Health
        </Heading>
        <p className="mt-2 text-white/80">See how close we are to our goal, and how to get involved.</p>
      </div>
      <TransitionLink
        href="/events/movember"
        className="inline-flex min-h-12 items-center justify-center gap-2 self-start border-4 border-white bg-white px-6 py-3 font-semibold text-mo-black shadow-[4px_4px_0_var(--color-mo-brown)] transition-[translate,box-shadow] duration-100 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none sm:self-center"
      >
        Our Movember Page
        <ArrowRight className="size-4" aria-hidden="true" />
      </TransitionLink>
    </section>
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
// It lifts and the poster shifts on hover, but it isn't a link, so clicking does nothing.
function EventCard({ event, featured, palette }: { event: ClubEvent; featured: boolean; palette: number }) {
  const date = formatEventDate(event.date);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-[translate,box-shadow,border-color] duration-300 ease-[var(--ease-snap)] hover:-translate-y-1.5 hover:border-lilac hover:shadow-xl hover:shadow-brand/10">
      <div className="relative overflow-hidden">
        {event.image ? (
          <Photo
            image={event.image}
            sizes={featured ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 370px, 100vw"}
            className={featured ? "aspect-[16/9]" : "aspect-[4/3]"}
            imgClassName="transition-transform duration-500 ease-[var(--ease-snap)] group-hover:scale-105"
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
        <div className="mt-auto pt-8">
          <div className="flex items-center justify-between gap-4 border-t border-line pt-3 font-semibold text-ink">
            <time dateTime={event.date}>
              {date.weekday} {date.day} {date.month} {date.year}
            </time>
            <span className="text-right">{event.time}</span>
          </div>
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
        className={`absolute top-[-35%] right-[-42%] -z-10 aspect-square h-[150%] rounded-full transition-transform duration-500 ease-[var(--ease-snap)] group-hover:-translate-x-[8%] group-hover:scale-110 ${colours.circle}`}
      />
      <div
        className={`absolute bottom-5 left-6 transition-transform duration-500 ease-[var(--ease-snap)] group-hover:-translate-y-1.5 ${colours.text}`}
      >
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
