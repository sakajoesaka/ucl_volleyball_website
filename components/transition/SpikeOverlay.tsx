"use client";

import { motion, type Transition } from "framer-motion";
import { useId, useRef, useState, type SVGProps } from "react";

// play:   stick figure jumps and spikes, ball flies at the viewer until it fills the screen
// hold:   screen stays covered while the next page loads (usually instant, it's prefetched)
// reveal: ball bursts past the viewer and fades, uncovering the new page
export type OverlayStage = "play" | "hold" | "reveal";

export type OverlayProps = {
  stage: OverlayStage;
  reduced: boolean;
  onCovered: () => void;
  onDone: () => void;
};

// Timings in seconds. Covered at LAUNCH + FLIGHT, total with reveal is about 0.85s.
const FIGURE_DURATION = 0.42;
const LAUNCH = 0.26;
const FLIGHT = 0.32;
const REVEAL = 0.26;

// Keyframe times, as fractions of FIGURE_DURATION: stand, crouch, wind up, contact, follow through.
const POSE_TIMES = [0, 0.24, 0.52, 0.64, 1];

// Stick figure poses, drawn in a 200 x 380 box (viewBox starts at y = -80 so the ball fits above).
const VIEW = { x: 0, y: -80, w: 200, h: 380 };
const BODY_Y = [0, 9, -52, -55, -40];
const HITTING_ARM = [
  "M100 104 L110 128 L114 152",
  "M100 104 L88 126 L76 142",
  "M100 104 L84 86 L90 60",
  "M100 104 L114 78 L126 50",
  "M100 104 L120 118 L126 142",
];
const OTHER_ARM = [
  "M100 104 L90 128 L86 152",
  "M100 104 L86 130 L72 146",
  "M100 104 L114 82 L124 58",
  "M100 104 L94 124 L98 142",
  "M100 104 L92 126 L94 148",
];
const BACK_LEG = [
  "M100 172 L94 214 L88 256",
  "M100 172 L114 206 L100 246",
  "M100 172 L112 202 L100 232",
  "M100 172 L108 210 L104 246",
  "M100 172 L98 214 L92 254",
];
const FRONT_LEG = [
  "M100 172 L106 214 L112 256",
  "M100 172 L118 210 L112 250",
  "M100 172 L94 206 L84 236",
  "M100 172 L96 212 L90 248",
  "M100 172 L104 214 L110 254",
];
const SHADOW_RX = [26, 30, 14, 13, 18];

// The small ball drops in from the toss and meets the hand at contact.
const SMALL_BALL_R = 12;
const SMALL_BALL_X = [164, 156, 142, 134, 134];
const SMALL_BALL_Y = [-70, -60, -38, -22, -22];
const CONTACT = { x: 134, y: -22 };

export default function SpikeOverlay(props: OverlayProps) {
  return props.reduced ? <FadeOverlay {...props} /> : <SpikeAnimation {...props} />;
}

// Plain cross-fade for people who have "reduce motion" switched on.
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

