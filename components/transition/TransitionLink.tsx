"use client";

import Link from "next/link";
import { useRef, type ComponentProps } from "react";
import { usePageTransition } from "./TransitionProvider";

// A drop-in replacement for next/link that plays the volleyball transition from the click point.
// onNavigate only fires for normal left-clicks, so new-tab clicks behave as usual.
export function TransitionLink({ href, onClick, onNavigate, ...props }: ComponentProps<typeof Link>) {
  const { navigate } = usePageTransition();
  const clickPoint = useRef<{ x: number; y: number } | null>(null);

  return (
    <Link
      href={href}
      onClick={(event) => {
        // `detail` is 0 for keyboard "clicks" (Enter), which have no real position.
        clickPoint.current = event.detail > 0 ? { x: event.clientX, y: event.clientY } : null;
        onClick?.(event);
      }}
      onNavigate={(event) => {
        onNavigate?.(event);
        if (typeof href === "string" && navigate(href, clickPoint.current)) event.preventDefault();
      }}
      {...props}
    />
  );
}
