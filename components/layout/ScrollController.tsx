"use client";

import { useNavigateOneStep } from "@/hooks/useNavigateOneStep";
import { getCurrentSectionId, isFreeScrollSection } from "@/lib/getCurrentSectionIndex";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

const WHEEL_THRESHOLD = 15;

export default function ScrollController() {
  const reducedMotion = useReducedMotion();
  const navigate = useNavigateOneStep();

  useEffect(() => {
    if (reducedMotion) return;

    const handleWheel = (event: WheelEvent) => {
      const currentId = getCurrentSectionId();

      if (isFreeScrollSection(currentId)) return;

      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) {
        event.preventDefault();
        return;
      }

      if (navigate(event.deltaY > 0)) event.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [reducedMotion, navigate]);

  return null;
}
