import { Suspense } from "react";
import { connection } from "next/server";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { ClubEvent } from "@/content/events";
import { site } from "@/content/site";
import { formatEventDate, getUpcomingEvents } from "@/lib/events";
import { pageMetadata } from "@/lib/metadata";
import { BrandIcon } from "@/components/BrandIcon";
import { ButtonLink, Container, Heading, PageHeader } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Upcoming Events",
  description: "Tournaments, socials and trips coming up at UCL Volleyball Society.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <PageHeader title="Upcoming Events" intro="Tournaments, socials and trips. Here's what's coming up." />
      <Container className="pb-16 md:pb-24">
        <Suspense fallback={<EventsSkeleton />}>
          <EventList />
        </Suspense>
        <p className="mt-12 text-muted">
          New events are announced in our WhatsApp group first.{" "}
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand underline decoration-lilac decoration-2 underline-offset-4"
          >
            Join the group<span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          so you never miss one.
        </p>
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

  const featured = upcoming.find((event) => event.featured);
  const rest = upcoming.filter((event) => event !== featured);

  return (
    <div className="space-y-12">
      {featured && <FeaturedEvent event={featured} />}
      {rest.length > 0 && (
        <section>
          <Heading size="md" className="text-brand">
            {featured ? "Also Coming Up" : "Coming Up"}
          </Heading>
          <ul className="mt-6 space-y-4">
            {rest.map((event) => (
              <li key={`${event.date}-${event.title}`}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function FeaturedEvent({ event }: { event: ClubEvent }) {
  const date = formatEventDate(event.date);
  return (
    <section
      aria-labelledby="next-big-event"
      className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-brand to-brand-900 p-7 text-white md:p-10"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG */}
      <img
        src="/volleyball.svg"
        alt=""
        aria-hidden="true"
        className="absolute -right-24 -bottom-28 -z-10 size-64 opacity-15 md:size-80"
      />
      <p
        id="next-big-event"
        className="inline-flex rounded-full bg-lilac px-3.5 py-1 text-sm font-semibold text-brand-950"
      >
        Next Big Event
      </p>
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
        <DateBlock date={date} tone="light" />
        <div>
          <Heading as="h2" className="flex flex-wrap items-center gap-3">
            {event.title}
            {event.example && <ExampleTag tone="light" />}
          </Heading>
          <EventMeta event={event} date={date.full} tone="light" />
          <p className="mt-4 max-w-2xl text-lg text-white/85">{event.description}</p>
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: ClubEvent }) {
  const date = formatEventDate(event.date);
  return (
    <article className="flex gap-5 rounded-[var(--radius-card)] border border-line bg-white p-5 md:gap-8 md:p-7">
      <DateBlock date={date} />
      <div className="min-w-0">
        <Heading as="h3" size="md" className="flex flex-wrap items-center gap-2.5 text-ink">
          {event.title}
          {event.example && <ExampleTag />}
        </Heading>
        <EventMeta event={event} date={date.full} />
        <p className="mt-3 text-muted">{event.description}</p>
      </div>
    </article>
  );
}

function DateBlock({
  date,
  tone = "dark",
}: {
  date: ReturnType<typeof formatEventDate>;
  tone?: "dark" | "light";
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex w-20 shrink-0 flex-col items-center self-start rounded-2xl py-3 md:w-24 ${
        tone === "light" ? "bg-white text-brand" : "bg-lilac-100 text-brand"
      }`}
    >
      <span className="text-xs font-semibold">{date.weekday}</span>
      <span className="heading text-4xl md:text-5xl">{date.day}</span>
      <span className="text-sm font-semibold">{date.month}</span>
    </div>
  );
}

function EventMeta({
  event,
  date,
  tone = "dark",
}: {
  event: ClubEvent;
  date: string;
  tone?: "dark" | "light";
}) {
  const iconClass = `size-4 shrink-0 ${tone === "light" ? "text-lilac-300" : "text-lilac"}`;
  return (
    <ul className={`mt-3 space-y-1.5 ${tone === "light" ? "text-white/90" : "text-ink/85"}`}>
      <li className="flex items-center gap-2">
        <CalendarDays className={iconClass} aria-hidden="true" />
        <span className="font-semibold">{date}</span>
      </li>
      <li className="flex items-center gap-2">
        <Clock className={iconClass} aria-hidden="true" />
        {event.time}
      </li>
      <li className="flex items-center gap-2">
        <MapPin className={iconClass} aria-hidden="true" />
        {event.location}
      </li>
    </ul>
  );
}

function ExampleTag({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span
      className={`rounded-full border border-dashed px-2.5 py-0.5 font-sans text-xs font-semibold tracking-normal ${
        tone === "light" ? "border-white/60 text-white/80" : "border-muted/50 text-muted"
      }`}
    >
      Example
    </span>
  );
}

function EventsSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-4">
      <div className="h-64 animate-pulse rounded-[var(--radius-card)] bg-lilac-100" />
      <div className="h-36 animate-pulse rounded-[var(--radius-card)] bg-white" />
      <div className="h-36 animate-pulse rounded-[var(--radius-card)] bg-white" />
    </div>
  );
}
