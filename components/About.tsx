"use client";

import MarginNote from "@/components/MarginNote";
import Photo from "@/components/Photo";
import { motion, useReducedMotion } from "motion/react";

const DURATION_STANDARD = 0.35;
const EASE_REVEAL: [number, number, number, number] = [0.22, 0.8, 0.32, 1];
const RISE_DISTANCE = 10;
const STAGGER = 0.08;

export default function About() {
  const reducedMotion = useReducedMotion();

  const itemMotion = (index: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: RISE_DISTANCE },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10%" },
          transition: {
            duration: DURATION_STANDARD,
            ease: EASE_REVEAL,
            delay: index * STAGGER,
          },
        };

  return (
    <section
      id="about"
      className="scroll-mt-14 snap-start py-24 md:scroll-mt-0"
    >
      <div className="mx-auto grid max-w-3xl gap-8 px-6 md:grid-cols-[1fr_180px] md:gap-x-10 md:gap-y-4">
        <motion.div className="motion-fallback md:col-span-2" {...itemMotion(0)}>
          <Photo src="/images/thomas.jpg" alt="Thomas Stirling" />
        </motion.div>
        <motion.p className="motion-fallback" {...itemMotion(1)}>
          My name is Thomas Stirling. I hold a Master&rsquo;s degree in
          Computer Science from the University of Leeds (MEng &amp; BSc,
          First-Class Honours).
        </motion.p>
        <motion.div className="motion-fallback" {...itemMotion(2)}>
          <MarginNote>
            When not shipping code, you&rsquo;ll find me on a tennis court or
            sketching something badly.
          </MarginNote>
        </motion.div>
        <motion.p className="motion-fallback" {...itemMotion(3)}>
          My greatest interests lie in AI, ML, data, and application
          development. I&rsquo;m enthusiastic about all things tech and try
          to stay updated with the latest industry developments.
        </motion.p>
      </div>
    </section>
  );
}
