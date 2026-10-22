import Image from "next/image";
import { brand } from "@/content/site";

const SRC = { dark: "/brand/logo-dark.webp", white: "/brand/logo-white.webp" };

// Raster stand-in until the SVG arrives.
export function Logo({
  tone = "dark",
  className,
  sizes = "200px",
}: {
  tone?: "dark" | "white";
  className?: string;
  sizes?: string;
}) {
  return (
    <Image src={SRC[tone]} alt={brand.name} width={2000} height={907} sizes={sizes} className={className} />
  );
}

// Hero logo with the intro: script line wipes in, then MAJOR fades up.
// Two stacked copies of the same image, each clipped to its half.
export function LogoIntro({ tone = "dark", className = "" }: { tone?: "dark" | "white"; className?: string }) {
  const sizes = "(min-width: 768px) 560px, 80vw";
  return (
    <span className={`logo-intro ${className}`}>
      <Image
        src={SRC[tone]}
        alt={brand.name}
        width={2000}
        height={907}
        sizes={sizes}
        priority
        className="logo-intro__script h-auto w-full"
      />
      <Image
        src={SRC[tone]}
        alt=""
        aria-hidden
        width={2000}
        height={907}
        sizes={sizes}
        priority
        className="logo-intro__major h-auto w-full"
      />
    </span>
  );
}
