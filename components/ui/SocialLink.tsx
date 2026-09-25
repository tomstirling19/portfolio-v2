import { LINK_COLORS, LINK_ICONS } from "@/components/icons/linkIcons";
import type { CSSProperties } from "react";

const VARIANT_CLASSES = {
  pill: "flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-sm transition-colors border-[color:color-mix(in_srgb,var(--link-color)_30%,transparent)] text-[color:color-mix(in_srgb,var(--link-color)_85%,transparent)] hover:border-[color:var(--link-color)] hover:bg-[color:color-mix(in_srgb,var(--link-color)_10%,transparent)] hover:text-[color:var(--link-color)]",
  icon: "block text-[color:var(--link-color)] transition-all hover:-translate-y-1 hover:scale-110 hover:drop-shadow-[0_0_12px_var(--link-color)]",
};

const ICON_SIZE_CLASSES = {
  pill: "h-4 w-4",
  icon: "h-9 w-9 sm:h-10 sm:w-10",
};

export function SocialLink({
  label,
  href,
  variant,
}: {
  label: keyof typeof LINK_ICONS;
  href: string;
  variant: keyof typeof VARIANT_CLASSES;
}) {
  const Icon = LINK_ICONS[label];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={variant === "icon" ? label : undefined}
      style={{ "--link-color": LINK_COLORS[label] } as CSSProperties}
      className={VARIANT_CLASSES[variant]}
    >
      <Icon className={ICON_SIZE_CLASSES[variant]} />
      {variant === "pill" && label}
    </a>
  );
}
