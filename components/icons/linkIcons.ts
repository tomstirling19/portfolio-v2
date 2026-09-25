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

export const ICON_LINKS = LINKS.filter(
  (link): link is (typeof LINKS)[number] & { label: keyof typeof LINK_ICONS } =>
    link.label in LINK_ICONS,
);
