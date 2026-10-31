import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/transition/TransitionLink";

const variants = {
  // Movember: black, brown and white.
  light: "border-mo-black bg-white text-mo-black shadow-[4px_4px_0_var(--color-mo-brown)]",
  dark: "border-mo-black bg-mo-black text-white shadow-[4px_4px_0_var(--color-mo-brown)]",
  outline: "border-white text-white shadow-[4px_4px_0_var(--color-mo-brown)] hover:bg-white/10",
  // Halloween: pumpkin orange on night purple.
  pumpkin: "border-night bg-pumpkin text-night shadow-[4px_4px_0_var(--color-candle)] hover:bg-candle",
  ghost: "border-bone text-bone shadow-[4px_4px_0_var(--color-pumpkin)] hover:bg-white/10",
};

// Square, chunky buttons that press down when clicked, for the themed event pages' game look.
// Links starting with "/" stay on the site (with the page transition); others open in a new tab.
export function PixelButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: keyof typeof variants;
  children: ReactNode;
}) {
  const className = `inline-flex min-h-12 items-center justify-center gap-2 self-start border-4 px-6 py-3 font-semibold transition-[translate,box-shadow,background-color] duration-100 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none ${variants[variant]}`;

  if (href.startsWith("/")) {
    return (
      <TransitionLink href={href} className={className}>
        {children}
        <ArrowRight className="size-4" aria-hidden="true" />
      </TransitionLink>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight className="size-4 opacity-70" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
