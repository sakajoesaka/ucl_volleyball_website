"use client";

import type { ReactNode } from "react";
import { ArrowRight, Mail, Medal, Trophy } from "lucide-react";
import type { Captain, Team } from "@/content/achievements";
import { BrandIcon } from "@/components/BrandIcon";
import { DetailPanel, useDetailPanel } from "@/components/DetailPanel";
import { WithPlaceholders, hasPlaceholder } from "@/components/Placeholder";

type TeamCardsProps = {
  teams: Team[];
  // Photos are rendered on the server (so placeholders work) and passed in.
  cardPhotos: ReactNode[];
  panelPhotos: ReactNode[];
};

export function TeamCards({ teams, cardPhotos, panelPhotos }: TeamCardsProps) {
  const { openIndex, open, close, triggers } = useDetailPanel();

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
                  onClick={() => open(i)}
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
  const { captains } = team;
  const showNotice = hasPlaceholder(...team.about, ...captains.flatMap((c) => [c.name, c.course, c.email]));

  return (
    <DetailPanel labelledBy="team-panel-title" onClose={onClose}>
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

        {team.competitions && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {team.competitions.map((competition) => (
              <li
                key={competition}
                className="rounded-lg bg-lilac-100 px-3 py-1.5 text-sm font-semibold text-brand"
              >
                {competition}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 space-y-4 text-lg text-ink/85">
          {team.about.map((paragraph) => (
            <p key={paragraph}>
              <WithPlaceholders text={paragraph} />
            </p>
          ))}
        </div>

        {team.instagram && (
          <a
            href={`https://www.instagram.com/${team.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-semibold text-brand underline decoration-lilac decoration-2 underline-offset-4"
          >
            <BrandIcon platform="instagram" className="size-4" />@{team.instagram}
          </a>
        )}

        <div className="mt-8 rounded-2xl border border-line bg-white p-5 sm:p-6">
          <h3 className="font-semibold text-ink">{captains.length > 1 ? "Team Captains" : "Team Captain"}</h3>
          <div className="divide-y divide-line">
            {captains.map((captain) => (
              <CaptainDetails key={captain.name} captain={captain} />
            ))}
          </div>
        </div>

        <h3 className="mt-8 font-semibold text-ink">Achievements</h3>
        <AchievementList items={team.achievements} />
      </div>
    </DetailPanel>
  );
}

function CaptainDetails({ captain }: { captain: Captain }) {
  const emailIsReal = !hasPlaceholder(captain.email);

  return (
    <dl className="grid gap-x-6 gap-y-3 py-5 first:pt-4 last:pb-0 sm:grid-cols-[7rem_1fr]">
      <dt className="text-sm text-muted sm:pt-0.5">Name</dt>
      <dd className="font-semibold text-ink">
        <WithPlaceholders text={captain.name} />
      </dd>
      <dt className="text-sm text-muted sm:pt-0.5">Studies</dt>
      <dd className="text-ink">
        <WithPlaceholders text={captain.course} />
      </dd>
      {captain.position && (
        <>
          <dt className="text-sm text-muted sm:pt-0.5">Position</dt>
          <dd className="text-ink">{captain.position}</dd>
        </>
      )}
      <dt className="text-sm text-muted sm:pt-0.5">Contact</dt>
      <dd className="text-ink">
        {emailIsReal ? (
          <a
            href={`mailto:${captain.email}`}
            className="inline-flex items-center gap-2 font-semibold break-all text-brand underline decoration-lilac decoration-2 underline-offset-4"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            {captain.email}
          </a>
        ) : (
          <WithPlaceholders text={captain.email} />
        )}
      </dd>
    </dl>
  );
}
