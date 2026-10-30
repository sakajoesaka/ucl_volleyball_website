import { ArrowRight, HeartHandshake, PartyPopper, Users } from "lucide-react";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { BrandIcon } from "@/components/BrandIcon";
import { FeedbackForm } from "@/components/FeedbackForm";
import { ButtonLink, Container, Heading } from "@/components/ui";

export const metadata = pageMetadata({
  description: site.description,
  path: "/",
});

const stats = [
  { label: "Founded", value: String(site.foundedYear) },
  { label: "Teams", value: "5" },
  { label: "Sessions a week", value: "3" },
  { label: "Membership", value: `${site.membershipPrice}/year` },
];

const reasons = [
  {
    icon: Users,
    title: "All Levels Welcome",
    text: "Complete beginner or seasoned player, there's a place for you. Lots of our members picked up a volleyball for the first time with us.",
  },
  {
    icon: HeartHandshake,
    title: "Strong Community",
    text: "A big, diverse club where you'll make friends on and off the court, from your first session to graduation and beyond.",
  },
  {
    icon: PartyPopper,
    title: "Socials & Trips",
    text: "Pub crawls, karaoke nights, tournaments, the annual Boat Ball and a beach volleyball trip to Portugal.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero: fills the first screen on phones, so both buttons show without scrolling. */}
      <section className="relative isolate flex min-h-[calc(100svh-var(--header-h))] items-end overflow-hidden bg-brand-900 md:min-h-[min(calc(100svh-var(--header-h)),52rem)]">
        <Photo
          image={images.hero}
          sizes="100vw"
          preload
          className="absolute inset-0 -z-10"
          imgClassName="object-[28%_center] md:object-top"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950 via-brand-950/60 to-brand-950/5 md:bg-gradient-to-r md:from-brand-950/90 md:via-brand-950/45 md:to-transparent"
        />
        <Container className="pt-24 pb-10 md:pb-20">
          <h1 className="heading text-[3.4rem] leading-[0.92] text-white sm:text-7xl md:text-8xl">
            UCL
            <br />
            Volleyball
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/90 md:text-xl">{site.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

      {/* Welcome */}
      <section className="py-16 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading className="text-brand">Welcome to the Club</Heading>
            <p className="mt-5 text-lg text-muted md:text-xl">
              UCL Volleyball is a welcoming, inclusive, competitive and social club. Whether you&apos;re
              aiming for gold or just looking for great friends, you&apos;ll find your place here.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-line bg-white p-5">
                  <dt className="text-sm text-muted">{stat.label}</dt>
                  <dd className="heading mt-1 text-3xl text-brand">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Photo
            image={images.teamCelebration}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/3] rounded-[var(--radius-card)]"
          />
        </Container>
      </section>

      {/* Why join */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <Heading className="text-brand">Why Join Us</Heading>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-[var(--radius-card)] border border-line bg-paper p-7">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-lilac-100 text-brand">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <Heading as="h3" size="md" className="mt-6 text-ink">
                  {title}
                </Heading>
                <p className="mt-3 text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <ButtonLink href="/what-we-offer" variant="outline" className="mt-10" icon={null}>
            See What We Offer
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </Container>
      </section>

      {/* Life at the club */}
      <section className="py-16 md:py-24">
        <Container>
          <Heading className="text-brand">Life at the Club</Heading>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Photo
              image={images.teamHuddle}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="aspect-[4/3] rounded-[var(--radius-card)] md:col-span-2 md:aspect-auto md:row-span-2"
            />
            <Photo
              image={images.beachTrip}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="aspect-[4/3] rounded-[var(--radius-card)]"
            />
            <Photo
              image={images.socialNight}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="aspect-[4/3] rounded-[var(--radius-card)]"
            />
          </div>
        </Container>
      </section>

      {/* WhatsApp */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-brand px-6 py-12 text-white sm:px-10 md:px-14 md:py-16">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG */}
            <img
              src="/volleyball.svg"
              alt=""
              aria-hidden="true"
              className="absolute -right-16 -bottom-20 -z-10 size-72 opacity-25 md:-right-10 md:size-96"
            />
            <Heading>Join Our WhatsApp</Heading>
            <p className="mt-4 max-w-xl text-lg text-white/85">
              Session tickets, match updates and social plans all go out in our WhatsApp group first.
              It&apos;s the best way to stay in the loop.
            </p>
            <ButtonLink
              href={site.whatsappUrl}
              variant="light"
              className="mt-8"
              icon={<BrandIcon platform="whatsapp" className="size-5" />}
            >
              Join our WhatsApp
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Feedback */}
      <section className="bg-white py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Heading className="text-brand">Send Us Feedback</Heading>
            <p className="mt-5 text-lg text-muted">
              Ideas, questions or something we could do better? Let the committee know.
            </p>
          </div>
          <FeedbackForm />
        </Container>
      </section>
    </>
  );
}
