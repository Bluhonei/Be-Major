import Image from "next/image";
import type { Media } from "@/content/site";

// Stock photo/video from Brae when supplied; otherwise a color field with
// shapes so the collage still reads as finished. Video is muted, looped,
// lazy and never autoplays under reduced motion (CSS hides it there).
export function MediaSlot({
  media,
  color,
  sizes,
  variant = "main",
  className = "",
}: {
  media?: Media;
  color: string;
  sizes: string;
  variant?: "main" | "inset";
  className?: string;
}) {
  if (media?.kind === "image") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={media.src} alt={media.alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  if (media?.kind === "video") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <video
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          poster={media.poster}
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        >
          {media.webm && <source src={media.webm} type="video/webm" />}
          <source src={media.mp4} type="video/mp4" />
        </video>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.poster} alt="" className="hidden h-full w-full object-cover motion-reduce:block" />
      </div>
    );
  }
  return (
    <div aria-hidden className={`relative overflow-hidden ${className}`} style={{ background: `var(--color-${color})` }}>
      {variant === "main" ? (
        <>
          <span className="absolute -top-[15%] -right-[20%] size-[75%] rounded-full bg-[var(--color-white)] opacity-35" />
          <span className="absolute bottom-[12%] left-[10%] h-[18%] w-[60%] -rotate-12 rounded-full bg-[var(--color-ink)] opacity-15" />
        </>
      ) : (
        <span className="absolute inset-[22%] rotate-45 bg-[var(--color-white)] opacity-40" />
      )}
    </div>
  );
}
