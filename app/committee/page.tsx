import { committeeGroups, type CommitteeMember } from "@/content/committee";
import { pageMetadata } from "@/lib/metadata";
import { CommitteeCards } from "@/components/CommitteeCards";
import { Photo } from "@/components/Photo";
import { Container, Heading, PageHeader } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Committee",
  description: "Meet the students on the UCL Volleyball committee and our team captains.",
  path: "/committee",
});

export default function CommitteePage() {
  return (
    <>
      <PageHeader backdrop="dots" title="Meet the Committee" intro="The students who run UCL Volleyball." />
      <Container className="py-16 md:py-24">
        {committeeGroups.map(({ heading, members }) => (
          <section key={heading ?? "committee"} className="mt-16 first:mt-0 md:mt-24">
            {heading ? (
              <Heading className="mb-10">{heading}</Heading>
            ) : (
              <h2 className="sr-only">Committee</h2>
            )}
            <MemberCards members={members} />
          </section>
        ))}
      </Container>
    </>
  );
}

function MemberCards({ members }: { members: CommitteeMember[] }) {
  return (
    <CommitteeCards
      members={members}
      photos={members.map((member) => (
        <Photo
          key={member.image.src}
          image={member.image}
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/5]"
        />
      ))}
    />
  );
}
