"use client";

import { useProjectsCarousel } from "@/context/ProjectsCarouselContext";
import { useLatestRef } from "@/hooks/useLatestRef";
import { getCurrentSectionId, isFreeScrollSection } from "@/lib/getCurrentSectionIndex";
import { navigateOneStep } from "@/lib/navigateSection";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const WHEEL_THRESHOLD = 15;

export default function ScrollController() {
  const reducedMotion = useReducedMotion();
  const { activeIndex, count, goTo } = useProjectsCarousel();
  const activeIndexRef = useLatestRef(activeIndex);
  const lockedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;

    const handleWheel = (event: WheelEvent) => {
      const currentId = getCurrentSectionId();

      if (isFreeScrollSection(currentId)) return;

      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) {
        event.preventDefault();
        return;
      }

      if (lockedRef.current) {
        event.preventDefault();
        return;
      }

      const { navigated, done } = navigateOneStep(event.deltaY > 0, {
        activeIndex: activeIndexRef.current,
        count,
        goTo,
      });
      if (navigated) {
        event.preventDefault();
        if (done) {
          lockedRef.current = true;
          done.finally(() => {
            lockedRef.current = false;
          });
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [reducedMotion, count, goTo, activeIndexRef]);

  return null;
}