function SpikeAnimation({ stage, onCovered, onDone }: OverlayProps) {
  const covered = useRef(false);

  // Work out sizes once, from the screen size when the transition starts.
  const [geo] = useState(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const width = Math.min(vw * 0.46, vh * 0.34);
    const scale = width / VIEW.w;
    const height = VIEW.h * scale;
    // Big enough to cover the screen corners when centred.
    const ballSize = Math.max(vw, vh) * 1.6;
    return {
      width,
      height,
      ballSize,
      // Where the hit happens, relative to the centre of the screen.
      startX: -width / 2 + (CONTACT.x - VIEW.x) * scale,
      startY: -0.42 * height + (CONTACT.y - VIEW.y) * scale,
      startScale: (SMALL_BALL_R * 2 * scale) / ballSize,
    };
  });

  const playing = stage === "play";
  const pose: Transition = { duration: FIGURE_DURATION, times: POSE_TIMES, ease: "easeOut" };
  const visibility = { opacity: playing ? 1 : 0 };
  const visibilityTransition: Transition = { duration: playing ? 0.08 : 0 };

  const flight: Transition = {
    delay: LAUNCH,
    duration: FLIGHT,
    // Ease-in so the ball speeds up as it "gets closer".
    scale: { delay: LAUNCH, duration: FLIGHT, ease: [0.7, 0, 0.84, 0] },
    x: { delay: LAUNCH, duration: FLIGHT, ease: [0.3, 0, 0.7, 0.6] },
    y: { delay: LAUNCH, duration: FLIGHT, ease: [0.3, 0, 0.7, 0.6] },
    rotate: { delay: LAUNCH, duration: FLIGHT, ease: "linear" },
    opacity: { delay: LAUNCH, duration: 0 },
  };

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[150] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-paper/85"
        initial={{ opacity: 0 }}
        animate={visibility}
        transition={visibilityTransition}
      />

      <motion.svg
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
        className="absolute top-1/2 left-1/2"
        style={{ width: geo.width, height: geo.height, translate: "-50% -42%" }}
        initial={{ opacity: 0 }}
        animate={visibility}
        transition={visibilityTransition}
      >
        <motion.ellipse
          cx={100}
          cy={262}
          ry={5}
          fill="#c77ddb"
          opacity={0.45}
          initial={{ rx: SHADOW_RX[0] }}
          animate={{ rx: SHADOW_RX }}
          transition={pose}
        />
        <motion.g
          fill="none"
          stroke="#4b1a7a"
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ y: 0 }}
          animate={{ y: BODY_Y }}
          transition={pose}
        >
          <circle cx={101} cy={70} r={15} fill="#4b1a7a" stroke="none" />
          <path d="M100 92 L100 172" />
          <motion.path initial={{ d: OTHER_ARM[0] }} animate={{ d: OTHER_ARM }} transition={pose} />
          <motion.path initial={{ d: BACK_LEG[0] }} animate={{ d: BACK_LEG }} transition={pose} />
          <motion.path initial={{ d: FRONT_LEG[0] }} animate={{ d: FRONT_LEG }} transition={pose} />
          <motion.path initial={{ d: HITTING_ARM[0] }} animate={{ d: HITTING_ARM }} transition={pose} />
        </motion.g>
        <motion.g
          initial={{ x: SMALL_BALL_X[0], y: SMALL_BALL_Y[0], opacity: 1 }}
          animate={{ x: SMALL_BALL_X, y: SMALL_BALL_Y, opacity: [1, 1, 1, 1, 0] }}
          transition={{
            ...pose,
            opacity: { duration: LAUNCH + 0.01, times: [0, 0.3, 0.6, 0.97, 1] },
          }}
        >
          <BallArt x={-SMALL_BALL_R} y={-SMALL_BALL_R} width={SMALL_BALL_R * 2} height={SMALL_BALL_R * 2} />
        </motion.g>
      </motion.svg>

      <motion.div
        className="absolute top-1/2 left-1/2 will-change-transform"
        style={{
          width: geo.ballSize,
          height: geo.ballSize,
          marginLeft: -geo.ballSize / 2,
          marginTop: -geo.ballSize / 2,
        }}
        initial={{ x: geo.startX, y: geo.startY, scale: geo.startScale, rotate: 0, opacity: 0 }}
        animate={
          stage === "reveal"
            ? { x: 0, y: 0, scale: 1.5, rotate: 150, opacity: 0 }
            : { x: 0, y: 0, scale: 1, rotate: 120, opacity: 1 }
        }
        transition={stage === "reveal" ? { duration: REVEAL, ease: [0.2, 0.7, 0.3, 1] } : flight}
        onAnimationComplete={() => {
          if (stage === "reveal") onDone();
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

// Same design as /public/volleyball.svg, without the white outline.
function BallArt(props: SVGProps<SVGSVGElement>) {
  const clipId = useId();
  return (
    <svg viewBox="2.25 2.25 19.5 19.5" {...props}>
      <defs>
        <clipPath id={clipId}>
          <circle cx="12" cy="12" r="9.75" />
        </clipPath>
      </defs>
      <circle cx="12" cy="12" r="9.75" fill="#4b1a7a" />
      <g clipPath={`url(#${clipId})`} fill="none" stroke="#c77ddb" strokeWidth="1.15" strokeLinecap="round">
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
