import { ArrowLeft } from "lucide-react";
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
  description: `UCL Volleyball is raising money for men's health this Movember. See how close we are to our goal and donate.`,
  path: "/events/movember",
});

const waysToHelp = [
  {
    title: "Grow a Mo",
    text: "Start clean-shaven on 1 November and grow a moustache all month. Ask friends and family to sponsor it.",
  },
  {
    title: "Move",
    text: "Walk or run 60km over the month, for the 60 men lost to suicide every hour around the world.",
  },
  {
    title: "Donate",
    text: "Can't grow one? Add to the team total instead. Donations go to Movember's work on men's mental health, suicide prevention, and prostate and testicular cancer.",
  },
];

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
            sprite={moustache("#ffffff", "#c08a5a")}
            className="mx-auto w-3/4 max-w-sm motion-safe:animate-[mo-bob_1.2s_steps(2)_infinite] md:w-full"
          />
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <Heading>Our Fundraising</Heading>
          <p className="mt-4 max-w-2xl text-lg text-mo-black/75">
            Every donation moves the bar. Help us reach the goal before the end of November.
          </p>
          <div className="mt-10">
            <DonationBar
              raised={movember.raised}
              goal={movember.goal}
              placeholder={movember.figuresArePlaceholders}
            />
          </div>
          <div className="mt-10">
            <PixelButton href={movember.donateUrl} variant="dark">
              Donate to Our Team
            </PixelButton>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <Heading>How to Get Involved</Heading>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {waysToHelp.map((way, i) => (
              <li
                key={way.title}
                className="border-4 border-mo-black bg-mo-cream p-6 shadow-[8px_8px_0_var(--color-mo-brown)] md:p-7"
              >
                <p className={`${pixelFont.className} text-xs text-mo-brown`}>0{i + 1}</p>
                <Heading as="h3" size="md" className="mt-3">
                  {way.title}
                </Heading>
                <p className="mt-3 text-mo-black/80">{way.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-lg">
            Find out more about the charity at{" "}
            <a
              href={movember.movemberUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-mo-brown decoration-2 underline-offset-4 hover:text-mo-brown"
            >
              movember.com<span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </Container>
      </section>
    </div>
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
