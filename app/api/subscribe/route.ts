import "server-only";
import { join } from "@/content/site";

// Signup proxy to Flodesk. The API key only ever lives in Vercel env vars.
//
// Env (Vercel → Settings → Environment Variables):
//   FLODESK_API_KEY                   required
//   FLODESK_SEGMENT_ALL               segment every Be Major signup joins
//   FLODESK_SEGMENT_<INTEREST>        optional, one per interest checkbox:
//                                     FLODESK_SEGMENT_PROGRAMS,
//                                     FLODESK_SEGMENT_EVENTS,
//                                     FLODESK_SEGMENT_COMMUNITY_OPPORTUNITIES
//   FLODESK_INTEREST_FIELD            optional custom field key; receives the
//                                     chosen interests, comma-separated
//   FLODESK_DOUBLE_OPTIN              "true" to send Flodesk's confirm email

export const runtime = "nodejs";

const FLODESK = "https://api.flodesk.com/v1";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-instance limit: 5 attempts per IP per minute.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const envKey = (slug: string) => `FLODESK_SEGMENT_${slug.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const fail = (error: string, status: number) => Response.json({ error }, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return fail("rateLimited", 429);

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return fail("invalid", 400);

  // Honeypot filled: pretend it worked, send nothing.
  if (str(body.website, 200)) return Response.json({ ok: true });

  const firstName = str(body.firstName, 80);
  const lastName = str(body.lastName, 80);
  const email = str(body.email, 254).toLowerCase();
  if (!firstName || !lastName || !EMAIL.test(email) || body.optIn !== true) return fail("invalid", 400);

  const known = new Map(join.signup.interestOptions.map((o) => [o.id, o.label]));
  const interests = Array.isArray(body.interests)
    ? [...new Set(body.interests.filter((s): s is string => typeof s === "string" && known.has(s)))]
    : [];

  const key = process.env.FLODESK_API_KEY;
  if (!key) return fail("notConfigured", 503);

  const segmentIds = [process.env.FLODESK_SEGMENT_ALL, ...interests.map((s) => process.env[envKey(s)])].filter(
    (id): id is string => Boolean(id),
  );
  const field = process.env.FLODESK_INTEREST_FIELD;

  const res = await fetch(`${FLODESK}/subscribers`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${key}:`).toString("base64")}`,
      "Content-Type": "application/json",
      "User-Agent": "be-major.com (hello@be-major.com)",
    },
    body: JSON.stringify({
      email,
      first_name: firstName,
      last_name: lastName,
      ...(segmentIds.length ? { segment_ids: segmentIds } : {}),
      ...(field && interests.length ? { custom_fields: { [field]: interests.map((s) => known.get(s)).join(", ") } } : {}),
      double_optin: process.env.FLODESK_DOUBLE_OPTIN === "true",
    }),
  }).catch(() => null);

  if (!res?.ok) {
    console.error("flodesk subscribe failed", res?.status, await res?.text().catch(() => ""));
    return fail("generic", 502);
  }
  return Response.json({ ok: true });
}
