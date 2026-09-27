"use client";

import { useProjectsCarousel } from "@/context/ProjectsCarouselContext";
import { useLatestRef } from "@/hooks/useLatestRef";
import { navigateOneStep } from "@/lib/navigateSection";
import { useCallback, useRef } from "react";

export function useNavigateOneStep() {
  const { activeIndex, count, goTo } = useProjectsCarousel();
  const activeIndexRef = useLatestRef(activeIndex);
  const lockedRef = useRef(false);

  return useCallback((goingDown: boolean) => {
    if (lockedRef.current) return true;

    const { navigated, done } = navigateOneStep(goingDown, {
      activeIndex: activeIndexRef.current,
      count,
      goTo,
    });

    if (navigated && done) {
      lockedRef.current = true;
      done.finally(() => {
        lockedRef.current = false;
      });
    }

    return navigated;
  }, [activeIndexRef, count, goTo]);
}
