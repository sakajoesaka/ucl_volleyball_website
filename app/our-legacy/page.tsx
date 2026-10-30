import { Medal, Trophy } from "lucide-react";
import { teams } from "@/content/achievements";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { Container, Heading, PageHeader } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Our Legacy",
  description:
    "The story of UCL Volleyball since 1996, and the achievements of our men's, women's and mixed teams, from BUCS Beach national titles to Volleyball England Student Cup wins.",
  path: "/our-legacy",
});

export default function LegacyPage() {
  return (
    <>
      <PageHeader
        title="Our Legacy"
        intro={`Volleyball at UCL since ${site.foundedYear}: a club that wins trophies and makes friends for life.`}
      />

      <section className="pb-16 md:pb-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Photo
            image={images.teamHuddle}
            sizes="(min-width: 1024px) 560px, 100vw"
            preload
            className="aspect-[4/3] rounded-[var(--radius-card)]"
          />
          <div>
            <Heading className="text-brand">Our Story</Heading>
            <div className="mt-5 space-y-4 text-lg text-muted">
              <p>
                UCL Volleyball was founded in{" "}
                <strong className="font-semibold text-ink">{site.foundedYear}</strong> by a small group of
                students who loved the game. Since then it has grown into a large, lively community on campus.
              </p>
              <p>
                Today we balance competitive success with a welcoming social side. Our teams compete in
                university and London leagues, while players of every level train, play and socialise together
                each week.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <Heading className="text-brand">Achievements</Heading>
          <p className="mt-4 max-w-2xl text-lg text-muted">Highlights from each of our five teams.</p>

          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <li
                key={team.name}
                className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper"
              >
                <Photo
                  image={team.image}
                  sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                  className="aspect-[16/10]"
                />
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <Heading as="h3" size="md" className="text-ink">
                    {team.name}
                  </Heading>
                  {team.summary && <p className="mt-3 text-muted">{team.summary}</p>}
                  <ul className="mt-4 space-y-3">
                    {team.achievements.map((item) => (
                      <li key={item.text} className="flex gap-3">
                        <span
                          className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${
                            item.title ? "bg-brand text-lilac-200" : "bg-lilac-100 text-brand"
                          }`}
                        >
                          {item.title ? (
                            <Trophy className="size-3.5" aria-hidden="true" />
                          ) : (
                            <Medal className="size-3.5" aria-hidden="true" />
                          )}
                        </span>
                        <span className={item.title ? "font-semibold text-ink" : "text-ink/85"}>
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
