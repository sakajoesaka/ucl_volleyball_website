"use client";

import { useContext, useId, useState } from "react";
import { Clock, MapPin, Minus, Plus } from "lucide-react";
import type { Session } from "@/content/sessions";
import { WithPlaceholders } from "@/components/Placeholder";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { SlideActiveContext } from "@/components/Carousel";

// The "Session times & locations" button on each membership slide, which opens the list in place.
export function SessionsToggle({ sessions, note }: { sessions: Session[]; note?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Close again as soon as the slideshow moves to another slide.
  const slideActive = useContext(SlideActiveContext);
  if (open && !slideActive) setOpen(false);

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-semibold transition-colors hover:bg-white/10"
      >
        <span className="flex items-center gap-3">
          <Clock className="size-5 text-lilac-200" aria-hidden="true" />
          Session times &amp; locations
        </span>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lilac text-brand-950">
          {open ? (
            <Minus className="size-4" aria-hidden="true" />
          ) : (
            <Plus className="size-4" aria-hidden="true" />
          )}
        </span>
      </button>
      <div
        id={panelId}
        data-collapsible
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-snap)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-2 px-3 pb-3">
            {sessions.map((session, i) => (
              <li
                key={i}
                className="grid gap-x-6 gap-y-1 rounded-xl bg-white/10 px-4 py-3 sm:grid-cols-[7.5rem_1fr_auto] sm:items-center"
              >
                <p className="heading text-lg">
                  <WithPlaceholders text={session.day} tone="light" />
                </p>
                <div className="space-y-0.5 text-white/85 sm:flex sm:gap-6 sm:space-y-0">
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <Clock className="size-4 shrink-0 text-lilac-200" aria-hidden="true" />
                    <WithPlaceholders text={session.time} tone="light" />
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4 shrink-0 text-lilac-200" aria-hidden="true" />
                    <span>
                      <WithPlaceholders text={session.venue} tone="light" />
                      {session.area && `, ${session.area}`}
                    </span>
                  </p>
                </div>
                {session.mapQuery && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(session.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="justify-self-start text-sm font-semibold underline decoration-lilac decoration-2 underline-offset-4 hover:text-lilac-200"
                  >
                    Map<span className="sr-only"> of {session.venue} (opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
          {note && (
            <p className="px-5 pb-4 text-sm text-white/75">
              {note}{" "}
              <TransitionLink href="/faqs" className="font-semibold text-white underline underline-offset-2">
                Here&apos;s how to get added
              </TransitionLink>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
