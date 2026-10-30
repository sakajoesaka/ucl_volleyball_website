import { Check, Clock, MapPin } from "lucide-react";
import { images } from "@/content/images";
import { sessions, socialHighlights } from "@/content/sessions";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { ButtonLink, Container, Heading, PageHeader } from "@/components/ui";

export const metadata = pageMetadata({
  title: "What We Offer",
  description: `Membership is ${site.membershipPrice} a year and covers three indoor sessions every week plus every social. See our weekly timetable, socials and trips.`,
  path: "/what-we-offer",
});

export default function OfferPage() {
  return (
    <>
      <PageHeader
        title="What We Offer"
        intro="We're a big, welcoming and diverse club. Whether you're a complete beginner or an experienced player, there's a place for you here."
      />

      <section className="pb-16 md:pb-24">
        <Container className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          {/* Membership */}
          <div className="relative isolate flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-brand p-7 text-white md:p-9">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG */}
            <img
              src="/volleyball.svg"
              alt=""
              aria-hidden="true"
              className="absolute -right-16 -bottom-16 -z-10 size-52 opacity-20"
            />
            <Heading as="h2" size="md">
              {site.membershipName}
            </Heading>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="heading text-6xl">{site.membershipPrice}</span>
              <span className="text-white/75">per year</span>
            </p>
            <ul className="mt-6 space-y-3">
              {["Three indoor sessions every week", "Every social event"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-lilac text-brand-950">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href={site.joinUrl} variant="lilac" className="mt-8 self-start lg:mt-auto">
              Join the Society
            </ButtonLink>
          </div>

          {/* Timetable */}
          <div className="rounded-[var(--radius-card)] border border-line bg-white p-7 md:p-9">
            <Heading as="h2" size="md" className="text-brand">
              Weekly Sessions
            </Heading>
            <ul className="mt-6 divide-y divide-line">
              {sessions.map((session) => (
                <li
                  key={session.day}
                  className="grid gap-x-6 gap-y-1.5 py-5 first:pt-0 last:pb-0 sm:grid-cols-[8rem_1fr_auto] sm:items-center"
                >
                  <p className="heading text-xl text-ink">{session.day}</p>
                  <div className="space-y-1">
                    <p className="flex items-center gap-2 font-semibold text-ink">
                      <Clock className="size-4 text-lilac" aria-hidden="true" />
                      {session.time}
                    </p>
                    <p className="flex items-center gap-2 text-muted">
                      <MapPin className="size-4 text-lilac" aria-hidden="true" />
                      {session.venue}
                      {session.area && `, ${session.area}`}
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(session.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="justify-self-start text-sm font-semibold text-brand underline decoration-lilac decoration-2 underline-offset-4 hover:text-brand-600"
                  >
                    Map<span className="sr-only"> of {session.venue} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-lilac-50 p-4 text-sm text-muted">
              Free tickets for each session are released in the members&apos; group.{" "}
              <TransitionLink href="/faqs" className="font-semibold text-brand underline underline-offset-2">
                Here&apos;s how to get added
              </TransitionLink>
              .
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading className="text-brand">Socials &amp; Trips</Heading>
            <p className="mt-5 text-lg text-muted">
              Volleyball is only half of it. Your membership gets you into every social we run, all year.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {socialHighlights.map((item) => (
                <li key={item} className="rounded-full bg-lilac-100 px-4 py-2 font-medium text-brand">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Photo
              image={images.beachTrip}
              sizes="(min-width: 1024px) 280px, 50vw"
              className="aspect-[3/4] rounded-[var(--radius-card)]"
            />
            <Photo
              image={images.socialNight}
              sizes="(min-width: 1024px) 280px, 50vw"
              className="mt-10 aspect-[3/4] rounded-[var(--radius-card)]"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Heading className="text-brand">Ready to Play?</Heading>
            <p className="mt-3 text-lg text-muted">Grab your membership and see you on court.</p>
          </div>
          <ButtonLink href={site.joinUrl}>Join the Society</ButtonLink>
        </Container>
      </section>
    </>
  );
}
