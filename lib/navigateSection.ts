import {
  ALL_SECTION_IDS,
  getCurrentSectionIndex,
  isFreeScrollSection,
} from "@/lib/getCurrentSectionIndex";
import { jumpToSection, smoothScrollBy } from "@/lib/jumpToSection";

const FREE_SCROLL_STEP_PX = 480;

type CarouselState = {
  activeIndex: number;
  count: number;
  goTo: (index: number) => void;
};

type NavigateResult = { navigated: boolean; done?: Promise<void> };

export function navigateOneStep(goingDown: boolean, carousel: CarouselState): NavigateResult {
  const currentIndex = getCurrentSectionIndex();
  const currentId = ALL_SECTION_IDS[currentIndex];

  if (isFreeScrollSection(currentId)) {
    const step = goingDown ? FREE_SCROLL_STEP_PX : -FREE_SCROLL_STEP_PX;
    return { navigated: true, done: smoothScrollBy(step) };
  }

  if (currentId === "projects") {
    const atEnd = carousel.activeIndex >= carousel.count - 1;
    const atStart = carousel.activeIndex <= 0;
    if (goingDown && !atEnd) {
      carousel.goTo(carousel.activeIndex + 1);
      return { navigated: true };
    }
    if (!goingDown && !atStart) {
      carousel.goTo(carousel.activeIndex - 1);
      return { navigated: true };
    }
  }

  const nextId = ALL_SECTION_IDS[goingDown ? currentIndex + 1 : currentIndex - 1];
  if (!nextId) return { navigated: false };

  return { navigated: true, done: jumpToSection(nextId) };
}
