import { LINKS } from "@/content/data";

export default function Contact() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-ink/60 max-w-md text-center">
        Always happy to talk tech, projects, or opportunities.
      </p>
      <ul className="flex flex-wrap justify-center gap-6">
        {LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cool-accent hover:text-warm-accent font-mono text-sm transition-colors"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
