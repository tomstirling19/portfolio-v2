import { GithubIcon, GitlabIcon, LinkedinIcon, MailIcon } from "@/components/icons/BrandIcons";
import { LINKS } from "@/content/data";

export const LINK_ICONS = {
  LinkedIn: LinkedinIcon,
  GitHub: GithubIcon,
  GitLab: GitlabIcon,
  Email: MailIcon,
};

export const ICON_LINKS = LINKS.filter(
  (link): link is (typeof LINKS)[number] & { label: keyof typeof LINK_ICONS } =>
    link.label in LINK_ICONS,
);
