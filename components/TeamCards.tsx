"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Mail, Medal, Trophy, X } from "lucide-react";
import type { Team } from "@/content/achievements";
import { WithPlaceholders, hasPlaceholder } from "@/components/Placeholder";

type TeamCardsProps = {
  teams: Team[];
  // Photos are rendered on the server (so placeholders work) and passed in.
  cardPhotos: ReactNode[];
  panelPhotos: ReactNode[];
};

export function TeamCards({ teams, cardPhotos, panelPhotos }: TeamCardsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  // Once the panel has closed (and the page is interactive again), return focus to its card.
  useEffect(() => {
    if (openIndex !== null) lastOpened.current = openIndex;
    else if (lastOpened.current !== null) {
      triggers.current[lastOpened.current]?.focus();
      lastOpened.current = null;
    }
  }, [openIndex]);

  return (
    <>
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team, i) => (
          <li
            key={team.name}
            className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-lilac hover:shadow-[0_18px_40px_-20px_rgba(75,26,122,0.45)]"
          >
            {cardPhotos[i]}
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <h3 className="heading text-xl text-ink md:text-2xl">
                {/* Stretched over the whole card, so anywhere on it opens the details. */}
                <button
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-haspopup="dialog"
                  className="text-left after:absolute after:inset-0 after:content-['']"
                >
                  {team.name}
                </button>
              </h3>
              {team.summary && <p className="mt-3 text-muted">{team.summary}</p>}
              <AchievementList items={team.achievements} />
              <p
                aria-hidden="true"
                className="mt-auto flex items-center gap-2 pt-6 font-semibold text-brand transition-[gap] group-hover:gap-3"
              >
                Meet the team <ArrowRight className="size-4" />
              </p>
            </div>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <TeamPanel team={teams[openIndex]} photo={panelPhotos[openIndex]} onClose={close} />
      )}
    </>
  );
}

function AchievementList({ items }: { items: Team["achievements"] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item.text} className="flex gap-3">
          <span
            className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${
              item.title ? "bg-brand text-lilac-200" : "bg-lilac-100 text-brand"
            }`}
          >
            {item.title ? (
              <Trophy className="size-3.5" aria-hidden="true" />
            ) : (
              <Medal className="size-3.5" aria-hidden="true" />
            )}
          </span>
          <span className={item.title ? "font-semibold text-ink" : "text-ink/85"}>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

function TeamPanel({ team, photo, onClose }: { team: Team; photo: ReactNode; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const { captain } = team;
  const showNotice = hasPlaceholder(...team.about, captain.name, captain.course, captain.email);
  const emailIsReal = !hasPlaceholder(captain.email);

  // While open: focus the panel, close on Escape, and stop the page behind from scrolling or being tabbed to.
  useEffect(() => {
    closeButton.current?.focus();
    const background = document.querySelectorAll<HTMLElement>("#site-nav, #main, body > footer");
    background.forEach((el) => (el.inert = true));
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      background.forEach((el) => (el.inert = false));
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-brand-950/70 p-0 backdrop-blur-sm motion-safe:animate-[fade-in_200ms_ease-out] sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-panel-title"
        className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-[var(--radius-card)] bg-paper shadow-2xl motion-safe:animate-[panel-in_280ms_var(--ease-snap)] sm:rounded-[var(--radius-card)]"
      >
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/90 text-brand shadow-md transition-colors hover:bg-white"
        >
          <X className="size-5" aria-hidden="true" />
          <span className="sr-only">Close</span>
        </button>

        {photo}

        <div className="p-6 sm:p-8">
          <h2 id="team-panel-title" className="heading text-3xl text-brand md:text-4xl">
            {team.name}
          </h2>

          {showNotice && (
            <p className="mt-4 rounded-xl border border-dashed border-muted/40 bg-white px-4 py-3 text-sm text-muted">
              Details in dashed boxes are placeholders and will be added soon.
            </p>
          )}

          <div className="mt-5 space-y-4 text-lg text-ink/85">
            {team.about.map((paragraph) => (
              <p key={paragraph}>
                <WithPlaceholders text={paragraph} />
              </p>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-white p-5 sm:p-6">
            <h3 className="font-semibold text-ink">Team Captain</h3>
            <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-[7rem_1fr]">
              <dt className="text-sm text-muted sm:pt-0.5">Name</dt>
              <dd className="font-semibold text-ink">
                <WithPlaceholders text={captain.name} />
              </dd>
              <dt className="text-sm text-muted sm:pt-0.5">Studies</dt>
              <dd className="text-ink">
                <WithPlaceholders text={captain.course} />
              </dd>
              <dt className="text-sm text-muted sm:pt-0.5">Contact</dt>
              <dd className="text-ink">
                {emailIsReal ? (
                  <a
                    href={`mailto:${captain.email}`}
                    className="inline-flex items-center gap-2 font-semibold text-brand underline decoration-lilac decoration-2 underline-offset-4"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {captain.email}
                  </a>
                ) : (
                  <WithPlaceholders text={captain.email} />
                )}
              </dd>
            </dl>
          </div>

          <h3 className="mt-8 font-semibold text-ink">Achievements</h3>
          <AchievementList items={team.achievements} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
