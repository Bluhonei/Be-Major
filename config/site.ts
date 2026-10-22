export const SITE_URL = "https://be-major.com";

// Flip to true only at DNS cutover. While false: flagged copy shows its
// badge on every deploy, robots blocks crawling, and nothing is indexed.
// Once true, a build with flagged copy left in content/ fails.
export const LAUNCHED = false;

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
  url: "https://instagram.com/make_it_major",
};

export const CONTACT_EMAIL = "hello@be-major.com";

// Copy flags are visible everywhere until launch, then only on previews.
export const SHOW_FLAGS = !LAUNCHED || process.env.VERCEL_ENV !== "production";
