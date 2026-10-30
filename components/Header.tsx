"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { ButtonLink } from "@/components/ui";
import { BrandIcon } from "@/components/BrandIcon";

export function Header() {
  const pathname = usePathname();
  // Remember which page the menu was opened on, so it closes itself after navigating.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-[var(--header-h)] w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <TransitionLink
            href="/"
            onClick={close}
            className="flex items-center gap-2.5 text-lg font-extrabold text-brand [font-family:var(--font-display)] [font-stretch:110%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG */}
            <img src="/volleyball.svg" alt="" width={32} height={32} className="size-8" />
            {site.name}
          </TransitionLink>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <TransitionLink
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${
                        active ? "bg-lilac-100 text-brand" : "text-ink/80 hover:bg-lilac-50 hover:text-brand"
                      }`}
                    >
                      {link.label}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href={site.joinUrl} variant="primary" size="sm" className="hidden sm:inline-flex">
              Join
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpenOn(open ? null : pathname)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex size-11 items-center justify-center rounded-full text-brand hover:bg-lilac-100 lg:hidden"
            >
              {open ? (
                <X className="size-6" aria-hidden="true" />
              ) : (
                <Menu className="size-6" aria-hidden="true" />
              )}
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: its backdrop blur would otherwise trap this fixed panel inside it. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto bg-paper transition-[opacity,translate] duration-300 ease-[var(--ease-snap)] lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="px-4 pt-6 pb-10 sm:px-6">
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="border-b border-line">
                  <TransitionLink
                    href={link.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`heading flex items-center justify-between py-4 text-[1.75rem] ${active ? "text-brand" : "text-ink"}`}
                  >
                    {link.label}
                    {active && <span aria-hidden="true" className="size-2.5 rounded-full bg-lilac" />}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <ButtonLink href={site.joinUrl} variant="primary">
              Join the Society
            </ButtonLink>
            <ButtonLink
              href={site.whatsappUrl}
              variant="outline"
              icon={<BrandIcon platform="whatsapp" className="size-5" />}
            >
              Join our WhatsApp
            </ButtonLink>
          </div>
        </nav>
      </div>
    </>
  );
}
