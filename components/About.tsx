"use client";

import MarginNote from "@/components/MarginNote";
import PhotoCarousel from "@/components/PhotoCarousel";
import { ABOUT_PHOTOS, LINKS } from "@/content/data";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const TEXT_REVEAL_START = 0.45;
const TEXT_REVEAL_END = 0.72;
const TEXT_RISE_DISTANCE = 24;

// Diagonal seam shared by both panels so their edges line up exactly.
const DIAGONAL_CLIP_PHOTO = "polygon(0 0, 62% 0, 46% 100%, 0 100%)";
const DIAGONAL_CLIP_TEXT = "polygon(46% 100%, 62% 0, 100% 0, 100% 100%)";

function QuickLinks() {
  return (
    <ul className="flex flex-wrap gap-4">
      {LINKS.map(({ label, href }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cool-accent hover:text-warm-accent font-mono text-xs transition-colors"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const textOpacity = useTransform(scrollYProgress, [TEXT_REVEAL_START, TEXT_REVEAL_END], [0, 1]);
  const textY = useTransform(
    scrollYProgress,
    [TEXT_REVEAL_START, TEXT_REVEAL_END],
    [TEXT_RISE_DISTANCE, 0],
  );

  const textBody = (
    <>
      <QuickLinks />
      <p>
        My name is Thomas Stirling. I hold a Master&rsquo;s degree in
        Computer Science from the University of Leeds (MEng &amp; BSc,
        First-Class Honours).
      </p>
      <MarginNote>
        When not shipping code, you&rsquo;ll find me on a tennis court or
        sketching something badly.
      </MarginNote>
      <p>
        My greatest interests lie in AI, ML, data, and application
        development. I&rsquo;m enthusiastic about all things tech and try to
        stay updated with the latest industry developments.
      </p>
    </>
  );

  if (reducedMotion) {
    return (
      <section
        id="about"
        className="scroll-mt-14 snap-start px-6 py-24 md:scroll-mt-0"
      >
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <PhotoCarousel photos={ABOUT_PHOTOS} />
          <div className="flex flex-col gap-4">{textBody}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-14 relative snap-start md:scroll-mt-0 md:h-[200vh]"
    >
      {/* mobile: stacked, no diagonal, no scroll-jacked reveal */}
      <div className="flex flex-col gap-8 px-6 py-24 md:hidden">
        <PhotoCarousel photos={ABOUT_PHOTOS} />
        <div className="flex flex-col gap-4">{textBody}</div>
      </div>

      {/* desktop: diagonal split, sticky two-stage reveal */}
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <div className="absolute inset-0" style={{ clipPath: DIAGONAL_CLIP_PHOTO }}>
          {/* ponytail: overlay nav centers on the full box; harmless while ABOUT_PHOTOS has <2 entries, re-check alignment once a real carousel ships */}
          <PhotoCarousel photos={ABOUT_PHOTOS} fill navPosition="overlay" />
        </div>
        <div className="bg-ground absolute inset-0" style={{ clipPath: DIAGONAL_CLIP_TEXT }}>
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="flex h-full flex-col justify-center gap-4 py-24 pr-[6%] pl-[64%]"
          >
            {textBody}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
