import { faqs } from "@/content/faqs";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { FaqList } from "@/components/FaqList";
import { ButtonLink, Container, Heading, PageHeader } from "@/components/ui";
import { BrandIcon } from "@/components/BrandIcon";

export const metadata = pageMetadata({
  title: "FAQs",
  description: `How to join UCL Volleyball, what the ${site.membershipName} costs, how to book indoor sessions and more.`,
  path: "/faqs",
});

// Lets Google show these questions directly in search results.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
  })),
};

export default function FaqsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <PageHeader
        title="Frequently Asked Questions"
        intro="Everything you need to know about joining and playing with UCL Volleyball."
      />
      <Container className="py-16 md:py-24">
        <div>
          <FaqList faqs={faqs} />
        </div>
        <div className="mt-12 rounded-[var(--radius-card)] bg-lilac-100 p-7 md:p-9">
          <Heading size="md" className="text-brand">
            Still Have a Question?
          </Heading>
          <p className="mt-3 text-muted">
            Ask in our WhatsApp group and someone from the committee will help.
          </p>
          <ButtonLink
            href={site.whatsappUrl}
            className="mt-6"
            icon={<BrandIcon platform="whatsapp" className="size-5" />}
          >
            Join our WhatsApp
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
