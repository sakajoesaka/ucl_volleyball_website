"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
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
};

// A swipeable slideshow with story-style progress bars. Uses native scroll snapping,
// so touch swiping feels natural. Autoplay pauses on hover, touch and keyboard focus.
export function Carousel({
  slides,
  label,
  autoPlayMs,
  bars = "below",
  className = "",
  controlsClassName = "",
}: CarouselProps) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useMediaQuery(REDUCED_MOTION);
  const count = slides.length;
  const autoPlaying = !!autoPlayMs && !reduceMotion && count > 1;

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
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              inert={i !== index}
              className="w-full shrink-0 snap-center"
            >
              {slide}
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
              className="flex size-11 items-center justify-center rounded-full border-2 border-brand/15 text-brand transition-colors hover:border-brand hover:bg-white"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
              <span className="sr-only">Previous slide</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="flex size-11 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-800"
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
