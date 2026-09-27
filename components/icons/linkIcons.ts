import { GithubIcon, GitlabIcon, LinkedinIcon, MailIcon } from "@/components/icons/BrandIcons";
import { LINKS } from "@/content/data";

export const LINK_ICONS = {
  LinkedIn: LinkedinIcon,
  GitHub: GithubIcon,
  GitLab: GitlabIcon,
  Email: MailIcon,
};

export const LINK_COLORS: Record<keyof typeof LINK_ICONS, string> = {
  LinkedIn: "#0a66c2",
  GitHub: "var(--color-ink)",
  GitLab: "#fc6d26",
  Email: "#ea4335",
};

// Contrast-safe shades of the brand colors above, for use as readable text (WCAG 4.5:1).
export const LINK_TEXT_COLORS: Record<keyof typeof LINK_ICONS, string> = {
  LinkedIn: "var(--color-link-linkedin)",
  GitHub: "var(--color-ink)",
  GitLab: "var(--color-link-gitlab)",
  Email: "var(--color-link-email)",
};

export const ICON_LINKS = LINKS.filter(
  (link): link is (typeof LINKS)[number] & { label: keyof typeof LINK_ICONS } =>
    link.label in LINK_ICONS,
);
