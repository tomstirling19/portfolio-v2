import { DownloadIcon } from "@/components/icons/BrandIcons";
import { CV_PATH } from "@/content/data";

export default function CvDownloadButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CV_PATH}
      download
      className={`border-icon-orange/30 text-icon-orange/80 hover:border-icon-orange hover:text-icon-orange hover:bg-icon-orange/10 flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-sm transition-colors ${className}`}
    >
      <DownloadIcon className="h-4 w-4" />
      Download CV
    </a>
  );
}
