"use client";

import { SECTIONS } from "@/content/sections";
import { useProjectsCarousel } from "@/context/ProjectsCarouselContext";
import { useLatestRef } from "@/hooks/useLatestRef";
import { ALL_SECTION_IDS, getCurrentSectionIndex } from "@/lib/getCurrentSectionIndex";
import { jumpToSection } from "@/lib/jumpToSection";
import { navigateOneStep } from "@/lib/navigateSection";
import { useEffect, useState, type MouseEvent } from "react";

function NavLink({
  id,
  index,
  label,
  active,
  onNavigate,
}: {
  id: string;
  index: number;
  label: string;
  active: boolean;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    jumpToSection(id);
    onNavigate?.(event);
  };

  return (
    <a
      href={`#${id}`}
      aria-current={active ? "location" : undefined}
      onClick={handleClick}
      className={`block py-1.5 font-mono text-sm transition-colors md:py-0 ${
        active ? "text-cool-accent" : "text-ink/60 hover:text-ink"
      }`}
    >
      {String(index + 1).padStart(2, "0")} {label}
    </a>
  );
}

function NavLinks({
  activeId,
  onNavigate,
}: {
  activeId: string | null;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <>
      {SECTIONS.map((section, index) => (
        <NavLink
          key={section.id}
          id={section.id}
          index={index}
          label={section.label}
          active={activeId === section.id}
          onNavigate={onNavigate}
        />
      ))}
    </>
  );
}

export default function Nav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeIndex, count, goTo } = useProjectsCarousel();
  const activeIndexRef = useLatestRef(activeIndex);

  useEffect(() => {
    const updateActiveId = () => {
      setActiveId(ALL_SECTION_IDS[getCurrentSectionIndex()]);
    };

    updateActiveId();
    window.addEventListener("scroll", updateActiveId, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveId);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(input|textarea|select)$/i.test(target.tagName)) return;

      const { navigated } = navigateOneStep(event.key === "ArrowDown", {
        activeIndex: activeIndexRef.current,
        count,
        goTo,
      });
      if (navigated) event.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [count, goTo, activeIndexRef]);

  return (
    <>
      <nav
        aria-label="Section navigation"
        className="fixed top-1/2 right-8 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      >
        <NavLinks activeId={activeId} />
      </nav>

      <div className="bg-ground/90 sticky top-0 z-10 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          className="text-ink block w-full cursor-pointer px-4 py-3 text-left font-mono text-sm"
        >
          Menu
        </button>
        <div
          inert={!mobileOpen}
          className={`grid px-4 transition-[grid-template-rows] duration-300 ease-out ${
            mobileOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
          }`}
        >
          <nav aria-label="Section navigation" className="flex flex-col gap-4 overflow-hidden">
            <NavLinks activeId={activeId} onNavigate={() => setMobileOpen(false)} />
          </nav>
        </div>
      </div>
    </>
  );
}
