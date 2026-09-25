import { SECTIONS } from "@/content/sections";

export const ALL_SECTION_IDS = ["landing", ...SECTIONS.map((section) => section.id)];

// The last section whose top has scrolled to/past the viewport top is the
// current one. A nearest-top-by-distance check flips early on an oversized
// section (e.g. experience): partway through its scroll, the *next*
// section's top can already sit numerically closer to 0 than experience's
// own (deeply negative) top, even though the viewport is still inside it.
export function getCurrentSectionIndex() {
  let currentIndex = 0;
  ALL_SECTION_IDS.forEach((id, index) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 1) currentIndex = index;
  });
  return currentIndex;
}
