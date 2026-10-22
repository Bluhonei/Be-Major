import { brand } from "@/content/site";
import { LOGO_MAJOR_D, LOGO_SCRIPT_D, LOGO_VIEWBOX, LOGO_VIEWBOX_W, LOGO_VIEWBOX_X } from "@/lib/logo-paths";

// Inline SVG in currentColor, so the tone comes from the text color.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} role="img" aria-label={brand.name} className={className}>
      <path fill="currentColor" fillRule="evenodd" d={LOGO_SCRIPT_D} />
      <path fill="currentColor" fillRule="evenodd" d={LOGO_MAJOR_D} />
    </svg>
  );
}

// Hero logo with the signature intro: the script line is revealed left to
// right through a mask with a soft leading edge, so the swash reads as
// being drawn; MAJOR fades up after. With reduced motion (animations off)
// the mask rests fully open and the logo is static. One per page: the
// mask ids are fixed.
const FEATHER = 90; // soft edge width, in viewBox units
const [, VB_Y, , VB_H] = LOGO_VIEWBOX.split(" ").map(Number);

export function LogoIntro({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} role="img" aria-label={brand.name} className={`logo-intro ${className}`}>
      <defs>
        <linearGradient id="bm-swash-edge" x1="0" x2="1" y1="0" y2="0">
          <stop offset={LOGO_VIEWBOX_W / (LOGO_VIEWBOX_W + FEATHER)} stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask
          id="bm-swash-mask"
          maskUnits="userSpaceOnUse"
          x={LOGO_VIEWBOX_X - FEATHER * 2}
          y={VB_Y}
          width={LOGO_VIEWBOX_W + FEATHER * 4}
          height={VB_H}
        >
          <rect
            className="logo-intro__sweep"
            x={LOGO_VIEWBOX_X}
            y={VB_Y}
            width={LOGO_VIEWBOX_W + FEATHER}
            height={VB_H}
            fill="url(#bm-swash-edge)"
          />
        </mask>
      </defs>
      <path fill="currentColor" fillRule="evenodd" d={LOGO_SCRIPT_D} mask="url(#bm-swash-mask)" />
      <path className="logo-intro__major" fill="currentColor" fillRule="evenodd" d={LOGO_MAJOR_D} />
    </svg>
  );
}
