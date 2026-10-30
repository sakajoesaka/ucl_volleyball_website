import { ButtonLink, Container, Heading } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 md:py-32">
      <p className="heading text-7xl text-lilac">Out!</p>
      <Heading as="h1" className="mt-4 text-brand">
        Page Not Found
      </Heading>
      <p className="mt-4 max-w-md text-lg text-muted">
        That one landed outside the court. Let&apos;s get you back in play.
      </p>
      <ButtonLink href="/" className="mt-8">
        Back to Home
      </ButtonLink>
    </Container>
  );
}
