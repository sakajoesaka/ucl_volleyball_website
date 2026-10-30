"use client";

import { useEffect, useRef } from "react";
import { FINE_POINTER, useMediaQuery } from "@/lib/use-media-query";

const INTERACTIVE =
  "a, button, summary, select, label, [role='button'], input[type='submit'], input[type='checkbox'], input[type='radio']";
// Over these the normal text cursor shows instead, so typing and selecting stay precise.
const TEXT_FIELD =
  "textarea, [contenteditable='true'], input:not([type='submit'], [type='button'], [type='checkbox'], [type='radio'])";

// Replaces the mouse pointer with a small volleyball. Touch devices never see it.
export function VolleyballCursor() {
  const hasMouse = useMediaQuery(FINE_POINTER);
  return hasMouse ? <BallCursor /> : null;
}

function BallCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ball = ref.current;
    if (!ball) return;
    const root = document.documentElement;
    root.classList.add("has-ball-cursor");

    // The ball is centred on the pointer, so the click lands in the middle of it.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      ball.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const target = e.target instanceof Element ? e.target : null;
      ball.classList.toggle("is-visible", !target?.closest(TEXT_FIELD));
      ball.classList.toggle("is-hover", !!target?.closest(INTERACTIVE));
    };
    const onDown = () => ball.classList.add("is-down");
    const onUp = () => ball.classList.remove("is-down");
    const onLeave = () => ball.classList.remove("is-visible");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      root.classList.remove("has-ball-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="ball-cursor" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG, no optimisation needed */}
      <img src="/volleyball.svg" alt="" width={22} height={22} />
    </div>
  );
}
