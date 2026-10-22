# Be Major — be-major.com

Single-page landing site for Be Major, the community arm of BRAE Media.
Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · Vercel.

## Where things live
| What | File |
|---|---|
| All copy (flags for [REVIEW] / [BRAE TO WRITE]) | `content/site.ts` |
| Switches: launch, hero mode, hero video clips, Instagram, email | `config/site.ts` |
| Colors (only place they're defined) | `app/tokens.css` |
| Fonts (Anton + Jost, locked Oct 22, 2026) | `lib/fonts.ts` |
| Motion (all timing in CSS) | `app/globals.css`, `lib/motion.ts` |
| Flodesk signup proxy | `app/api/subscribe/route.ts` |
| Brand-language + launch guard (runs before every build) | `scripts/check-content.mjs` |
| Plans, contrast table, DNS/Flodesk plan | `docs/PHASE-0.md` |
| Brand sheet: logo, colors, type (open in a browser) | `docs/brand-sheet.html` |
| DNS records and rollback | `docs/DNS.md` |

## Status
Launched Oct 22, 2026: be-major.com on Vercel (www redirects to it), indexable in production
(`LAUNCHED = true`), signup live to Flodesk with interest segments. DNS values and rollback
are in `docs/DNS.md`.

## Hero video mode
Add Brae's clips to `HERO_VIDEO` in `config/site.ts` (MP4 + WebM, optional
portrait crops, poster image in `public/`), then set `HERO_MODE = "video"`.
With no clips listed it stays on the color fields.

## Develop
`npm install` · `npm run dev` · `npm run lint` · `npm run build`
