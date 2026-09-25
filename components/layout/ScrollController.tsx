"use client";

import { useProjectsCarousel } from "@/context/ProjectsCarouselContext";
import { useLatestRef } from "@/hooks/useLatestRef";
import {
  ALL_SECTION_IDS,
  getCurrentSectionIndex,
  isFreeScrollSection,
} from "@/lib/getCurrentSectionIndex";
import { navigateOneStep } from "@/lib/navigateSection";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const COOLDOWN_FALLBACK_MS = 1200;
const WHEEL_THRESHOLD = 15;

export default function ScrollController() {
  const reducedMotion = useReducedMotion();
  const { activeIndex, count, goTo } = useProjectsCarousel();
  const activeIndexRef = useLatestRef(activeIndex);
  const lockedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;

    const lock = () => {
      lockedRef.current = true;
      const unlock = () => {
        lockedRef.current = false;
        window.removeEventListener("scrollend", unlock);
      };
      window.addEventListener("scrollend", unlock, { once: true });
      window.setTimeout(unlock, COOLDOWN_FALLBACK_MS);
    };

    const handleWheel = (event: WheelEvent) => {
      const currentId = ALL_SECTION_IDS[getCurrentSectionIndex()];

      if (isFreeScrollSection(currentId)) return;

      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) {
        event.preventDefault();
        return;
      }

      if (lockedRef.current) {
        event.preventDefault();
        return;
      }

      const navigated = navigateOneStep(event.deltaY > 0, {
        activeIndex: activeIndexRef.current,
        count,
        goTo,
      });
      if (navigated) {
        event.preventDefault();
        lock();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [reducedMotion, count, goTo, activeIndexRef]);

  return null;
}
