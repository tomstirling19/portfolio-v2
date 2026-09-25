import { ALL_SECTION_IDS, getCurrentSectionIndex } from "@/lib/getCurrentSectionIndex";
import { jumpToSection } from "@/lib/jumpToSection";

type CarouselState = {
  activeIndex: number;
  count: number;
  goTo: (index: number) => void;
};

export function navigateOneStep(goingDown: boolean, carousel: CarouselState): boolean {
  const currentIndex = getCurrentSectionIndex();
  const currentId = ALL_SECTION_IDS[currentIndex];

  if (currentId === "experience") return false;

  if (currentId === "projects") {
    const atEnd = carousel.activeIndex >= carousel.count - 1;
    const atStart = carousel.activeIndex <= 0;
    if (goingDown && !atEnd) {
      carousel.goTo(carousel.activeIndex + 1);
      return true;
    }
    if (!goingDown && !atStart) {
      carousel.goTo(carousel.activeIndex - 1);
      return true;
    }
  }

  const nextId = ALL_SECTION_IDS[goingDown ? currentIndex + 1 : currentIndex - 1];
  if (!nextId) return false;

  jumpToSection(nextId);
  return true;
}
