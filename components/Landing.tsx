"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";

const NAME = "Thomas Stirling";
const TYPEWRITER_CHAR_DURATION = 0.08;
const TYPEWRITER_DURATION = NAME.length * TYPEWRITER_CHAR_DURATION;

const DURATION_HOLD = 1;
const EASE_SETTLE: [number, number, number, number] = [0.16, 0.9, 0.2, 1];
const SLIDE_DISTANCE = 150;
const GAP = 0.2;
const CURSOR_COLLAPSE_DURATION = 0.2;
const MIN_CURSOR_BLINKS = 3;

const SW_ENG_START = TYPEWRITER_DURATION + GAP;
const SW_ENG_SETTLED = SW_ENG_START + DURATION_HOLD;

const CURSOR_DISAPPEAR_START = SW_ENG_SETTLED + GAP;
const CURSOR_BLINK_PERIOD = CURSOR_DISAPPEAR_START / MIN_CURSOR_BLINKS;
const CURSOR_DISAPPEARED = CURSOR_DISAPPEAR_START + CURSOR_COLLAPSE_DURATION;

const PLACEHOLDER_START = CURSOR_DISAPPEARED + GAP;

export default function Landing() {
  const reducedMotion = useReducedMotion();

  const lineMotion = (delay: number, initial: { x?: number; y?: number }) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, ...initial },
          animate: { opacity: 1, x: 0, y: 0 },
          transition: { duration: DURATION_HOLD, ease: EASE_SETTLE, delay },
        };

  return (
    <section
      id="landing"
      className="flex min-h-screen scroll-mt-14 flex-col items-center justify-center gap-4 snap-start md:scroll-mt-0"
      style={
        {
          "--typewriter-width": `${NAME.length}ch`,
          "--typewriter-steps": NAME.length,
          "--typewriter-duration": `${TYPEWRITER_DURATION}s`,
          "--cursor-blink-period": `${CURSOR_BLINK_PERIOD}s`,
          "--cursor-blink-iterations": MIN_CURSOR_BLINKS,
          "--cursor-disappear-delay": `${CURSOR_DISAPPEAR_START}s`,
          "--cursor-collapse-duration": `${CURSOR_COLLAPSE_DURATION}s`,
        } as CSSProperties
      }
    >
      <h1 className="text-warm-accent flex items-baseline text-5xl">
        <span className="typewriter-text">{NAME}</span>
        <span className="typewriter-cursor" aria-hidden="true" />
      </h1>
      <motion.p
        className="motion-fallback text-cool-accent font-mono text-3xl"
        {...lineMotion(SW_ENG_START, { x: SLIDE_DISTANCE })}
      >
        Software Engineer
      </motion.p>
      <motion.p
        className="motion-fallback font-mono text-ink/60 text-sm"
        {...lineMotion(PLACEHOLDER_START, { y: SLIDE_DISTANCE })}
      >
        placeholder
      </motion.p>
    </section>
  );
}
