import {
  ALL_SECTION_IDS,
  getCurrentSectionIndex,
  isFreeScrollSection,
} from "@/lib/getCurrentSectionIndex";
import { jumpToSection, smoothScrollBy } from "@/lib/jumpToSection";

const FREE_SCROLL_STEP_PX = 480;
const CAROUSEL_TRANSITION_MS = 700;

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

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
    if (goingDown) {
      return { navigated: true, done: smoothScrollBy(FREE_SCROLL_STEP_PX) };
    }

    const el = document.getElementById(currentId);
    const sectionTop = el ? window.scrollY + el.getBoundingClientRect().top : 0;
    const atTop = window.scrollY <= sectionTop + 1;
    const prevId = ALL_SECTION_IDS[currentIndex - 1];

    if (atTop && prevId) {
      return { navigated: true, done: jumpToSection(prevId) };
    }

    const step = Math.max(-FREE_SCROLL_STEP_PX, sectionTop - window.scrollY);
    return { navigated: true, done: smoothScrollBy(step) };
  }

  if (currentId === "projects") {
    const atEnd = carousel.activeIndex >= carousel.count - 1;
    const atStart = carousel.activeIndex <= 0;
    if (goingDown && !atEnd) {
      carousel.goTo(carousel.activeIndex + 1);
      return { navigated: true, done: wait(CAROUSEL_TRANSITION_MS) };
    }
    if (!goingDown && !atStart) {
      carousel.goTo(carousel.activeIndex - 1);
      return { navigated: true, done: wait(CAROUSEL_TRANSITION_MS) };
    }
  }

  const nextId = ALL_SECTION_IDS[goingDown ? currentIndex + 1 : currentIndex - 1];
  if (!nextId) return { navigated: false };

  return { navigated: true, done: jumpToSection(nextId) };
}
