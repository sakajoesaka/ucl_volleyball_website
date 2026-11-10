import { captains, committee, panelPhoto, type CommitteeMember } from "@/content/committee";
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
        <h2 className="sr-only">Committee</h2>
        <MemberCards members={committee} />
        <Heading className="mt-16 mb-10 md:mt-24">Captains</Heading>
        <MemberCards members={captains} />
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
      panelPhotos={members.map((member) => (
        <Photo
          key={member.image.src}
          image={panelPhoto(member)}
          sizes="(min-width: 640px) 512px, 100vw"
          className="aspect-[16/9] sm:aspect-[2/1]"
        />
      ))}
    />
  );
}
