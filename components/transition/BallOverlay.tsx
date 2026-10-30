"use client";

import { motion, type Easing } from "framer-motion";
import { useId, useRef, useState, type SVGProps } from "react";

// play:   a spinning volleyball appears where the user clicked and grows into a solid
//         purple circle (a CSS clip-path) that covers the screen
// hold:   screen stays covered while the next page loads (usually instant, it's prefetched)
// reveal: the circle shrinks back into a ball, which hops and drops out of view
export type OverlayStage = "play" | "hold" | "reveal";

export type OverlayProps = {
  stage: OverlayStage;
  reduced: boolean;
  // Where the click happened. Null (e.g. keyboard navigation) starts from the centre of the screen.
  origin: { x: number; y: number } | null;
  onCovered: () => void;
  onDone: () => void;
};

// Timings in seconds, about 1.2s in all. To cover: the ball pops in (POP), spins in place for a
// moment (PAUSE), then grows smoothly over the screen (GROW). To reveal: it shrinks back (SHRINK),
// then hops and drops out of view (DROP).
const POP = 0.12;
const PAUSE = 0.08;
const GROW = 0.42;
const SHRINK = 0.28;
const DROP = 0.34;
const COVER = POP + PAUSE + GROW;
// Radius of the ball, in pixels, before it grows and after it shrinks back.
const BALL_RADIUS = 16;

const BRAND = "#4b1a7a";
// Gentle start and finish, so the circle doesn't rush at the viewer.
const growEase: Easing = [0.65, 0, 0.35, 1];
const shrinkEase: Easing = [0.4, 0, 0.2, 1];
// Keyframe timing shared by the circle and the ball so their edges stay together.
const coverTimes = [0, POP / COVER, (POP + PAUSE) / COVER, 1];
const coverEase: Easing[] = ["easeOut", "linear", growEase];

export default function BallOverlay(props: OverlayProps) {
  return props.reduced ? <FadeOverlay {...props} /> : <BallTransition {...props} />;
}

// Plain quick fade for people who have "reduce motion" switched on.
function FadeOverlay({ stage, onCovered, onDone }: OverlayProps) {
  const covered = useRef(false);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[150] bg-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: stage === "reveal" ? 0 : 1 }}
      transition={{ duration: stage === "reveal" ? 0.2 : 0.15, ease: "easeOut" }}
      onAnimationComplete={() => {
        if (stage === "reveal") onDone();
        else if (!covered.current) {
          covered.current = true;
          onCovered();
        }
      }}
    />
  );
}

function BallTransition({ stage, origin, onCovered, onDone }: OverlayProps) {
  const covered = useRef(false);

  // Work out the circle once, from the click point and screen size when the transition starts.
  const [geo] = useState(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x = origin?.x ?? vw / 2;
    const y = origin?.y ?? vh / 2;
    // Big enough to reach the furthest corner of the screen.
    const radius =
      Math.ceil(
        Math.max(Math.hypot(x, y), Math.hypot(vw - x, y), Math.hypot(x, vh - y), Math.hypot(vw - x, vh - y)),
      ) + 2;
    return { x, y, radius, ballScale: BALL_RADIUS / radius, fall: vh - y + BALL_RADIUS * 3 };
  });

  const circle = (r: number) => `circle(${r}px at ${geo.x}px ${geo.y}px)`;
  const revealing = stage === "reveal";

  return (
    <div aria-hidden="true" className={`fixed inset-0 z-[150] ${revealing ? "pointer-events-none" : ""}`}>
      {/* The solid purple circle */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: BRAND }}
        initial={{ clipPath: circle(0), opacity: 1 }}
        animate={
          revealing
            ? { clipPath: circle(BALL_RADIUS), opacity: 0 }
            : {
                clipPath: [circle(0), circle(BALL_RADIUS), circle(BALL_RADIUS), circle(geo.radius)],
                opacity: 1,
              }
        }
        transition={
          revealing
            ? { clipPath: { duration: SHRINK, ease: shrinkEase }, opacity: { delay: SHRINK, duration: 0 } }
            : { clipPath: { duration: COVER, times: coverTimes, ease: coverEase } }
        }
      />

      {/* The volleyball drawn on top. It grows exactly in step with the circle (same timing and
          easing), fading out as it grows so the screen ends up solid purple. */}
      <motion.div
        className="absolute will-change-transform"
        style={{
          left: geo.x - geo.radius,
          top: geo.y - geo.radius,
          width: geo.radius * 2,
          height: geo.radius * 2,
        }}
        initial={{ scale: 0, rotate: 0, opacity: 1, y: 0 }}
        animate={
          revealing
            ? { scale: geo.ballScale, rotate: 720, opacity: 1, y: [0, -BALL_RADIUS * 3, geo.fall] }
            : { scale: [0, geo.ballScale, geo.ballScale, 1], rotate: 360, opacity: [1, 1, 1, 0] }
        }
        transition={
          revealing
            ? {
                scale: { duration: SHRINK, ease: shrinkEase },
                opacity: { duration: SHRINK * 0.7 },
                rotate: { duration: SHRINK + DROP, ease: "linear" },
                // A little hop up, then a drop off the bottom of the screen.
                y: { delay: SHRINK, duration: DROP, times: [0, 0.35, 1], ease: ["easeOut", "easeIn"] },
              }
            : {
                scale: { duration: COVER, times: coverTimes, ease: coverEase },
                rotate: { duration: COVER, ease: "linear" },
                // The ball's seams fade away as it grows, leaving solid purple.
                opacity: { duration: COVER, times: [0, (POP + PAUSE) / COVER, 0.7, 1] },
              }
        }
        onAnimationComplete={() => {
          if (revealing) onDone();
          else if (!covered.current) {
            covered.current = true;
            onCovered();
          }
        }}
      >
        <BallArt className="size-full" />
      </motion.div>
    </div>
  );
}

// Purple and white volleyball, filling its box edge to edge.
function BallArt(props: SVGProps<SVGSVGElement>) {
  const clipId = useId();
  return (
    <svg viewBox="2.25 2.25 19.5 19.5" {...props}>
      <defs>
        <clipPath id={clipId}>
          <circle cx="12" cy="12" r="9.75" />
        </clipPath>
      </defs>
      <circle cx="12" cy="12" r="9.75" fill={BRAND} />
      <g clipPath={`url(#${clipId})`} fill="none" stroke="#fff" strokeWidth="1.15" strokeLinecap="round">
        <path d="M12 12a8 8 0 0 0 8 4" />
        <path d="M7.5 13.5a12 12 0 0 0 8.5 6.5" />
        <path d="M12 12a8 8 0 0 0 -7.464 4.928" />
        <path d="M12.951 7.353a12 12 0 0 0 -9.88 4.111" />
        <path d="M12 12a8 8 0 0 0 -.536 -8.928" />
        <path d="M15.549 15.147a12 12 0 0 0 1.38 -10.611" />
      </g>
    </svg>
  );
}
