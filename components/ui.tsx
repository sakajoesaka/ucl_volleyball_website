import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/transition/TransitionLink";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

const headingSizes = {
  xl: "text-[2.9rem] sm:text-6xl md:text-7xl lg:text-8xl",
  lg: "text-[2rem] md:text-5xl",
  md: "text-xl md:text-2xl",
};

// The single heading style used across the site. `as` sets the HTML level, `size` the look.
export function Heading({
  as: Tag = "h2",
  size = "lg",
  className = "",
  id,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  size?: keyof typeof headingSizes;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className={`heading ${headingSizes[size]} ${className}`}>
      {children}
    </Tag>
  );
}

// Big overlapping background circles (they double as volleyballs). Purely decorative.
export function Circles({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div className="absolute -top-[30%] right-[-12%] aspect-square w-[min(70vw,40rem)] rounded-full bg-blush/70" />
      <div className="absolute bottom-[-55%] left-[-18%] aspect-square w-[min(80vw,34rem)] rounded-full bg-blush/50" />
      <div className="absolute top-[35%] right-[22%] hidden aspect-square w-[16rem] rounded-full bg-lilac/25 md:block" />
    </div>
  );
}

// Each page's title band gets its own backdrop, all in the same palette.
const backdrops = {
  // Overlapping arcs rising from the bottom right.
  arcs: (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-blush">
      <div className="absolute right-[-10%] bottom-[-14%] size-[46vw] rounded-full bg-brand md:right-[-12%] md:bottom-[-95%] md:size-[44rem]" />
      <div className="absolute right-[30%] bottom-[-18%] size-[30vw] rounded-full bg-lilac md:right-[12%] md:bottom-[-85%] md:size-[28rem]" />
      <div className="absolute top-[-40%] left-[-12%] aspect-square w-[60vw] rounded-full bg-band/70 md:w-[24rem]" />
    </div>
  ),
  // Ripple rings, like a ball landing on the court.
  rings: (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-band">
      <div className="absolute right-[-40%] bottom-[-45%] size-[24rem] md:top-1/2 md:right-[-8%] md:bottom-auto md:size-[44rem] md:-translate-y-1/2">
        {[100, 74, 48].map((size) => (
          <div
            key={size}
            className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.25rem] border-blush md:border-[2.25rem]"
            style={{ width: `${size}%` }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 size-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
      </div>
    </div>
  ),
  // Scattered dots of different sizes.
  dots: (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-lilac-100"
    >
      <div className="absolute top-[-30%] right-[-20%] aspect-square w-[80vw] rounded-full bg-blush/60 md:right-[-5%] md:w-[34rem]" />
      {[
        "top-[18%] right-[14%] hidden size-36 bg-brand md:block",
        "top-[64%] right-[22%] hidden size-16 bg-lilac md:block",
        "top-[10%] right-[40%] hidden size-10 bg-band md:block",
        "bottom-[5%] right-[6%] size-16 bg-brand md:size-24 md:bg-band",
        "bottom-[13%] right-[34%] size-8 bg-lilac md:hidden",
        "bottom-[4%] right-[58%] size-5 bg-band md:hidden",
      ].map((dot) => (
        <div key={dot} className={`absolute rounded-full ${dot}`} />
      ))}
    </div>
  ),
};

// The first block on pages without a photo header: a coloured band with a big title.
// The top padding leaves room for the floating logo and menu button.
export function PageHeader({
  title,
  intro,
  backdrop,
}: {
  title: string;
  intro?: ReactNode;
  backdrop: keyof typeof backdrops;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      {backdrops[backdrop]}
      {/* Extra room at the bottom on phones keeps the shapes clear of the text. */}
      <Container className="pt-28 pb-32 md:pt-40 md:pb-20">
        <Heading as="h1" size="xl" className="max-w-4xl text-brand-950">
          {title}
        </Heading>
        {intro && <p className="mt-6 max-w-2xl text-lg text-brand-950/80 md:text-xl">{intro}</p>}
      </Container>
    </section>
  );
}

const buttonVariants = {
  primary: "bg-brand text-white hover:bg-brand-800",
  lilac: "bg-lilac text-brand-950 hover:bg-lilac-300",
  light: "bg-white text-brand hover:bg-lilac-100",
  outlineLight: "border-2 border-white/80 text-white hover:bg-white hover:text-brand",
  outline: "border-2 border-brand/20 text-brand hover:border-brand hover:bg-white",
};

const buttonSizes = {
  md: "min-h-12 px-6 py-3 text-base",
  sm: "min-h-10 px-5 py-2 text-sm",
};

// A button-styled link. External links open in a new tab; internal ones play the page transition.
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
}: {
  href: string;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 ${buttonSizes[size]} ${buttonVariants[variant]} ${className}`;

  if (href.startsWith("/")) {
    return (
      <TransitionLink href={href} className={classes}>
        {icon}
        {children}
      </TransitionLink>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {icon}
      {children}
      <ArrowUpRight className="size-4 opacity-70" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
