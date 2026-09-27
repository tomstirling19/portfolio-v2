"use client";

import { MoonIcon, SunIcon } from "@/components/icons/BrandIcons";
import { THEME_COLOR_DARK, THEME_COLOR_LIGHT } from "@/lib/theme";

function setThemeColorMeta(color: string) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", color);
}

export default function ThemeToggle() {
  const toggle = () => {
    if (document.documentElement.dataset.theme === "light") {
      delete document.documentElement.dataset.theme;
      localStorage.setItem("theme", "dark");
      setThemeColorMeta(THEME_COLOR_DARK);
    } else {
      document.documentElement.dataset.theme = "light";
      localStorage.setItem("theme", "light");
      setThemeColorMeta(THEME_COLOR_LIGHT);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="border-ink/20 text-ink/65 hover:text-ink hover:border-ink/40 fixed top-4 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
    >
      <SunIcon className="theme-icon-sun h-4 w-4" />
      <MoonIcon className="theme-icon-moon h-4 w-4" />
    </button>
  );
}
