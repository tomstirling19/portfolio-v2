export const ABOUT_PHOTOS = [{ src: "/images/thomas.jpg", alt: "Thomas Stirling" }] as const;

export const EXPERIENCE = [
  {
    role: "Backend Engineer",
    org: "Zopa Bank",
    period: "Oct 2025 — Now",
    logo: "/images/logos/zopa-bank.png",
    logoWidth: 800,
    logoHeight: 141,
  },
  {
    role: "Backend Engineer",
    org: "Sky Betting and Gaming",
    period: "Aug 2023 — Sept 2025",
    logo: "/images/logos/sky-betting-and-gaming.jpg",
    logoWidth: 530,
    logoHeight: 160,
  },
  {
    role: "Software Engineer (Full-Stack)",
    org: "Ascent",
    period: "Aug 2022 — Jul 2023",
    logo: "/images/logos/ascent.png",
    logoWidth: 200,
    logoHeight: 200,
  },
  {
    role: "Software & Data Engineer (Full-Stack)",
    org: "Airbus Defence and Space",
    period: "Sept 2021 — Aug 2022",
    logo: "/images/logos/airbus-defence-and-space.png",
    logoWidth: 640,
    logoHeight: 145,
  },
  {
    role: "Junior Software Developer (Full-Stack)",
    org: "Bytemark",
    period: "Jul 2018 — Jul 2019",
    logo: "/images/logos/bytemark.png",
    logoWidth: 300,
    logoHeight: 75,
  },
] as const;

export const PROJECTS = [
  {
    name: "Bamboo",
    description:
      "Language-learning app for custom lessons, built with Go and React Native with optional OpenAI-generated content, personalised tracking, and lesson creation across languages.",
    year: "2024",
    href: "https://github.com/tomstirling19/bamboo",
    image: "/images/projects/bamboo.jpg",
  },
  {
    name: "Fracture Detection XAI",
    description:
      "Master's dissertation: a multi-model neural network that detects and localises fractures in X-rays, segmenting the image to output a user-friendly report and heatmap.",
    year: "2021",
    href: "https://drive.google.com/file/d/17w6rHj-23qgu-jjlhJ78HoOb2I73XJ5i/view?usp=sharing",
    image: "/images/projects/fracture-detection.png",
  },
  {
    name: "Autonomous Robot Assistant",
    description:
      "Bachelor's dissertation: an autonomous robot combining face authentication, safe navigation, and destination object detection into an end-to-end assistant.",
    year: "2020",
    href: "https://gitlab.com/tomstirling/project",
    image: "/images/projects/robot-assistant.jpg",
  },
] as const;

export const INTERESTS = [
  "Films",
  "PC Gaming",
  "Fashion",
  "Hiking",
  "Tennis",
  "Football",
  "Running",
  "Cycling",
  "Music",
  "Sketching",
] as const;

export const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thomasdstirling" },
  { label: "GitHub", href: "https://github.com/tomstirling19" },
  { label: "GitLab", href: "https://gitlab.com/tomstirling" },
  { label: "Email", href: "mailto:tomstirling19@gmail.com" },
] as const;

export const CV_PATH = "/thomas-stirling-cv.pdf";
