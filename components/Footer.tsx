import { images } from "@/content/images";
import { navLinks, site } from "@/content/site";
import { Photo } from "@/components/Photo";
import { SocialIcons } from "@/components/SocialIcons";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { Container } from "@/components/ui";

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-950 text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div>
          <div className="flex items-center gap-4">
            <Photo image={images.logo} sizes="64px" className="size-16 shrink-0 rounded-full bg-white/80" />
            <p className="heading text-2xl">{site.fullName}</p>
          </div>
          <p className="mt-5 max-w-sm text-white/75">
            Volleyball at University College London since {site.foundedYear}. Competitive, social and open to
            everyone.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-semibold text-lilac-300">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <TransitionLink href={link.href} className="text-white/80 transition-colors hover:text-white">
                  {link.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold text-lilac-300">Follow Us</p>
          <SocialIcons tone="light" className="mt-4" />
          <a
            href={site.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-medium text-white underline decoration-lilac decoration-2 underline-offset-4 hover:text-lilac-300"
          >
            Join the Society<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-6 text-sm text-white/60">{site.copyright}</Container>
      </div>
    </footer>
  );
}
