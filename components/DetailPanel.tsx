"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

// Tracks which card's panel is open, and returns focus to that card when it closes.
export function useDetailPanel() {
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

  return { openIndex, open: setOpenIndex, close, triggers };
}

// The pop-up that opens from a card: a sheet on phones, a centred box on larger screens.
export function DetailPanel({
  labelledBy,
  onClose,
  className = "max-w-2xl",
  children,
}: {
  labelledBy: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);

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
        aria-labelledby={labelledBy}
        className={`relative max-h-[92svh] w-full overflow-y-auto rounded-t-[var(--radius-card)] bg-paper shadow-2xl motion-safe:animate-[panel-in_280ms_var(--ease-snap)] sm:rounded-[var(--radius-card)] ${className}`}
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
        {children}
      </div>
    </div>,
    document.body,
  );
}
