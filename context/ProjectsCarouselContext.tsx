"use client";

import { PROJECTS } from "@/content/data";
import { createContext, useContext, useState, type ReactNode } from "react";

type CarouselContextValue = {
  activeIndex: number;
  count: number;
  goTo: (index: number) => void;
};

const ProjectsCarouselContext = createContext<CarouselContextValue | null>(null);

export function ProjectsCarouselProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const goTo = (index: number) =>
    setActiveIndex(Math.max(0, Math.min(PROJECTS.length - 1, index)));

  return (
    <ProjectsCarouselContext.Provider value={{ activeIndex, count: PROJECTS.length, goTo }}>
      {children}
    </ProjectsCarouselContext.Provider>
  );
}

export function useProjectsCarousel() {
  const ctx = useContext(ProjectsCarouselContext);
  if (!ctx) throw new Error("useProjectsCarousel must be used within ProjectsCarouselProvider");
  return ctx;
}
