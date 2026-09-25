export const EXPERIENCE = [
  {
    role: "Backend Engineer",
    org: "Zopa Bank",
    period: "Oct 2025 — Present",
  },
  {
    role: "Backend Engineer",
    org: "Sky Betting and Gaming",
    period: "Aug 2023 — Sept 2025",
  },
  {
    role: "Software Engineer (Full-Stack)",
    org: "Ascent",
    period: "Aug 2022 — Jul 2023",
  },
  {
    role: "Software & Data Engineer (Full-Stack)",
    org: "Airbus Defence and Space",
    period: "Sept 2021 — Aug 2022",
  },
  {
    role: "Junior Software Developer (Full-Stack)",
    org: "Bytemark",
    period: "Jul 2018 — Jul 2019",
  },
] as const;

export const PROJECTS = [
  {
    name: "Bamboo",
    description:
      "Language-learning app for custom lessons, built with Go and React Native with optional OpenAI-generated content, personalised tracking, and lesson creation across languages.",
    year: "2024",
    href: "https://github.com/tomstirling19/bamboo",
  },
  {
    name: "Fracture Detection XAI",
    description:
      "Master's dissertation: a multi-model neural network that detects and localises fractures in X-rays, segmenting the image to output a user-friendly report and heatmap.",
    year: "2021",
    href: "https://drive.google.com/file/d/17w6rHj-23qgu-jjlhJ78HoOb2I73XJ5i/view?usp=sharing",
  },
  {
    name: "Autonomous Robot Assistant",
    description:
      "Bachelor's dissertation: an autonomous robot combining face authentication, safe navigation, and destination object detection into an end-to-end assistant.",
    year: "2020",
    href: "https://gitlab.com/tomstirling/project",
  },
] as const;

export const INTERESTS = [
  "Tennis",
  "Japanese casual & outdoor fashion",
  "Sketching",
  "Gaming",
] as const;

export const LINKS = [
  { label: "GitHub", href: "https://github.com/tomstirling19" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thomasdstirling" },
  { label: "Email", href: "mailto:tomstirling19@gmail.com" },
] as const;
