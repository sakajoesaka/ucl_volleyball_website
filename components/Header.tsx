"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { images } from "@/content/images";
import { navLinks, site } from "@/content/site";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { ButtonLink, Circles } from "@/components/ui";
import { BrandIcon } from "@/components/BrandIcon";
import { activeSocials } from "@/content/socials";

// No top bar: the logo floats at the top of the page and a round menu button stays
// pinned to the corner, opening a full-screen menu. More of the screen for the page itself.
const instagram = activeSocials.find((s) => s.platform === "instagram");

export function Header() {
  const pathname = usePathname();
  // Remember which page the menu was opened on, so it closes itself after navigating.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      // Return focus to the menu button when the menu closes.
      if (wasOpen.current) menuButton.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    firstLink.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div id="site-nav">
      <TransitionLink
        href="/"
        onClick={close}
        className="absolute top-4 left-4 z-40 rounded-full shadow-[0_4px_20px_rgba(28,8,50,0.25)] md:top-6 md:left-8"
      >
        <Image src={images.logo.src} alt="" width={64} height={64} preload className="size-14 md:size-16" />
        <span className="sr-only">{site.name} home</span>
      </TransitionLink>

      <button
        ref={menuButton}
        type="button"
        onClick={() => setOpenOn(open ? null : pathname)}
        aria-expanded={open}
        aria-controls="site-menu"
        className="fixed top-4 right-4 z-[60] flex size-14 items-center justify-center rounded-full bg-white text-brand-950 shadow-[0_4px_20px_rgba(28,8,50,0.25)] transition-colors hover:bg-lilac-100 md:top-6 md:right-8 md:size-16"
      >
        {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        id="site-menu"
        inert={!open}
        className={`fixed inset-0 z-50 isolate overflow-y-auto bg-band transition-[opacity,scale] duration-300 ease-[var(--ease-snap)] ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-[1.02] opacity-0"
        }`}
      >
        <Circles />
        <nav
          aria-label="Main"
          className="mx-auto flex min-h-full max-w-6xl flex-col px-4 pt-28 pb-10 sm:px-6 md:pt-36 lg:px-8"
        >
          {/* Each page is a light-blue pill with an arrow, so it reads as a link; the current page is filled in. */}
          <ul className="flex flex-col items-start gap-2 md:gap-3">
            {navLinks.map((link, i) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <TransitionLink
                    ref={i === 0 ? firstLink : undefined}
                    href={link.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`heading group -mx-3 inline-flex items-center gap-3 rounded-3xl px-3 py-1.5 text-[2.3rem] text-brand-950 transition-colors sm:text-6xl md:-mx-6 md:gap-5 md:rounded-full md:px-6 md:text-7xl ${
                      active ? "bg-sky-200" : "hover:bg-sky-100"
                    }`}
                  >
                    {link.label}
                    {active ? (
                      <span className="rounded-full bg-brand-950 px-3 py-1 font-sans text-xs font-semibold tracking-normal [word-spacing:normal] whitespace-nowrap text-white md:text-sm">
                        You&apos;re here
                      </span>
                    ) : (
                      <ArrowRight
                        className="size-7 shrink-0 text-brand transition-transform group-hover:translate-x-1.5 md:size-12"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    )}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-12 sm:flex-row sm:flex-wrap">
            <ButtonLink href={site.joinUrl}>Join the Society</ButtonLink>
            <ButtonLink
              href={site.whatsappUrl}
              variant="light"
              icon={<BrandIcon platform="whatsapp" className="size-5" />}
            >
              Join our WhatsApp
            </ButtonLink>
            {instagram && (
              <ButtonLink
                href={instagram.url}
                variant="light"
                icon={<BrandIcon platform="instagram" className="size-5" />}
              >
                Follow our Instagram
              </ButtonLink>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
