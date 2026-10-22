import type { MetadataRoute } from "next";

// Nothing is indexable until launch; the real rules ship with the
// landing page and DNS cutover.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
