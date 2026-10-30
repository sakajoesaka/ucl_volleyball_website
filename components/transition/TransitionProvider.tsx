"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/use-media-query";
import type { OverlayProps, OverlayStage } from "./BallOverlay";

// The overlay (and Framer Motion with it) loads once the browser is idle, so it never
// slows down the first paint. It's kept in state rather than using next/dynamic, because
// a lazy component suspends on first render and React delays that by ~300ms.
const loadOverlay = () => import("./BallOverlay").then((m) => m.default);

// If the new page takes longer than this to arrive, reveal anyway rather than trap the user.
const MAX_HOLD_MS = 6000;

type Phase = "idle" | "play" | "hold";
type Point = { x: number; y: number } | null;

const TransitionContext = createContext<{ navigate: (href: string, origin?: Point) => boolean }>({
  navigate: () => false,
});

export const usePageTransition = () => useContext(TransitionContext);

const pathOf = (href: string) => href.split(/[?#]/)[0].replace(/\/+$/, "") || "/";

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useMediaQuery(REDUCED_MOTION);

  const [run, setRun] = useState({
    id: 0,
    phase: "idle" as Phase,
    href: "",
    origin: null as Point,
    timedOut: false,
  });
  const [Overlay, setOverlay] = useState<ComponentType<OverlayProps> | null>(null);

  // Read inside callbacks without making them change on every render.
  const live = useRef({ pathname, run, ready: false });
  useEffect(() => {
    live.current = { pathname, run, ready: Overlay !== null };
  });

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      loadOverlay()
        .then((overlay) => !cancelled && setOverlay(() => overlay))
        // If it fails to load, links simply navigate without the animation.
        .catch(() => {});
    if ("requestIdleCallback" in window) window.requestIdleCallback(load);
    else setTimeout(load, 300);
    return () => {
      cancelled = true;
    };
  }, []);

  // Returns true when the transition takes over the navigation.
  const navigate = useCallback(
    (href: string, origin: Point = null) => {
      const { pathname: current, run: active, ready } = live.current;
      // Not loaded yet (only in the first moment after opening the site): navigate normally.
      if (!ready || pathOf(href) === pathOf(current)) return false;
      if (active.phase !== "idle") return true;
      router.prefetch(href);
      setRun({ id: active.id + 1, phase: "play", href, origin, timedOut: false });
      return true;
    },
    [router],
  );

  // Called once the purple circle (or fade) fully covers the screen.
  const handleCovered = useCallback(() => {
    router.push(live.current.run.href);
    setRun((r) => ({ ...r, phase: "hold" }));
  }, [router]);

  const handleDone = useCallback(() => {
    setRun((r) => ({ ...r, phase: "idle" }));
  }, []);

  useEffect(() => {
    if (run.phase !== "hold") return;
    const timer = setTimeout(() => setRun((r) => ({ ...r, timedOut: true })), MAX_HOLD_MS);
    return () => clearTimeout(timer);
  }, [run.phase, run.id]);

  const arrived = run.phase === "hold" && (pathOf(pathname) === pathOf(run.href) || run.timedOut);
  const stage: OverlayStage = run.phase === "play" ? "play" : arrived ? "reveal" : "hold";

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      {Overlay && run.phase !== "idle" && (
        <Overlay
          key={run.id}
          stage={stage}
          reduced={reduceMotion}
          origin={run.origin}
          onCovered={handleCovered}
          onDone={handleDone}
        />
      )}
    </TransitionContext.Provider>
  );
}
