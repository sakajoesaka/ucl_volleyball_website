"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { CommitteeMember } from "@/content/committee";
import { DetailPanel, useDetailPanel } from "@/components/DetailPanel";
import { WithPlaceholders } from "@/components/Placeholder";

// Each card opens a panel with the same photo and any extra details.
export function CommitteeCards({ members, photos }: { members: CommitteeMember[]; photos: ReactNode[] }) {
  const { openIndex, open, close, triggers } = useDetailPanel();

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member, i) => (
          <li
            key={member.image.src}
            className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-lilac hover:shadow-[0_18px_40px_-20px_rgba(75,26,122,0.45)]"
          >
            {photos[i]}
            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm font-semibold text-brand">{member.role}</p>
              <h3 className="heading mt-2 text-2xl text-ink">
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
                  <WithPlaceholders text={member.name} />
                </button>
              </h3>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-sm text-muted">Studies</dt>
                  <dd className="text-ink">
                    <WithPlaceholders text={member.course} />
                  </dd>
                </div>
                {member.position && (
                  <div>
                    <dt className="text-sm text-muted">Position</dt>
                    <dd className="text-ink">{member.position}</dd>
                  </div>
                )}
              </dl>
              <p
                aria-hidden="true"
                className="mt-auto flex items-center gap-2 pt-5 font-semibold text-brand transition-[gap] group-hover:gap-3"
              >
                More about {member.name.split(" ")[0]} <ArrowRight className="size-4" />
              </p>
            </div>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <MemberPanel member={members[openIndex]} photo={photos[openIndex]} onClose={close} />
      )}
    </>
  );
}

function MemberPanel({
  member,
  photo,
  onClose,
}: {
  member: CommitteeMember;
  photo: ReactNode;
  onClose: () => void;
}) {
  const { tagline, quote, favourites } = member.extras ?? {};

  return (
    <DetailPanel labelledBy="member-panel-title" onClose={onClose} className="max-w-lg">
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-5">
          {/* The same photo and crop as the card. */}
          <div className="w-28 shrink-0 overflow-hidden rounded-2xl sm:w-40">{photo}</div>
          <div className="min-w-0 pr-8">
            <p className="text-sm font-semibold text-brand">{member.role}</p>
            <h2 id="member-panel-title" className="heading mt-2 text-2xl text-ink sm:text-3xl">
              <WithPlaceholders text={member.name} />
            </h2>
            <p className="mt-3 text-muted">
              <WithPlaceholders text={member.course} />
              {member.position && ` · ${member.position}`}
            </p>
          </div>
        </div>

        {tagline && <p className="mt-6 text-lg font-semibold text-brand">{tagline}</p>}
        {quote && (
          <blockquote className="mt-6 border-l-4 border-lilac pl-4 text-lg text-ink/85">{quote}</blockquote>
        )}
        {favourites && (
          <dl className="mt-5 grid gap-3">
            {favourites.map(({ label, value }) => (
              <div key={label} className="rounded-2xl border border-line bg-white px-4 py-3">
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="mt-0.5 font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </DetailPanel>
  );
}
