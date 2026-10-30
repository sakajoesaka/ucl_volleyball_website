"use client";

import { motion, type Easing, type Transition } from "framer-motion";
import { useId, useRef, useState, type SVGProps } from "react";

// play:   a player runs in, jumps and spikes the ball over a net into the court;
//         purple spreads out from where the ball lands until it fills the screen
// hold:   screen stays covered while the next page loads (usually instant, it's prefetched)
// reveal: the purple fades away, uncovering the new page
export type OverlayStage = "play" | "hold" | "reveal";

export type OverlayProps = {
  stage: OverlayStage;
  reduced: boolean;
  onCovered: () => void;
  onDone: () => void;
};

// Change this one number to speed the whole animation up (below 1) or slow it down (above 1).
const SPEED = 1;
const s = (seconds: number) => seconds * SPEED;

// Timings in seconds. The screen is covered at IMPACT + SPREAD; with REVEAL the total is about 1.3s.
const IMPACT = s(0.7);
const SPREAD = s(0.3);
const REVEAL = s(0.3);

// The scene is drawn in a 400 x 300 box. The floor is at y = 270 and the net at x = 230.
const SCENE = { w: 400, h: 300 };
const FLOOR_Y = 270;
const BALL_R = 10;
const LANDING = { x: 330, y: FLOOR_Y - BALL_R };

// Player poses: stand, step, plant, take off, wind up, hit, follow through, land.
// Limbs are drawn relative to the hip; HIP_X/HIP_Y move the whole body.
const POSE_TIMES_S = [0, 0.14, 0.28, 0.37, 0.49, 0.56, 0.66, 0.8];
const POSE_DURATION = s(POSE_TIMES_S[POSE_TIMES_S.length - 1]);
const POSE_TIMES = POSE_TIMES_S.map((t) => t / POSE_TIMES_S[POSE_TIMES_S.length - 1]);

const HIP_X = [70, 115, 150, 160, 168, 172, 176, 180];
const HIP_Y = [206, 206, 224, 196, 150, 146, 170, 220];
const TORSO = [
  "M0 0 L0 -60",
  "M0 0 L4 -59",
  "M0 0 L14 -54",
  "M0 0 L6 -60",
  "M0 0 L-6 -60",
  "M0 0 L8 -60",
  "M0 0 L14 -56",
  "M0 0 L8 -56",
];
const HEAD_X = [0, 5, 19, 8, -6, 11, 19, 11];
const HEAD_Y = [-76, -75, -68, -76, -76, -75, -70, -71];
const HITTING_ARM = [
  "M0 -54 L6 -30 L8 -6",
  "M4 -53 L-4 -30 L-10 -10",
  "M13 -48 L-6 -36 L-24 -30",
  "M6 -54 L16 -76 L22 -98",
  "M-5 -54 L-22 -66 L-14 -88",
  "M8 -54 L18 -78 L28 -102",
  "M13 -50 L24 -28 L20 -4",
  "M8 -50 L16 -28 L18 -6",
];
const OTHER_ARM = [
  "M0 -54 L-6 -30 L-6 -6",
  "M4 -53 L14 -32 L20 -14",
  "M13 -48 L-4 -34 L-20 -24",
  "M6 -54 L18 -74 L26 -94",
  "M-5 -54 L12 -72 L26 -88",
  "M8 -54 L4 -32 L-2 -12",
  "M13 -50 L4 -30 L-4 -12",
  "M8 -50 L0 -28 L-4 -6",
];
const FRONT_LEG = [
  "M0 0 L6 32 L4 64",
  "M0 0 L14 28 L20 60",
  "M0 0 L22 18 L12 46",
  "M0 0 L4 32 L-2 64",
  "M0 0 L14 26 L2 48",
  "M0 0 L12 28 L6 56",
  "M0 0 L10 30 L8 62",
  "M0 0 L16 22 L8 50",
];
const BACK_LEG = [
  "M0 0 L-6 32 L-8 64",
  "M0 0 L-10 30 L-22 56",
  "M0 0 L16 22 L-4 46",
  "M0 0 L-4 32 L-12 62",
  "M0 0 L4 30 L-12 50",
  "M0 0 L2 30 L-8 56",
  "M0 0 L-2 32 L-6 62",
  "M0 0 L6 24 L-6 50",
];
const SHADOW_RX = [22, 22, 26, 20, 12, 12, 16, 24];

