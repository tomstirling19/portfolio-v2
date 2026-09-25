"use client";

import MarginNote from "@/components/MarginNote";
import PhotoCarousel from "@/components/PhotoCarousel";
import { ABOUT_PHOTOS } from "@/content/data";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const TEXT_REVEAL_START = 0.45;
const TEXT_REVEAL_END = 0.72;
const TEXT_RISE_DISTANCE = 24;

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

  const text = (
    <>
      <p>
        My name is Thomas Stirling. I hold a Master&rsquo;s degree in Computer
        Science from the University of Leeds (MEng &amp; BSc, First-Class
        Honours).
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
          <div className="flex flex-col gap-4">{text}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-14 relative h-[200vh] snap-start md:scroll-mt-0"
    >
      <div className="sticky top-0 flex h-screen items-center px-6">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <PhotoCarousel photos={ABOUT_PHOTOS} />
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="flex flex-col gap-4"
          >
            {text}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
