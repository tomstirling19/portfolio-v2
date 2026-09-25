import { ICON_LINKS } from "@/components/icons/linkIcons";
import CvDownloadButton from "@/components/ui/CvDownloadButton";
import { SocialLink } from "@/components/ui/SocialLink";

export default function Contact() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h3 className="text-ink text-center font-serif text-3xl sm:text-4xl">
        Feel free to reach out!
      </h3>
      <ul className="flex flex-wrap justify-center gap-4">
        {ICON_LINKS.map(({ label, href }) => (
          <li key={label}>
            <SocialLink label={label} href={href} variant="pill" />
          </li>
        ))}
      </ul>
      <CvDownloadButton />
    </div>
  );
}
