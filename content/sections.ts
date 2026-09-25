export const EXPERIENCE_FIRST_ENTRY_ID = "experience-first";

export const SECTIONS = [
  { id: "landing", label: "Home", freeScroll: false, enterAnchorId: null },
  { id: "about", label: "About", freeScroll: false, enterAnchorId: null },
  {
    id: "experience",
    label: "Experience",
    freeScroll: true,
    enterAnchorId: EXPERIENCE_FIRST_ENTRY_ID,
  },
  { id: "projects", label: "Projects", freeScroll: false, enterAnchorId: null },
  { id: "interests", label: "Interests", freeScroll: false, enterAnchorId: null },
  { id: "contact", label: "Contact", freeScroll: false, enterAnchorId: null },
] as const;
