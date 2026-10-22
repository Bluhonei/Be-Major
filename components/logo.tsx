import Image from "next/image";
import { brand } from "@/content/site";

// Raster stand-in until the SVG arrives (the swash draw-in needs vector).
export function Logo({
  tone = "dark",
  className,
  priority,
}: {
  tone?: "dark" | "white";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "dark" ? "/brand/logo-dark.webp" : "/brand/logo-white.webp"}
      alt={brand.name}
      width={2000}
      height={907}
      priority={priority}
      className={className}
    />
  );
}
