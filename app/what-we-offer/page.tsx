import { Check, Clock, MapPin } from "lucide-react";
import { memberships, type Membership } from "@/content/memberships";
import { sessions, socialEvents } from "@/content/sessions";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { Carousel } from "@/components/Carousel";
import { SocialGallery } from "@/components/SocialGallery";
import { WithPlaceholders, hasPlaceholder } from "@/components/Placeholder";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { ButtonLink, Container, Heading, PageHeader } from "@/components/ui";

export const metadata = pageMetadata({
  title: "What We Offer",
  description: `Memberships start from ${site.membershipPrice} a year, covering three indoor sessions every week plus every social. See our memberships, weekly timetable, socials and trips.`,
  path: "/what-we-offer",
});

export default function OfferPage() {
  return (
    <>
      <PageHeader
        title="What We Offer"
        intro="We're a big, welcoming and diverse club. Whether you're a complete beginner or an experienced player, there's a place for you here."
      />

      {/* Memberships slideshow */}
      <section className="pb-16 md:pb-24">
        <Container>
          <Heading className="text-brand">Memberships</Heading>
          <Carousel
            label="Memberships"
            className="mt-8"
            slides={memberships.map((membership) => (
              <MembershipCard key={membership.name} membership={membership} />
            ))}
          />
        </Container>
      </section>

      {/* Timetable */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="rounded-[var(--radius-card)] border border-line bg-white p-7 md:p-10">
            <Heading className="text-brand">Weekly Sessions</Heading>
            <p className="mt-3 text-muted">Included in the {site.membershipName}.</p>
            <ul className="mt-8 divide-y divide-line">
              {sessions.map((session) => (
                <li
                  key={session.day}
                  className="grid gap-x-6 gap-y-1.5 py-5 first:pt-0 last:pb-0 sm:grid-cols-[10rem_1fr_auto] sm:items-center"
                >
                  <p className="heading text-xl text-ink md:text-2xl">{session.day}</p>
                  <div className="space-y-1 sm:flex sm:gap-8 sm:space-y-0">
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
            <p className="mt-8 rounded-2xl bg-lilac-50 p-4 text-sm text-muted">
              Free tickets for each session are released in the members&apos; group.{" "}
              <TransitionLink href="/faqs" className="font-semibold text-brand underline underline-offset-2">
                Here&apos;s how to get added
              </TransitionLink>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Socials & trips */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <Heading className="text-brand">Socials &amp; Trips</Heading>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Volleyball is only half of it. Your membership gets you into every social we run, all year. Pick
            one to see what it&apos;s like.
          </p>
          <div className="mt-10">
            <SocialGallery
              names={socialEvents.map((event) => event.name)}
              panels={socialEvents.map((event) =>
                event.images.length > 1 ? (
                  <Carousel
                    key={event.name}
                    label={`${event.name} photos`}
                    slides={event.images.map((image) => (
                      <Photo
                        key={image.src}
                        image={image}
                        sizes="(min-width: 1024px) 640px, 100vw"
                        className="aspect-[4/3] w-full"
                      />
                    ))}
                  />
                ) : (
                  <Photo
                    key={event.name}
                    image={event.images[0]}
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="aspect-[4/3] w-full"
                  />
                ),
              )}
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

function MembershipCard({ membership }: { membership: Membership }) {
  const { name, price, period, description, includes, joinUrl } = membership;
  const isPlaceholder = hasPlaceholder(price, description, ...includes);

  return (
    <div className="relative isolate grid h-full gap-8 overflow-hidden rounded-[var(--radius-card)] bg-brand p-7 text-white md:grid-cols-2 md:gap-12 md:p-10">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG */}
      <img
        src="/volleyball.svg"
        alt=""
        aria-hidden="true"
        className="absolute -right-16 -bottom-16 -z-10 size-56 opacity-20"
      />
      <div className="flex flex-col">
        <Heading as="h3" size="md">
          {name}
        </Heading>
        <p className="mt-3 text-white/85">
          <WithPlaceholders text={description} tone="light" />
        </p>
        <p className="mt-6 flex flex-wrap items-baseline gap-2">
          <span className="heading text-5xl md:text-6xl">
            <WithPlaceholders text={price} tone="light" />
          </span>
          <span className="text-white/75">{period}</span>
        </p>
        {isPlaceholder && (
          <p className="mt-4 text-sm text-white/70">Details in dashed boxes are placeholders, coming soon.</p>
        )}
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-lilac-200">What&apos;s included</p>
        <ul className="mt-4 space-y-3">
          {includes.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-lilac text-brand-950">
                <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              <span>
                <WithPlaceholders text={item} tone="light" />
              </span>
            </li>
          ))}
        </ul>
        <ButtonLink href={joinUrl} variant="lilac" className="mt-8 self-start">
          Join the Society
        </ButtonLink>
      </div>
    </div>
  );
}
