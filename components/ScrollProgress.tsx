"use client";

import { motion, useScroll } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="bg-warm-accent fixed top-0 right-0 left-0 z-50 h-[3px] origin-left motion-reduce:hidden"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
