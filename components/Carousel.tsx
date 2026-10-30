"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/use-media-query";

type CarouselProps = {
  slides: ReactNode[];
  // Read out by screen readers, e.g. "Life at the club photos".
  label: string;
  // Move to the next slide every this many milliseconds (off for "reduce motion").
  autoPlayMs?: number;
  className?: string;
  controlsClassName?: string;
};

// A swipeable slideshow. Uses native scroll snapping, so touch swiping feels natural.
export function Carousel({
  slides,
  label,
  autoPlayMs,
  className = "",
  controlsClassName = "",
}: CarouselProps) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useMediaQuery(REDUCED_MOTION);
  const count = slides.length;

  const goTo = useCallback(
    (target: number) => {
      const el = track.current;
      if (!el) return;
      const next = (target + count) % count;
      el.scrollTo({ left: next * el.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [count, reduceMotion],
  );

  useEffect(() => {
    if (!autoPlayMs || paused || reduceMotion || count < 2) return;
    const timer = setInterval(() => goTo(index + 1), autoPlayMs);
    return () => clearInterval(timer);
  }, [autoPlayMs, paused, reduceMotion, count, index, goTo]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={className}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
      onFocus={() => setPaused(true)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goTo(index - 1);
        if (e.key === "ArrowRight") goTo(index + 1);
      }}
    >
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

      {count > 1 && (
        <div className={`mt-5 flex items-center justify-between gap-4 ${controlsClassName}`}>
          <div className="flex flex-wrap gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === index}
                className="flex size-6 items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-brand" : "w-2 bg-brand/25"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
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
