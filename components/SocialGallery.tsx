"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

// A row of socials and trips. Choosing one swaps the photos shown beside it.
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
        className="flex flex-wrap gap-2.5 lg:flex-col lg:items-start"
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
              className={`rounded-full px-5 py-2.5 text-left font-medium transition-colors duration-200 ${
                selected ? "bg-brand text-white" : "bg-lilac-100 text-brand hover:bg-lilac-200"
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
