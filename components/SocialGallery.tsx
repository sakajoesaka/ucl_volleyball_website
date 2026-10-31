"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { Beer, MicVocal, Ship, Sun, Trophy } from "lucide-react";
import type { SocialEvent } from "@/content/sessions";
import { chunkyFont } from "@/lib/fonts/chunky";

const icons = { sun: Sun, ship: Ship, trophy: Trophy, beer: Beer, mic: MicVocal };

// A loose scatter of offsets and tilts so the options look tossed down rather than listed.
// Fixed values (not Math.random) so the server and browser render the same layout.
const scatter = [
  { x: "0rem", y: "0rem", rotate: -3 },
  { x: "2.5rem", y: "-0.25rem", rotate: 2.5 },
  { x: "-2rem", y: "0.5rem", rotate: -1.5 },
  { x: "1.5rem", y: "0.5rem", rotate: 4 },
  { x: "-0.5rem", y: "0.75rem", rotate: -2.5 },
  { x: "2rem", y: "0rem", rotate: 1.5 },
];

type Item = Pick<SocialEvent, "name" | "description" | "icon">;

// The socials and trips, scattered like stickers. Choosing one swaps the photo,
// which is shown as a taped-down polaroid with a caption.
// `intro` (the heading and text) sits above the options, so on computers it's beside the photo.
export function SocialGallery({
  intro,
  items,
  panels,
}: {
  intro: ReactNode;
  items: Item[];
  panels: ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[active];
  const CurrentIcon = icons[current.icon];

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
    const next = (active + step + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-10">
      <div>
        {intro}
        <p
          aria-hidden="true"
          className={`${chunkyFont.className} mt-10 mb-4 flex -rotate-6 items-end justify-center gap-1 text-2xl text-lilac lg:mb-6 lg:justify-start`}
        >
          Pick one!
          {/* A hand-drawn arrow curling down towards the options */}
          <svg viewBox="0 0 60 40" className="h-8 w-12" fill="none" stroke="currentColor" strokeWidth="4">
            <path d="M4 8 C 30 0, 50 12, 44 34" strokeLinecap="round" />
            <path d="M34 26 L 44 35 L 52 24" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
        {/* On computers the options sit in the middle of the column, scattered either side. */}
        <div
          role="tablist"
          aria-label="Socials and trips"
          aria-orientation="vertical"
          className={`${chunkyFont.className} flex flex-wrap justify-center gap-x-3 gap-y-4 lg:flex-col lg:items-center lg:gap-5`}
        >
          {items.map((item, i) => {
            const selected = i === active;
            const Icon = icons[item.icon];
            const place = scatter[i % scatter.length];
            return (
              <button
                key={item.name}
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
                    "--x": place.x,
                    "--y": place.y,
                    rotate: selected ? "0deg" : `${place.rotate}deg`,
                  } as CSSProperties
                }
                className={`flex items-center gap-2.5 rounded-full py-2 pr-5 pl-2 text-left text-sm shadow-sm sm:text-base transition-[background-color,color,rotate,scale] duration-300 ease-[var(--ease-snap)] lg:translate-x-[var(--x)] lg:translate-y-[var(--y)] lg:py-2.5 lg:pr-6 ${
                  selected
                    ? "scale-105 bg-brand text-white"
                    : "bg-lilac-100 text-brand hover:scale-105 hover:bg-lilac-200"
                }`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full lg:size-9 ${
                    selected ? "bg-lilac text-brand-950" : "bg-white text-brand"
                  }`}
                >
                  <Icon className="size-4 lg:size-5" aria-hidden="true" />
                </span>
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
        {/* Tape holding the photo down, and a sticker for the chosen social */}
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 z-10 h-7 w-28 -translate-x-1/2 -rotate-3 bg-blush/80"
        />
        <span
          aria-hidden="true"
          className="absolute -top-5 -right-2 z-10 flex size-16 rotate-12 items-center justify-center rounded-full bg-brand text-white shadow-lg lg:-right-5 lg:size-20"
        >
          <CurrentIcon className="size-7 lg:size-9" />
        </span>
        {/* Each new choice lands at a slightly different angle, like a photo dropped on a table. */}
        <div
          id="social-panel"
          role="tabpanel"
          aria-labelledby={`social-tab-${active}`}
          style={{ rotate: active % 2 ? "1.5deg" : "-1.5deg" }}
          className="bg-white p-3 pb-5 shadow-[0_24px_50px_-16px_rgba(28,8,50,0.4)] ring-1 ring-line transition-[rotate] duration-500 ease-[var(--ease-snap)] sm:p-4 sm:pb-6"
        >
          <div key={active} className="motion-safe:animate-[fade-in_300ms_ease-out]">
            {panels[active]}
            <p className={`${chunkyFont.className} mt-4 text-xl text-brand sm:text-2xl`}>{current.name}</p>
            <p className="mt-1 text-muted">{current.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
