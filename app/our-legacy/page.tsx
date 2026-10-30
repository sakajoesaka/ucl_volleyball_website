import { teams } from "@/content/achievements";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { TeamCards } from "@/components/TeamCards";
import { ZoomOnScroll } from "@/components/ZoomOnScroll";
import { Container, Heading } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Our Legacy",
  description:
    "The story of UCL Volleyball since 1996, and the achievements of our men's, women's and mixed teams, from BUCS Beach national titles to Volleyball England Student Cup wins.",
  path: "/our-legacy",
});

export default function LegacyPage() {
  return (
    <>
      {/* The page title and our story, over a full-width photo */}
      <section className="relative isolate overflow-hidden bg-brand-950">
        <ZoomOnScroll className="absolute inset-0 -z-10 origin-[60%_40%]">
          <Photo
            image={images.teamHuddle}
            sizes="100vw"
            preload
            className="absolute inset-0"
            imgClassName="object-[60%_center]"
          />
        </ZoomOnScroll>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950 via-brand-950/75 to-brand-950/10 md:bg-gradient-to-r md:from-brand-950/95 md:via-brand-950/70 md:to-brand-950/5"
        />
        <Container className="flex min-h-svh items-end pt-28 pb-14 md:min-h-[min(100svh,56rem)] md:pb-24">
          <div className="max-w-2xl text-white">
            <Heading as="h1" size="xl">
              Our Legacy
            </Heading>
            <div className="mt-6 max-w-xl space-y-4 text-lg text-white/85">
              <p>
                UCL Volleyball was founded in{" "}
                <strong className="font-semibold text-white">{site.foundedYear}</strong> by a small group of
                students who loved the game. Since then it has grown into a large, lively community on campus.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <Heading className="text-brand">Achievements</Heading>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Highlights from each of our five teams. Tap a team to meet them.
          </p>
          <TeamCards
            teams={teams}
            cardPhotos={teams.map((team) => (
              <Photo
                key={team.name}
                image={team.image}
                sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                className="aspect-[16/10]"
              />
            ))}
            panelPhotos={teams.map((team) => (
              <Photo
                key={team.name}
                image={team.image}
                sizes="(min-width: 640px) 672px, 100vw"
                className="aspect-[16/9] sm:aspect-[2/1]"
              />
            ))}
          />
        </Container>
      </section>
    </>
  );
}
