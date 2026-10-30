"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { images } from "@/content/images";
import { navLinks, site } from "@/content/site";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { ButtonLink, Circles } from "@/components/ui";
import { BrandIcon } from "@/components/BrandIcon";
import { SocialIcons } from "@/components/SocialIcons";

// No top bar: the logo floats at the top of the page and a round menu button stays
// pinned to the corner, opening a full-screen menu. More of the screen for the page itself.
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
          <ul className="flex flex-col gap-1 md:gap-2">
            {navLinks.map((link, i) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <TransitionLink
                    ref={i === 0 ? firstLink : undefined}
                    href={link.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className="heading group inline-flex items-center gap-4 py-1 text-[2.6rem] text-brand-950 transition-colors hover:text-brand sm:text-6xl md:text-7xl"
                  >
                    {link.label}
                    {active && <span aria-hidden="true" className="size-3 rounded-full bg-brand md:size-4" />}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex flex-col gap-6 pt-12 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={site.joinUrl}>Join the Society</ButtonLink>
              <ButtonLink
                href={site.whatsappUrl}
                variant="light"
                icon={<BrandIcon platform="whatsapp" className="size-5" />}
              >
                Join our WhatsApp
              </ButtonLink>
            </div>
            <SocialIcons />
          </div>
        </nav>
      </div>
    </div>
  );
}
