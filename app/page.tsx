import { Suspense } from "react";
import { images, lifeAtTheClub } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { BrandIcon } from "@/components/BrandIcon";
import { Carousel } from "@/components/Carousel";
import { CountUp } from "@/components/CountUp";
import { FeedbackForm } from "@/components/FeedbackForm";
import { GamesThisWeek, GamesThisWeekSkeleton } from "@/components/GamesThisWeek";
import { ZoomOnScroll } from "@/components/ZoomOnScroll";
import { ButtonLink, Container, Heading } from "@/components/ui";

export const metadata = pageMetadata({
  description: site.description,
  path: "/",
});

// Scrolling strip under the welcome section. Edit freely.
const highlights = [
  "All levels welcome",
  "BUCS Beach National Champions",
  `${site.memberCount} members`,
  "Beach trip to Portugal",
  "The Boat Ball",
  `Since ${site.foundedYear}`,
  "Five teams",
];

export default function HomePage() {
  return (
    <>
      {/* Hero: fills the first screen on phones, so both buttons show without scrolling. */}
      <section className="relative isolate flex min-h-svh items-end overflow-hidden bg-brand-900 md:min-h-[min(100svh,56rem)]">
        {/* Zooms in slowly as you scroll down */}
        <ZoomOnScroll className="absolute inset-0 -z-10 origin-[30%_35%]">
          <Photo
            image={images.hero}
            sizes="100vw"
            preload
            className="absolute inset-0"
            imgClassName="object-[28%_center] md:object-top"
          />
        </ZoomOnScroll>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950 via-brand-950/50 to-brand-950/5 md:bg-gradient-to-r md:from-brand-950/90 md:via-brand-950/40 md:to-transparent"
        />
        <Container className="pt-28 pb-10 md:pb-20">
          <p className="text-lg font-semibold text-lilac-200 md:text-xl">We are</p>
          {/* The negative margin cancels the space built into the big "U", so it lines up with "We are". */}
          <h1 className="heading mt-1 -ml-[0.065em] text-[clamp(2.25rem,11vw,7.5rem)] whitespace-nowrap text-white">
            UCL Volleyball
          </h1>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.joinUrl} variant="lilac">
              Join the Society
            </ButtonLink>
            <ButtonLink
              href={site.whatsappUrl}
              variant="outlineLight"
              icon={<BrandIcon platform="whatsapp" className="size-5" />}
            >
              Join our WhatsApp
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Welcome, with sticker-style stats */}
      <section className="overflow-hidden py-16 md:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <Heading size="xl" className="text-brand">
              Welcome to the Club
            </Heading>
            <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">
              UCL Volleyball is a welcoming, competitive and social club. Whether you&apos;re aiming for gold
              or just looking for great friends, you&apos;ll find your place here.
            </p>
            <ButtonLink href="/what-we-offer" variant="outline" className="mt-8">
              See What We Offer
            </ButtonLink>
          </div>

          <dl className="grid grid-cols-3 gap-3 sm:gap-5">
            <div className="flex aspect-square -rotate-6 flex-col-reverse items-center justify-center rounded-full bg-brand text-white shadow-[0_18px_40px_-18px_rgba(75,26,122,0.7)]">
              <dt className="text-xs font-medium text-lilac-200 sm:text-sm">Founded</dt>
              <dd className="heading text-[1.7rem] sm:text-5xl">{site.foundedYear}</dd>
            </div>
            <div className="flex aspect-square translate-y-5 rotate-3 flex-col-reverse items-center justify-center rounded-full bg-blush text-brand-950 shadow-[0_18px_40px_-18px_rgba(75,26,122,0.5)]">
              <dt className="text-xs font-medium sm:text-sm">Teams</dt>
              <dd className="heading text-[2.4rem] sm:text-6xl">
                <CountUp value={5} />
              </dd>
            </div>
            <div className="flex aspect-square -rotate-2 flex-col-reverse items-center justify-center rounded-full bg-band text-brand-950 shadow-[0_18px_40px_-18px_rgba(75,26,122,0.5)]">
              <dt className="text-xs font-medium sm:text-sm">Members</dt>
              <dd className="heading text-[1.7rem] sm:text-5xl">
                <CountUp value={parseInt(site.memberCount)} suffix={site.memberCount.replace(/\d/g, "")} />
              </dd>
            </div>
            <div className="col-span-3 mt-6 flex rotate-1 items-center justify-between gap-4 rounded-full bg-lilac px-6 py-4 text-brand-950 shadow-[0_18px_40px_-18px_rgba(75,26,122,0.5)] sm:px-9 sm:py-5">
              <dt className="text-sm font-semibold whitespace-nowrap sm:text-base">
                Membership starting from
              </dt>
              <dd className="heading text-3xl whitespace-nowrap sm:text-5xl">
                <CountUp value={parseInt(site.membershipPrice.replace(/\D/g, ""))} prefix="£" />
                <span className="text-xl sm:text-2xl">/year</span>
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* Scrolling highlights strip */}
      <section aria-label="Club highlights" className="overflow-hidden bg-brand py-5 md:py-7">
        <div className="flex w-max motion-safe:animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {highlights.map((item, i) => (
                <li key={item} className="flex items-center">
                  <span
                    className={`heading px-6 text-3xl whitespace-nowrap md:px-9 md:text-5xl ${i % 2 ? "text-lilac-200" : "text-white"}`}
                  >
                    {item}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG */}
                  <img src="/volleyball.svg" alt="" width={36} height={36} className="size-7 md:size-9" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* This week's matches and results (see content/games.ts) */}
      <Suspense fallback={<GamesThisWeekSkeleton />}>
        <GamesThisWeek />
      </Suspense>

      {/* Life at the club: full-width slideshow (same background as the feedback section below) */}
      <section className="py-16 md:py-24">
        <Container>
          <Heading className="text-brand">Life at the Club</Heading>
        </Container>
        <Carousel
          label="Life at the club photos"
          autoPlayMs={6000}
          bars="overlay"
          className="mt-10"
          controlsClassName="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
          slides={lifeAtTheClub.map((image) => (
            <Photo
              key={image.src}
              image={image}
              sizes="100vw"
              className="h-[60svh] max-h-[44rem] min-h-[20rem] w-full md:h-[75svh]"
            />
          ))}
        />
      </section>

      {/* Feedback */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="relative isolate grid gap-10 overflow-hidden rounded-[var(--radius-card)] bg-brand px-6 py-12 text-white sm:px-10 md:px-14 md:py-16 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG */}
            <img
              src="/volleyball.svg"
              alt=""
              aria-hidden="true"
              className="absolute -bottom-24 -left-20 -z-10 size-80 opacity-20 md:size-[28rem]"
            />
            <div>
              <Heading>Send Us Feedback</Heading>
              <p className="mt-5 text-lg text-white/85">
                Ideas, questions or something we could do better? Let the committee know.
              </p>
            </div>
            <FeedbackForm />
          </div>
        </Container>
      </section>
    </>
  );
}
