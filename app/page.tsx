import { images, lifeAtTheClub } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { BrandIcon } from "@/components/BrandIcon";
import { Carousel } from "@/components/Carousel";
import { FeedbackForm } from "@/components/FeedbackForm";
import { ButtonLink, Container, Heading } from "@/components/ui";

export const metadata = pageMetadata({
  description: site.description,
  path: "/",
});

const stats = [
  { label: "Founded", value: String(site.foundedYear) },
  { label: "Teams", value: "5" },
  { label: "Members", value: site.memberCount },
  { label: "Membership starting from", value: `${site.membershipPrice}/year`, wide: true },
];

export default function HomePage() {
  return (
    <>
      {/* Hero: fills the first screen on phones, so both buttons show without scrolling. */}
      <section className="relative isolate flex min-h-svh items-end overflow-hidden bg-brand-900 md:min-h-[min(100svh,56rem)]">
        <Photo
          image={images.hero}
          sizes="100vw"
          preload
          className="absolute inset-0 -z-10"
          imgClassName="object-[28%_center] md:object-top"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950 via-brand-950/50 to-brand-950/5 md:bg-gradient-to-r md:from-brand-950/90 md:via-brand-950/40 md:to-transparent"
        />
        <Container className="pt-28 pb-10 md:pb-20">
          <p className="text-lg font-semibold text-lilac-200 md:text-xl">We are</p>
          <h1 className="heading mt-1 text-[clamp(2.25rem,11vw,7.5rem)] whitespace-nowrap text-white">
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

      {/* Welcome */}
      <section className="py-16 md:py-24">
        <Container>
          <Heading className="text-brand">Welcome to the Club</Heading>
          <p className="mt-5 max-w-3xl text-lg text-muted md:text-xl">
            UCL Volleyball is a welcoming, competitive and social club. Whether you&apos;re aiming for gold or
            just looking for great friends, you&apos;ll find your place here.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`flex flex-col rounded-2xl border border-line bg-white p-4 md:p-6 ${stat.wide ? "col-span-3 md:col-span-1" : ""}`}
              >
                <dt className="text-sm whitespace-nowrap text-muted">{stat.label}</dt>
                <dd className="heading mt-auto pt-1 text-3xl text-brand md:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Life at the club: full-width slideshow */}
      <section className="bg-white py-16 md:py-24">
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
      <section className="py-16 md:py-24">
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
