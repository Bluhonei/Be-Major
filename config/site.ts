export const SITE_URL = "https://be-major.com";

// "colors" ships first; "video" needs Brae's licensed clips.
export const HERO_MODE: "colors" | "video" = "colors";

export const INSTAGRAM = {
  handle: "make_it_major",
  url: "https://instagram.com/make_it_major",
};

// Flagged copy shows its badge everywhere except the production deploy.
export const IS_PREVIEW = process.env.VERCEL_ENV !== "production";
