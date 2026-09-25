"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const DOT_SIZE = 10;
const DOT_HOVER_SCALE = 1.5;
const GLOW_SIZE = 90;
const GLOW_MAX_OPACITY = 0.35;
const GLOW_HOVER_SCALE = 2.2;
const SPRING_STIFFNESS = 300;
const SPRING_DAMPING = 30;
const OPACITY_DURATION = 0.15;

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: SPRING_STIFFNESS, damping: SPRING_DAMPING });
  const springY = useSpring(y, { stiffness: SPRING_STIFFNESS, damping: SPRING_DAMPING });

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setHoveringLink(Boolean((event.target as HTMLElement).closest("a, button")));
      setVisible(true);
    };
    const handlePointerLeave = () => setVisible(false);

    window.addEventListener("pointermove", handlePointerMove);
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reducedMotion, x, y]);

  if (reducedMotion) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[70] rounded-full"
        style={{
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, var(--cursor-color) 0%, transparent 60%)",
        }}
        animate={{
          opacity: visible ? GLOW_MAX_OPACITY : 0,
          scale: hoveringLink ? GLOW_HOVER_SCALE : 1,
        }}
        transition={{ duration: OPACITY_DURATION }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[70] rounded-full"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "var(--cursor-color)",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hoveringLink ? DOT_HOVER_SCALE : 1,
        }}
        transition={{ duration: OPACITY_DURATION }}
      />
    </>
  );
}
