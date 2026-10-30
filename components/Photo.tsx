import Image from "next/image";
import { Camera } from "lucide-react";
import type { SiteImage } from "@/content/images";
import { imageExists } from "@/lib/image-exists";

type PhotoProps = {
  image: SiteImage;
  // Tells the browser how wide the photo is shown, so it downloads the right size.
  sizes: string;
  // The wrapper fills its parent unless you give it a size or aspect ratio here.
  className?: string;
  imgClassName?: string;
  // Set on the main photo near the top of a page so it loads first.
  preload?: boolean;
};

// Shows the real photo if it exists in /public/images, otherwise a grey placeholder.
export function Photo({ image, sizes, className = "", imgClassName = "", preload }: PhotoProps) {
  const position = /\babsolute\b/.test(className) ? "" : "relative";

  if (imageExists(image.src)) {
    return (
      <div className={`${position} overflow-hidden ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          fetchPriority={preload ? "high" : undefined}
          className={`object-cover ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photo coming soon: ${image.alt}`}
      className={`${position} flex items-center justify-center overflow-hidden bg-placeholder ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(135deg,transparent_0_14px,rgba(255,255,255,0.5)_14px_15px)]"
      />
      <div className="relative flex max-w-[80%] flex-col items-center gap-2 text-center text-sm font-medium text-ink/60">
        <Camera className="size-6" aria-hidden="true" />
        <span>{image.label}</span>
      </div>
    </div>
  );
}
