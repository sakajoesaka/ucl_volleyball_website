"use client";

import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/use-media-query";

type CarouselProps = {
  slides: ReactNode[];
  // Read out by screen readers, e.g. "Life at the club photos".
  label: string;
  // Move to the next slide every this many milliseconds (off for "reduce motion").
  autoPlayMs?: number;
  // "overlay": story-style progress bars on top of the slides (for photos). "below": under them.
  bars?: "overlay" | "below";
  className?: string;
  controlsClassName?: string;
  // Colours for the previous/next buttons.
  theme?: keyof typeof controlThemes;
};

const controlThemes = {
  brand: {
    prev: "rounded-full border-2 border-brand/15 text-brand hover:border-brand hover:bg-white",
    next: "rounded-full bg-brand text-white hover:bg-brand-800",
  },
  // Square, on a dark background, for the Halloween page.
  halloween: {
    prev: "border-2 border-bone/40 text-bone hover:border-bone hover:bg-white/5",
    next: "bg-pumpkin text-night hover:bg-candle",
  },
};

// Lets something inside a slide know whether its slide is the one showing,
// e.g. so an expanded panel can close itself when you move on.
export const SlideActiveContext = createContext(true);

// A swipeable slideshow with story-style progress bars. Uses native scroll snapping,
// so touch swiping feels natural. Autoplay pauses on hover, touch and keyboard focus.
export function Carousel({
  slides,
  label,
  autoPlayMs,
  bars = "below",
  className = "",
  controlsClassName = "",
  theme = "brand",
}: CarouselProps) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useMediaQuery(REDUCED_MOTION);
  const count = slides.length;
  const autoPlaying = !!autoPlayMs && !reduceMotion && count > 1;

  // Every slide is as tall as the tallest one. Parts marked `data-collapsible` (like the session
  // times) don't count, so opening one only makes its own slide taller.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const wrappers = Array.from(el.children) as HTMLElement[];
    const equalise = () => {
      wrappers.forEach((w) => (w.style.minHeight = ""));
      const open = wrappers.map((w) =>
        Array.from(w.querySelectorAll<HTMLElement>("[data-collapsible]")).reduce(
          (sum, part) => sum + part.offsetHeight,
          0,
        ),
      );
      const tallest = Math.max(...wrappers.map((w, i) => w.offsetHeight - open[i]));
      wrappers.forEach((w, i) => (w.style.minHeight = `${tallest + open[i]}px`));
    };
    const observer = new ResizeObserver(equalise);
    // Watch the slides for width changes, and the collapsible parts as they open and close
    // (a slide's own height can't shrink while its minimum height holds it open).
    wrappers.forEach((w) => w.firstElementChild && observer.observe(w.firstElementChild));
    el.querySelectorAll("[data-collapsible]").forEach((part) => observer.observe(part));
    return () => observer.disconnect();
  }, [count]);

  const goTo = useCallback(
    (target: number) => {
      const el = track.current;
      if (!el) return;
      const next = (target + count) % count;
      el.scrollTo({ left: next * el.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [count, reduceMotion],
  );

  const light = bars === "overlay";
  const progress = (
    <div className="flex flex-1 gap-1.5">
      {slides.map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Show slide ${i + 1}`}
          aria-current={i === index}
          className="flex-1 py-2.5"
        >
          <span className={`block h-1 overflow-hidden rounded-full ${light ? "bg-white/40" : "bg-brand/15"}`}>
            <span
              // A new key restarts the fill animation each time this bar becomes current.
              key={i === index ? `active-${index}` : i}
              className={`block h-full rounded-full ${light ? "bg-white" : "bg-brand"}`}
              style={
                i < index
                  ? { width: "100%" }
                  : i > index
                    ? { width: 0 }
                    : autoPlaying
                      ? {
                          animation: `bar-fill ${autoPlayMs}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }
                      : { width: "100%" }
              }
              // The slideshow moves on when the current bar finishes filling.
              onAnimationEnd={() => goTo(index + 1)}
            />
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={className}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goTo(index - 1);
        if (e.key === "ArrowRight") goTo(index + 1);
      }}
    >
      <div className="relative">
        <div
          ref={track}
          onScroll={(e) => {
            const el = e.currentTarget;
            setIndex(Math.round(el.scrollLeft / el.clientWidth));
          }}
          className="flex snap-x snap-mandatory items-start overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              inert={i !== index}
              className="flex w-full shrink-0 snap-center flex-col"
            >
              <SlideActiveContext value={i === index}>{slide}</SlideActiveContext>
            </div>
          ))}
        </div>
        {count > 1 && light && (
          <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/35 to-transparent pb-8">
            <div className={`pointer-events-auto flex pt-2 ${controlsClassName}`}>{progress}</div>
          </div>
        )}
      </div>

      {count > 1 && (
        <div className={`mt-5 flex items-center justify-between gap-6 ${controlsClassName}`}>
          {light ? <span /> : progress}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className={`flex size-11 items-center justify-center transition-colors ${controlThemes[theme].prev}`}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
              <span className="sr-only">Previous slide</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className={`flex size-11 items-center justify-center transition-colors ${controlThemes[theme].next}`}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
              <span className="sr-only">Next slide</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
