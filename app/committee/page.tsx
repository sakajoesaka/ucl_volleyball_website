import { committee } from "@/content/committee";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { WithPlaceholders } from "@/components/Placeholder";
import { Container, PageHeader } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Committee",
  description: "Meet the students on the UCL Volleyball committee.",
  path: "/committee",
});

export default function CommitteePage() {
  return (
    <>
      <PageHeader backdrop="dots" title="Meet the Committee" intro="The students who run UCL Volleyball." />
      <Container className="py-16 md:py-24">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {committee.map((member) => (
            <li
              key={member.image.src}
              className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper"
            >
              <Photo
                image={member.image}
                sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/5]"
              />
              <div className="p-6">
                <p className="text-sm font-semibold text-brand">{member.role}</p>
                <h2 className="heading mt-2 text-2xl text-ink">
                  <WithPlaceholders text={member.name} />
                </h2>
                <dl className="mt-4 space-y-3">
                  <div>
                    <dt className="text-sm text-muted">Studies</dt>
                    <dd className="text-ink">
                      <WithPlaceholders text={member.course} />, {member.year}
                    </dd>
                  </div>
                  {member.position && (
                    <div>
                      <dt className="text-sm text-muted">Position</dt>
                      <dd className="text-ink">{member.position}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
