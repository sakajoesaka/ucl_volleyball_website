"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/use-media-query";

// Slowly zooms its contents in as the page scrolls, reaching `maxScale` after one screen height.
export function ZoomOnScroll({
  children,
  className = "",
  maxScale = 1.25,
}: {
  children: ReactNode;
  className?: string;
  maxScale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useMediaQuery(REDUCED_MOTION);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      el.style.transform = `scale(${1 + progress * (maxScale - 1)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, [reduceMotion, maxScale]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