// The set ball rises, drops to the player's hand, then is spiked down past the net.
const BALL_TIMES_S = [0, 0.14, 0.28, 0.37, 0.49, 0.56, 0.7];
const BALL_TIMES = BALL_TIMES_S.map((t) => t / BALL_TIMES_S[BALL_TIMES_S.length - 1]);
const BALL_X = [262, 252, 236, 226, 214, 208, LANDING.x];
const BALL_Y = [130, 60, 20, 14, 24, 34, LANDING.y];
// The last segment (the spike) speeds up like a real hit ball.
const BALL_EASE: Easing[] = ["easeOut", "easeInOut", "easeInOut", "easeIn", "easeIn", [0.5, 0, 0.9, 0.5]];

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
    const width = Math.min(vw * 0.94, 680, vh * 0.62 * (SCENE.w / SCENE.h));
    const scale = width / SCENE.w;
    const height = SCENE.h * scale;
    // Where the ball lands, on screen.
    const x = vw / 2 - width / 2 + LANDING.x * scale;
    const y = vh / 2 - height / 2 + LANDING.y * scale;
    // The purple circle must reach the furthest corner of the screen from there.
    const reach = Math.max(
      Math.hypot(x, y),
      Math.hypot(vw - x, y),
      Math.hypot(x, vh - y),
      Math.hypot(vw - x, vh - y),
    );
    const size = reach * 2 + 8;
    return { width, height, x, y, size, startScale: (BALL_R * 2 * scale) / size };
  });

  const playing = stage === "play";
  const pose: Transition = { duration: POSE_DURATION, times: POSE_TIMES, ease: "easeInOut" };
  const visibility = { opacity: playing ? 1 : 0 };
  const visibilityTransition: Transition = { duration: playing ? s(0.12) : 0 };

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[150] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-paper/90"
        initial={{ opacity: 0 }}
        animate={visibility}
        transition={visibilityTransition}
      />

      <motion.svg
        viewBox={`0 0 ${SCENE.w} ${SCENE.h}`}
        overflow="visible"
        className="absolute top-1/2 left-1/2"
        style={{ width: geo.width, height: geo.height, translate: "-50% -50%" }}
        initial={{ opacity: 0 }}
        animate={visibility}
        transition={visibilityTransition}
      >
        {/* Floor, running the full width of the screen */}
        <line x1={-2000} x2={2400} y1={FLOOR_Y} y2={FLOOR_Y} stroke="#c77ddb" strokeWidth={2} opacity={0.6} />

        {/* Net, seen from the side */}
        <line x1={230} x2={230} y1={84} y2={FLOOR_Y} stroke="#5b5170" strokeWidth={3} strokeLinecap="round" />
        <rect x={225} y={88} width={10} height={56} fill="#ead0f2" stroke="#c77ddb" strokeWidth={1} />
        {[96, 104, 112, 120, 128, 136].map((y) => (
          <line key={y} x1={225} x2={235} y1={y} y2={y} stroke="#c77ddb" strokeWidth={1} />
        ))}
        <rect x={222} y={83} width={16} height={6} rx={1.5} fill="#4b1a7a" />

        <motion.ellipse
          cy={FLOOR_Y + 1}
          ry={4}
          fill="#c77ddb"
          opacity={0.4}
          initial={{ cx: HIP_X[0], rx: SHADOW_RX[0] }}
          animate={{ cx: HIP_X, rx: SHADOW_RX }}
          transition={pose}
        />

        {/* The player */}
        <motion.g
          fill="none"
          stroke="#4b1a7a"
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ x: HIP_X[0], y: HIP_Y[0] }}
          animate={{ x: HIP_X, y: HIP_Y }}
          transition={pose}
        >
          <motion.path
            initial={{ d: BACK_LEG[0] }}
            animate={{ d: BACK_LEG }}
            transition={pose}
            opacity={0.75}
          />
          <motion.path
            initial={{ d: OTHER_ARM[0] }}
            animate={{ d: OTHER_ARM }}
            transition={pose}
            opacity={0.75}
          />
          <motion.path initial={{ d: TORSO[0] }} animate={{ d: TORSO }} transition={pose} />
          <motion.circle
            r={13}
            fill="#4b1a7a"
            stroke="none"
            initial={{ cx: HEAD_X[0], cy: HEAD_Y[0] }}
            animate={{ cx: HEAD_X, cy: HEAD_Y }}
            transition={pose}
          />
          <motion.path initial={{ d: FRONT_LEG[0] }} animate={{ d: FRONT_LEG }} transition={pose} />
          <motion.path initial={{ d: HITTING_ARM[0] }} animate={{ d: HITTING_ARM }} transition={pose} />
        </motion.g>

        {/* The ball */}
        <motion.g
          initial={{ x: BALL_X[0], y: BALL_Y[0] }}
          animate={{ x: BALL_X, y: BALL_Y }}
          transition={{ duration: IMPACT, times: BALL_TIMES, ease: BALL_EASE }}
        >
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 540 }}
            transition={{ duration: IMPACT, ease: "easeIn" }}
          >
            <BallArt x={-BALL_R} y={-BALL_R} width={BALL_R * 2} height={BALL_R * 2} />
          </motion.g>
        </motion.g>
      </motion.svg>

      {/* Purple spreading out from where the ball lands */}
      <motion.div
        className="absolute rounded-full bg-brand will-change-transform"
        style={{
          width: geo.size,
          height: geo.size,
          left: geo.x - geo.size / 2,
          top: geo.y - geo.size / 2,
        }}
        initial={{ scale: geo.startScale, opacity: 0 }}
        animate={stage === "reveal" ? { scale: 1, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={
          stage === "reveal"
            ? { duration: REVEAL, ease: "easeOut" }
            : {
                scale: { delay: IMPACT, duration: SPREAD, ease: [0.55, 0, 0.3, 1] },
                opacity: { delay: IMPACT, duration: 0 },
              }
        }
        onAnimationComplete={() => {
          if (stage === "reveal") onDone();
          else if (!covered.current) {
            covered.current = true;
            onCovered();
          }
        }}
      />
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
