export const SITE_URL = "https://be-major.com";

// Flip to true only at DNS cutover. While false: flagged copy shows its
// badge on every deploy, robots blocks crawling, and nothing is indexed.
// Once true, a build with flagged copy left in content/ fails.
export const LAUNCHED = true;

// "colors" ships first. "video" needs Brae's licensed clips listed in
// HERO_VIDEO below; with none listed it falls back to "colors".
export const HERO_MODE: "colors" | "video" = "colors";

export type HeroClip = {
  mp4: string;
  webm: string;
  // Vertical crops for <768px. Optional; the landscape clip is used if absent.
  mp4Portrait?: string;
  webmPortrait?: string;
};
export const HERO_VIDEO: { poster: string; clips: HeroClip[] } = {
  poster: "",
  clips: [],
};

export const INSTAGRAM = {
  handle: "make_it_major",
  url: "https://www.instagram.com/make_it_major",
};

export const LINKEDIN = {
  url: "https://www.linkedin.com/company/be-major",
};

export const CONTACT_EMAIL = "hello@be-major.com";

// BRAE Media LLC's site. Leave null until that domain is live: while null,
// the footer shows the name as plain text and the structured data omits a
// URL, so production never carries a placeholder or broken link.
export const PARENT_URL: string | null = null;

// Search engines may index only the production deployment, and only after
// launch. Preview deployments are never indexable, before or after launch.
export const INDEXABLE = LAUNCHED && process.env.VERCEL_ENV === "production";

// Copy flags are visible everywhere until launch, then only on previews.
export const SHOW_FLAGS = !LAUNCHED || process.env.VERCEL_ENV !== "production";
