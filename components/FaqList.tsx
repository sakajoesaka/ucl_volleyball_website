"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/content/faqs";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui";

// Expandable questions. Answers stay in the page (good for search engines) but are
// hidden from screen readers and keyboard focus while closed.
export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (!next.delete(index)) next.add(index);
      return next;
    });

  return (
    <ul className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = open.has(index);
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <li
            key={faq.question}
            className={`rounded-[var(--radius-card)] border bg-white transition-colors ${isOpen ? "border-lilac" : "border-line"}`}
          >
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-lg font-semibold text-ink md:px-7 md:text-xl"
              >
                {faq.question}
                <span
                  aria-hidden="true"
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-[rotate,background-color] duration-300 ${
                    isOpen ? "rotate-180 bg-brand text-white" : "bg-lilac-100 text-brand"
                  }`}
                >
                  <ChevronDown className="size-5" />
                </span>
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-snap)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-3 px-5 pb-6 text-muted md:px-7 md:text-lg">
                  {faq.answer.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {faq.button && (
                    <div className="pt-2">
                      <ButtonLink
                        href={faq.button.href}
                        variant={faq.button.href === site.joinUrl ? "primary" : "outline"}
                      >
                        {faq.button.label}
                      </ButtonLink>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
