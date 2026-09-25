"use client";

import { useProjectsCarousel } from "@/context/ProjectsCarouselContext";
import { ALL_SECTION_IDS as ALL_IDS, getCurrentSectionIndex as getCurrentIndex } from "@/lib/getCurrentSectionIndex";
import { jumpToSection } from "@/lib/jumpToSection";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const COOLDOWN_FALLBACK_MS = 1200;
const WHEEL_THRESHOLD = 15;

export default function ScrollController() {
  const reducedMotion = useReducedMotion();
  const { activeIndex, count, goTo } = useProjectsCarousel();
  const activeIndexRef = useRef(activeIndex);
  const lockedRef = useRef(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

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
      const currentIndex = getCurrentIndex();
      const currentId = ALL_IDS[currentIndex];

      if (currentId === "experience") return;

      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) {
        event.preventDefault();
        return;
      }

      if (lockedRef.current) {
        event.preventDefault();
        return;
      }

      const goingDown = event.deltaY > 0;

      if (currentId === "projects") {
        const atEnd = activeIndexRef.current >= count - 1;
        const atStart = activeIndexRef.current <= 0;
        if (goingDown && !atEnd) {
          event.preventDefault();
          goTo(activeIndexRef.current + 1);
          lock();
          return;
        }
        if (!goingDown && !atStart) {
          event.preventDefault();
          goTo(activeIndexRef.current - 1);
          lock();
          return;
        }
      }

      const nextId = ALL_IDS[goingDown ? currentIndex + 1 : currentIndex - 1];
      if (!nextId) return;

      event.preventDefault();
      jumpToSection(nextId);
      lock();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [reducedMotion, count, goTo]);

  return null;
}
