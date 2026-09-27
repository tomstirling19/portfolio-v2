import { SECTIONS } from "@/content/sections";

export const ALL_SECTION_IDS = SECTIONS.map((section) => section.id);

const FREE_SCROLL_SECTION_IDS = new Set<string>(
  SECTIONS.filter((section) => section.freeScroll).map((section) => section.id),
);

export function isFreeScrollSection(id: string) {
  return FREE_SCROLL_SECTION_IDS.has(id);
}

let currentIndex = 0;
let observer: IntersectionObserver | null = null;
const listeners = new Set<() => void>();
const intersecting = new Array(ALL_SECTION_IDS.length).fill(false);

function recomputeCurrentIndex() {
  for (let i = intersecting.length - 1; i >= 0; i--) {
    if (intersecting[i]) return i;
  }
  return currentIndex;
}

function ensureObserver() {
  if (observer) return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const index = ALL_SECTION_IDS.findIndex((id) => id === entry.target.id);
        if (index !== -1) intersecting[index] = entry.isIntersecting;
      }
      const next = recomputeCurrentIndex();
      if (next !== currentIndex) {
        currentIndex = next;
        listeners.forEach((listener) => listener());
      }
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
  );

  ALL_SECTION_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer!.observe(el);
  });
}

export function subscribeToCurrentSection(onChange: () => void) {
  ensureObserver();
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function getCurrentSectionIndex() {
  ensureObserver();
  return currentIndex;
}

export function getCurrentSectionId() {
  return ALL_SECTION_IDS[getCurrentSectionIndex()];
}
