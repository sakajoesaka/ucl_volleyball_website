"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";

// A loose scatter of offsets and tilts so the options look tossed down rather than listed.
// Fixed values (not Math.random) so the server and browser render the same layout.
const scatter = [
  { x: "0rem", y: "0rem", rotate: -3 },
  { x: "5rem", y: "-0.25rem", rotate: 2.5 },
  { x: "1.5rem", y: "0.5rem", rotate: -1.5 },
  { x: "7rem", y: "0.5rem", rotate: 4 },
  { x: "3rem", y: "0.75rem", rotate: -2.5 },
  { x: "6rem", y: "0rem", rotate: 1.5 },
];

// The socials and trips, scattered like stickers. Choosing one swaps the photos shown beside it.
export function SocialGallery({ names, panels }: { names: string[]; panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between options, as expected for tabs.
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + names.length) % names.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-12">
      <div
        role="tablist"
        aria-label="Socials and trips"
        aria-orientation="vertical"
        className="flex flex-wrap gap-x-3 gap-y-4 py-2 lg:flex-col lg:items-start lg:gap-5"
      >
        {names.map((name, i) => {
          const selected = i === active;
          return (
            <button
              key={name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`social-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="social-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              style={
                {
                  "--x": scatter[i % scatter.length].x,
                  "--y": scatter[i % scatter.length].y,
                  rotate: selected ? "0deg" : `${scatter[i % scatter.length].rotate}deg`,
                } as CSSProperties
              }
              className={`rounded-full px-5 py-2.5 text-left font-medium shadow-sm transition-[background-color,color,rotate,scale] duration-300 ease-[var(--ease-snap)] lg:translate-x-[var(--x)] lg:translate-y-[var(--y)] lg:px-6 lg:py-3 lg:text-lg ${
                selected
                  ? "scale-105 bg-brand text-white"
                  : "bg-lilac-100 text-brand hover:scale-105 hover:bg-lilac-200"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>
      <div
        id="social-panel"
        role="tabpanel"
        aria-labelledby={`social-tab-${active}`}
        key={active}
        className="motion-safe:animate-[fade-in_300ms_ease-out]"
      >
        {panels[active]}
      </div>
    </div>
  );
}
