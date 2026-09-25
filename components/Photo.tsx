import Image from "next/image";

const WIDTH = 480;
const HEIGHT = 322;

export default function Photo({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div
        style={{ width: WIDTH, height: HEIGHT }}
        className="bg-raised text-ink/40 flex items-center justify-center rounded-md font-mono text-xs"
      >
        photo pending
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={WIDTH}
      height={HEIGHT}
      unoptimized
      className="rounded-md object-cover"
    />
  );
}
