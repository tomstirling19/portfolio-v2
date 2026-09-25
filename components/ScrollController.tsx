"use client";

import { useProjectsCarousel } from "@/context/ProjectsCarouselContext";
import { ALL_SECTION_IDS as ALL_IDS, getCurrentSectionIndex as getCurrentIndex } from "@/lib/getCurrentSectionIndex";
import { jumpToSection } from "@/lib/jumpToSection";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

// Jump distance (e.g. from wherever the user stopped inside free-scrolling
// experience) varies too much for a fixed timer — a short one unlocks mid-
// glide and a new wheel tick interrupts the scroll, leaving it half-settled.
// scrollend fires when the animation actually finishes; this is just the
// safety net if a browser doesn't support that event.
const COOLDOWN_FALLBACK_MS = 1200;
// A single mouse-wheel "click" or light trackpad touch easily sends 12-40px
// deltas; too low a threshold made any incidental nudge trigger a full jump.
const WHEEL_THRESHOLD = 40;

/**
 * Owns wheel-driven navigation between single-viewport sections and the
 * projects carousel. "experience" is deliberately excluded — it's taller
 * than the viewport, and native free-scroll is what lets every entry
 * actually pass through the magnification point instead of getting
 * blown past by trackpad momentum.
 */
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

      // Tall, free-scrolling section: let native scroll + CSS snap own it,
      // including small residual deltas from trackpad momentum.
      if (currentId === "experience") return;

      // Every other section: we own ALL wheel input here, full stop — even
      // sub-threshold deltas, so residual momentum can't drift the page off
      // its snapped position once we've placed it there.
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
        // At a carousel boundary: fall through to the normal section jump.
      }

      const nextId = ALL_IDS[goingDown ? currentIndex + 1 : currentIndex - 1];
      if (!nextId) return; // top/bottom of the page: allow native rubber-band

      event.preventDefault();
      jumpToSection(nextId);
      lock();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [reducedMotion, count, goTo]);

  return null;
}
