import { Check } from "lucide-react";
import { memberships, type Membership } from "@/content/memberships";
import { socialEvents } from "@/content/sessions";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { Carousel } from "@/components/Carousel";
import { SocialGallery } from "@/components/SocialGallery";
import { WithPlaceholders, hasPlaceholder } from "@/components/Placeholder";
import { SessionsToggle } from "@/components/SessionsToggle";
import { ButtonLink, Container, Heading, PageHeader } from "@/components/ui";

export const metadata = pageMetadata({
  title: "What We Offer",
  description: `Memberships start from ${site.membershipPrice} a year, covering three indoor sessions every week plus every social. See our memberships, session times, socials and trips.`,
  path: "/what-we-offer",
});

export default function OfferPage() {
  return (
    <>
      <PageHeader
        backdrop="arcs"
        title="What We Offer"
        intro="We're a big, welcoming and diverse club. Whether you're a complete beginner or an experienced player, there's a place for you here."
      />

      {/* Memberships slideshow */}
      <section className="py-16 md:py-24">
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

      {/* Socials & trips */}
      <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
        {/* A dotted "table top" with a couple of soft circles behind the photo and options */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(var(--color-lilac-200)_1.5px,transparent_1.5px)] [background-size:22px_22px] opacity-70" />
          <div className="absolute bottom-[-12rem] left-[-10rem] size-[28rem] rounded-full bg-lilac-100" />
          <div className="absolute top-[-8rem] right-[-8rem] size-[22rem] rounded-full bg-blush/40" />
        </div>
        <Container>
          <SocialGallery
            intro={
              <>
                <Heading className="text-brand">Socials &amp; Trips</Heading>
                <p className="mt-5 max-w-2xl text-lg text-muted">
                  Volleyball is only half of it. Your membership gets you into every social we run, all year.
                  Pick one to see what it&apos;s like.
                </p>
              </>
            }
            items={socialEvents}
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
  const { name, price, period, description, includes, sessions, sessionsNote, joinUrl } = membership;
  const isPlaceholder = hasPlaceholder(price, description, ...includes);

  return (
    <div className="relative isolate grid flex-1 grid-rows-[auto_1fr_auto] gap-8 overflow-clip rounded-[var(--radius-card)] bg-brand p-7 text-white md:grid-cols-2 md:grid-rows-[1fr_auto] md:gap-12 md:p-10">
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
      <div className="md:col-span-2">
        <SessionsToggle sessions={sessions} note={sessionsNote} />
      </div>
    </div>
  );
}
