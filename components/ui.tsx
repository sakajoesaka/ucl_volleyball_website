import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/transition/TransitionLink";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

const headingSizes = {
  xl: "text-[2.5rem] sm:text-5xl md:text-6xl",
  lg: "text-3xl md:text-[2.75rem]",
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

// The first block on every page except Home, with the gap below the menu bar built in.
export function PageHeader({ title, intro }: { title: string; intro?: ReactNode }) {
  return (
    <Container className="pt-12 pb-10 md:pt-20 md:pb-14">
      <div aria-hidden="true" className="mb-5 h-1.5 w-14 rounded-full bg-lilac" />
      <Heading as="h1" size="xl" className="text-brand">
        {title}
      </Heading>
      {intro && <p className="mt-5 max-w-2xl text-lg text-muted md:text-xl">{intro}</p>}
    </Container>
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
