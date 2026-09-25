import { SECTIONS } from "@/content/sections";

export const ALL_SECTION_IDS = ["landing", ...SECTIONS.map((section) => section.id)];

export function getCurrentSectionIndex() {
  let currentIndex = 0;
  ALL_SECTION_IDS.forEach((id, index) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 1) currentIndex = index;
  });
  return currentIndex;
}
