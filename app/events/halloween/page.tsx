import type { CSSProperties } from "react";
import { ArrowLeft } from "lucide-react";
import { events } from "@/content/events";
import { halloween } from "@/content/halloween";
import { site } from "@/content/site";
import { formatEventDate } from "@/lib/events";
import { pixelFont } from "@/lib/fonts/pixel";
import { spookyFont } from "@/lib/fonts/spooky";
import { pageMetadata } from "@/lib/metadata";
import { Carousel } from "@/components/Carousel";
import { PixelArt, bat, ghost, moon, pumpkin } from "@/components/PixelArt";
import { PixelButton } from "@/components/PixelButton";
import { Photo } from "@/components/Photo";
import { WithPlaceholders } from "@/components/Placeholder";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { Container, Heading } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Halloween Social",
  description: "Photos from the UCL Volleyball Halloween social.",
  path: "/events/halloween",
});

// The Halloween social, in the archive. Its own night-time look: purple-black, pumpkin
// orange and bone white, with a pumpkin cursor (see VolleyballCursor).
export default function HalloweenPage() {
  const event = events.find((e) => e.page === "/events/halloween");
  const date = event && formatEventDate(event.date);

  return (
    <div className="bg-night text-bone">
      <section className="relative isolate overflow-hidden">
        <Moon />
        <Bats />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-pumpkin/25 via-pumpkin/5 to-transparent"
        />
        <Container className="pt-28 pb-10 md:pt-40 md:pb-14">
          <TransitionLink
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-bone/75 hover:text-bone"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All Events
          </TransitionLink>
          {date && (
            <p className={`${pixelFont.className} mt-8 text-xs leading-relaxed text-pumpkin sm:text-sm`}>
              Past event · {date.weekday} {date.day} {date.month} {date.year}
            </p>
          )}
          <h1
            className={`${spookyFont.className} mt-4 max-w-3xl text-[clamp(3.5rem,15vw,9rem)] leading-[0.9] text-pumpkin [text-shadow:0_0_40px_rgba(255,122,26,0.45)]`}
          >
            Halloween Social
          </h1>
          <p className="mt-6 max-w-xl text-lg text-bone/90 md:text-xl">{halloween.intro}</p>
          <p className="mt-4 max-w-xl text-bone/75">
            <WithPlaceholders text={halloween.recap} tone="light" />
          </p>
        </Container>
        <Pumpkins />
      </section>

      <section className="bg-night-2 py-16 md:py-24">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <Heading>Photos From the Night</Heading>
            <PixelArt
              sprite={ghost}
              className="w-16 shrink-0 opacity-90 motion-safe:animate-[mo-bob_1.6s_steps(2)_infinite] md:w-24"
            />
          </div>
          <div className="mt-8 border-4 border-pumpkin shadow-[10px_10px_0_var(--color-candle)]">
            <Carousel
              label="Halloween social photos"
              autoPlayMs={5000}
              bars="overlay"
              theme="halloween"
              controlsClassName="px-3"
              className="pb-3"
              slides={halloween.photos.map((photo, i) => (
                <Photo
                  key={photo.src}
                  image={photo}
                  sizes="(min-width: 1152px) 1088px, 100vw"
                  preload={i === 0}
                  className="aspect-[4/3] w-full sm:aspect-[16/9]"
                />
              ))}
            />
          </div>
        </Container>
      </section>

      <section className="border-t-4 border-pumpkin/30 py-16 md:py-20">
        <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Heading>Don&apos;t Miss the Next One</Heading>
            <p className="mt-3 text-lg text-bone/80">
              New socials are announced in our WhatsApp group first.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <PixelButton href={site.whatsappUrl} variant="pumpkin">
              Join our WhatsApp
            </PixelButton>
            <PixelButton href="/events" variant="ghost">
              Upcoming Events
            </PixelButton>
          </div>
        </Container>
      </section>
    </div>
  );
}

// A pixel full moon, to match the bats and pumpkins. Purely decorative.
function Moon() {
  return (
    <PixelArt
      sprite={moon}
      className="absolute -top-12 -right-12 -z-10 size-48 drop-shadow-[0_0_40px_rgba(245,236,215,0.25)] md:top-24 md:right-[7%] md:size-80"
    />
  );
}

// Pixel bats flapping across the sky (they stay still when "reduce motion" is on).
function Bats() {
  const flock = [
    { top: "18%", size: "w-12 md:w-16", duration: "14s", delay: "0s" },
    { top: "32%", size: "w-8 md:w-10", duration: "18s", delay: "-6s" },
    { top: "12%", size: "w-6 md:w-8", duration: "22s", delay: "-13s" },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {flock.map((b) => (
        <div
          key={b.top}
          className="absolute left-0 translate-x-[70vw] motion-safe:animate-[bat-fly_var(--d)_linear_infinite]"
          style={{ top: b.top, "--d": b.duration, animationDelay: b.delay } as CSSProperties}
        >
          <PixelArt
            sprite={bat}
            className={`${b.size} motion-safe:animate-[bat-flap_0.3s_steps(1)_infinite]`}
          />
        </div>
      ))}
    </div>
  );
}

// A row of glowing jack-o'-lanterns along the bottom of the header.
function Pumpkins() {
  const row = [
    { size: "w-12 md:w-16", delay: "0s" },
    { size: "w-20 md:w-28", delay: "-0.4s" },
    { size: "w-14 md:w-20", delay: "-0.9s" },
    { size: "hidden w-16 sm:block md:w-24", delay: "-0.2s" },
    { size: "hidden w-10 md:block md:w-14", delay: "-0.7s" },
  ];
  return (
    <div aria-hidden="true" className="flex items-end justify-center gap-6 pb-8 md:gap-12 md:pb-12">
      {row.map((p, i) => (
        <div key={i} className={`relative ${p.size}`}>
          <span
            className="absolute inset-[-30%] rounded-full bg-pumpkin/35 blur-2xl motion-safe:animate-[flicker_1.4s_steps(3)_infinite]"
            style={{ animationDelay: p.delay }}
          />
          <PixelArt sprite={pumpkin} className="relative w-full" />
        </div>
      ))}
    </div>
  );
}
