import { SECTIONS } from "@/content/sections";

export const ALL_SECTION_IDS = SECTIONS.map((section) => section.id);

const FREE_SCROLL_SECTION_IDS = new Set<string>(
  SECTIONS.filter((section) => section.freeScroll).map((section) => section.id),
);

export function isFreeScrollSection(id: string) {
  return FREE_SCROLL_SECTION_IDS.has(id);
}

export function getCurrentSectionIndex() {
  const threshold = window.innerHeight / 2;
  let currentIndex = 0;
  ALL_SECTION_IDS.forEach((id, index) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= threshold) currentIndex = index;
  });
  return currentIndex;
}

export function getCurrentSectionId() {
  return ALL_SECTION_IDS[getCurrentSectionIndex()];
}
