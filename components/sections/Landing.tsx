"use client";

import { ICON_LINKS } from "@/components/icons/linkIcons";
import CvDownloadButton from "@/components/ui/CvDownloadButton";
import { SocialLink } from "@/components/ui/SocialLink";
import { DURATION_HOLD, EASE_SETTLE_MOTION, SLIDE_DISTANCE } from "@/lib/revealMotion";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { CSSProperties } from "react";
import { useRef } from "react";

const NAME = "Thomas Stirling";
const TYPEWRITER_CHAR_DURATION = 0.08;
const TYPEWRITER_DURATION = NAME.length * TYPEWRITER_CHAR_DURATION;

const GAP = 0.15;
const CURSOR_COLLAPSE_DURATION = 0.2;
const MIN_CURSOR_BLINKS = 3;

const SW_ENG_START = TYPEWRITER_DURATION + GAP;
const SW_ENG_SETTLED = SW_ENG_START + DURATION_HOLD;

const CURSOR_DISAPPEAR_START = SW_ENG_SETTLED + GAP;
const CURSOR_BLINK_PERIOD = CURSOR_DISAPPEAR_START / MIN_CURSOR_BLINKS;
const CURSOR_DISAPPEARED = CURSOR_DISAPPEAR_START + CURSOR_COLLAPSE_DURATION;

const ICONS_GAP = 0.05;
const ICONS_START = CURSOR_DISAPPEARED + ICONS_GAP;

const CV_BUTTON_START = ICONS_START + GAP;

export default function Landing() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const exitOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const lineMotion = (delay: number, initial: { x?: number; y?: number }) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, ...initial },
          animate: { opacity: 1, x: 0, y: 0 },
          transition: { duration: DURATION_HOLD, ease: EASE_SETTLE_MOTION, delay },
        };

  return (
    <section
      id="landing"
      ref={sectionRef}
      className="flex min-h-screen scroll-mt-14 flex-col items-center justify-center gap-4 px-6 snap-start md:scroll-mt-0 [scroll-snap-stop:always]"
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
      <motion.div
        style={reducedMotion ? undefined : { scale: exitScale, opacity: exitOpacity }}
        className="flex flex-col items-center gap-4"
      >
        <h1 className="text-warm-accent flex items-baseline text-4xl sm:text-5xl lg:text-6xl">
          <span className="typewriter-text">{NAME}</span>
          <span className="typewriter-cursor" aria-hidden="true" />
        </h1>
        <motion.p
          className="motion-fallback text-cool-accent font-mono text-xl sm:text-2xl md:text-3xl"
          {...lineMotion(SW_ENG_START, { x: SLIDE_DISTANCE })}
        >
          Software Engineer
        </motion.p>
        <motion.ul
          className="motion-fallback mt-2 flex items-center gap-6"
          {...lineMotion(ICONS_START, { y: SLIDE_DISTANCE })}
        >
          {ICON_LINKS.map(({ label, href }) => (
            <li key={label}>
              <SocialLink label={label} href={href} variant="icon" />
            </li>
          ))}
        </motion.ul>
        <motion.div
          className="motion-fallback mt-2"
          {...lineMotion(CV_BUTTON_START, { y: SLIDE_DISTANCE })}
        >
          <CvDownloadButton />
        </motion.div>
      </motion.div>
    </section>
  );
}
