import { ICON_LINKS, LINK_ICONS } from "@/components/icons/linkIcons";
import CvDownloadButton from "@/components/ui/CvDownloadButton";

export default function Contact() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h3 className="text-ink text-center font-serif text-3xl sm:text-4xl">
        Let&rsquo;s build something.
      </h3>
      <p className="text-ink/60 max-w-md text-center">
        Always happy to talk tech, projects, or opportunities.
      </p>
      <ul className="flex flex-wrap justify-center gap-4">
        {ICON_LINKS.map(({ label, href }) => {
          const Icon = LINK_ICONS[label];
          return (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="border-icon-orange/30 text-icon-orange/80 hover:border-icon-orange hover:text-icon-orange hover:bg-icon-orange/10 group flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-sm transition-colors"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            </li>
          );
        })}
      </ul>
      <CvDownloadButton />
    </div>
  );
}
