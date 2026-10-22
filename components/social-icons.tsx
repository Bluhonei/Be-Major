import { INSTAGRAM, LINKEDIN } from "@/config/site";
import { ui } from "@/content/site";

// Simple line icons drawn from primitives, in currentColor.
const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "size-7",
};

function InstagramIcon() {
  return (
    <svg {...common}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg {...common}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="8" r="0.6" fill="currentColor" />
      <path d="M8 11v6M12 17v-6M12 13.5a2.5 2.5 0 0 1 5 0V17" />
    </svg>
  );
}

export function SocialIcons({ className = "" }: { className?: string }) {
  const link = "inline-flex rounded-full p-1 opacity-90 transition-opacity hover:opacity-100";
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      <li>
        <a href={INSTAGRAM.url} target="_blank" rel="noopener" aria-label={ui.instagram} className={link}>
          <InstagramIcon />
        </a>
      </li>
      <li>
        <a href={LINKEDIN.url} target="_blank" rel="noopener" aria-label={ui.linkedin} className={link}>
          <LinkedInIcon />
        </a>
      </li>
    </ul>
  );
}
