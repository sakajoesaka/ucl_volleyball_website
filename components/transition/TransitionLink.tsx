"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { usePageTransition } from "./TransitionProvider";

// A drop-in replacement for next/link that plays the spike transition.
// onNavigate only fires for normal left-clicks, so new-tab clicks behave as usual.
export function TransitionLink({ href, onNavigate, ...props }: ComponentProps<typeof Link>) {
  const { navigate } = usePageTransition();

  return (
    <Link
      href={href}
      onNavigate={(event) => {
        onNavigate?.(event);
        if (typeof href === "string" && navigate(href)) event.preventDefault();
      }}
      {...props}
    />
  );
}
