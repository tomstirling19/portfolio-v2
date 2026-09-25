"use client";

import { SECTIONS } from "@/content/sections";
import { jumpToSection } from "@/lib/jumpToSection";
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

const ALL_IDS = ["landing", ...SECTIONS.map((section) => section.id)];

export default function Nav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id === "landing" ? null : entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    for (const id of ALL_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  // Up/Down jump a full section, matching the nav's own controlled-scroll feel.
  // Reads position straight from the DOM rather than React state, so rapid
  // keypresses in a row each see where the page actually is right now.
  useEffect(() => {
    const getCurrentIndex = () => {
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
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(input|textarea|select)$/i.test(target.tagName)) return;

      const currentIndex = getCurrentIndex();
      const nextIndex = event.key === "ArrowDown" ? currentIndex + 1 : currentIndex - 1;
      const nextId = ALL_IDS[nextIndex];
      if (!nextId) return;

      event.preventDefault();
      jumpToSection(nextId);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMobileMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <>
      <nav
        aria-label="Section navigation"
        className="fixed top-1/2 right-8 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      >
        <NavLinks activeId={activeId} />
      </nav>

      <details className="bg-ground/90 sticky top-0 z-10 backdrop-blur md:hidden">
        <summary className="font-mono text-ink cursor-pointer list-none px-4 py-3 text-sm">
          Menu
        </summary>
        <nav
          aria-label="Section navigation"
          className="flex flex-col gap-4 px-4 pb-4"
        >
          <NavLinks activeId={activeId} onNavigate={closeMobileMenu} />
        </nav>
      </details>
    </>
  );
}
