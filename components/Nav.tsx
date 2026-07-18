"use client";

import { SECTIONS } from "@/content/sections";
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
  return (
    <a
      href={`#${id}`}
      aria-current={active ? "location" : undefined}
      onClick={onNavigate}
      className={`font-mono text-sm transition-colors ${
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const closeMobileMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <>
      <nav
        aria-label="Section navigation"
        className="fixed top-1/2 right-8 hidden -translate-y-1/2 flex-col gap-3 md:flex"
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
