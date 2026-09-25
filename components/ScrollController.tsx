"use client";

import { SECTIONS } from "@/content/sections";
import { useProjectsCarousel } from "@/context/ProjectsCarouselContext";
import { jumpToSection } from "@/lib/jumpToSection";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const ALL_IDS = ["landing", ...SECTIONS.map((section) => section.id)];
const COOLDOWN_MS = 550;
const WHEEL_THRESHOLD = 12;

function getCurrentIndex() {
  let closestIndex = 0;
  let closestDistance = Infinity;
  ALL_IDS.forEach((id, index) => {
    const el = document.getElementById(id);
    if (!el) return;
    const distance = Math.abs(el.getBoundingClientRect().top);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });
  return closestIndex;
}

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
      window.setTimeout(() => {
        lockedRef.current = false;
      }, COOLDOWN_MS);
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
