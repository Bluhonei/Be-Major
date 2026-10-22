# Be Major landing page — Phase 0 report

Status: **plan only, nothing built.** Waiting for Brae's go-ahead. First build step after approval: font comparison page on a Vercel preview.

---

## 1. Motion approach

**Recommendation: CSS + IntersectionObserver (plus a little Web Animations API). No GSAP.**

| Option | Gzipped JS | Fit |
|---|---|---|
| CSS transitions/keyframes + one shared IntersectionObserver hook | ~2–3 KB own code | Every effect in the brief is "play once when it enters" or a time loop. None needs scroll scrubbing or pinning, which is the main thing GSAP is good for. |
| GSAP core + ScrollTrigger (+ SplitText) | ~25 KB + ~12 KB (+ ~5 KB) | Free to use now, but it's 40 KB+ of JS. Its strengths (scrubbing, pinning) are the scroll-hijack patterns we want to avoid. That weight counts against the mobile Lighthouse 90+ target. |

Global rules:
- Animate only `transform`, `opacity`, `clip-path`. No layout properties.
- One `useReveal()` hook adds `data-inview` once and then unobserves. The CSS holds all the timing.
- `@media (prefers-reduced-motion: reduce)` sets every element to its final state, and the JS checks `matchMedia` before starting loops or video.
- No smooth-scroll library and no scroll locking. Anchor links use native `scroll-behavior: smooth`, which is turned off under reduced motion.
- Loops (hero cycle, marquee, shapes) pause when off-screen (IO) and when the tab is hidden.

How each effect would work:

| Effect | Implementation |
|---|---|
| **Logo swash draw-in** | The swash is a *filled, variable-width* calligraphic shape, so `stroke-dashoffset` on the shape itself would look wrong. Instead: an SVG `<mask>` holding a thick centerline stroke that animates `stroke-dashoffset` from full to 0, revealing the filled swash left to right. Then "MAJOR" (and the "be" if separated) fades in. Under reduced motion the mask is skipped and the logo is static. **Needs:** SVG with the swash on its own path(s), plus one centerline guide path for the mask. That guide path is a hidden helper, not logo artwork, but it does involve tracing, so I'm asking first (see §6). |
| **Fixed white frame + corner tab** | `position: fixed` border frame (`pointer-events: none` except the tab). Bottom-right tab is a `clip-path: polygon()` triangle holding two CTAs rotated −45°: "Join Us" → `#join`, "Partner With Us" → `mailto:hello@be-major.com`. Mobile (≤600px): frame drops to 6px, the tab shrinks to one "Join Us" CTA, and it respects `env(safe-area-inset-*)`. |
| **Header** | Lives inside the frame. Transparent over the hero. A sentinel at the hero's bottom edge (IO) toggles `.is-solid`: white background, and the logo scales to about 60% (transform). |
| **Hero cycle (no-video mode)** | Word list from content. Timer every ~2.8s. The new color field wipes in with `clip-path: inset(0 0 0 100%) → inset(0)`. The word slides up in an `overflow:hidden` line. Grain is a tiny inline SVG `feTurbulence` tile, with a slow-drifting blurred shape layer behind it (CSS keyframes, transform only). |
| **Hero accessibility** | The real heading is static "Make it major". The cycling word is `aria-hidden` (no aria-live spam). A visible **pause/play** button covers WCAG 2.2.2, since the content auto-moves for more than 5s. |
| **Hero video mode** | `HERO_MODE = 'colors' \| 'video'` in config. Two stacked `<video muted playsinline loop preload="none">` elements crossfade (opacity). The poster is a real `<img fetchpriority="high">` so the poster or text is the LCP, not the video. Clip 1 loads after `load`; the rest load lazily, one ahead. MP4 + WebM sources. `<source media>` serves a vertical crop under 768px. Reduced motion or `navigator.connection.saveData` → poster only, which falls back to the color-cycle mode. A color overlay token keeps the text legible. |
| **Line-by-line slide-up (Vision, headlines)** | Text is split into word spans at render. On mount, words are grouped into lines by `offsetTop` (regrouped via ResizeObserver), and each line slides up from `translateY(100%)` with a 70ms stagger. No-JS / reduced motion: plain text. |
| **Section open (scaled + clipped → full)** | `clip-path: inset(6% 4% round 24px)` + `scale(.96)` → `inset(0)` + `scale(1)` on enter, played once. Used on Pillars fields and Join. |
| **Hard-edged wipes on images/text** | `clip-path: inset(0 100% 0 0) → inset(0)` on enter, with direction set per block. |
| **Marquee** | CSS `translateX(-50%)` keyframe on a duplicated track (second copy `aria-hidden`). Pauses on hover/focus. Reduced motion: a static wrapped row. |
| **Collage stagger** | CSS grid with offset columns (left/right/center per block). Media wipes in, text slides up, and the inset video plays only while in view. |

---

## 2. Build plan and components

Stack: assumed **Next.js (App Router) + TypeScript on Vercel**, matching the Bluhoneí stack, with separate repo/project. *Please confirm, and tell me if Bluhoneí uses Tailwind or CSS Modules. I'll match it but not reuse its components.*

```
content/site.ts        all copy, typed; flags: { review?: string, braeToWrite?: boolean }
config/site.ts         HERO_MODE, hero words, Instagram handle, emails, program list
styles/tokens.css      colors, type scale, spacing, motion durations (single tokens file)
app/page.tsx           single page, anchor sections
app/api/subscribe/route.ts   Flodesk proxy (server-only key)
app/sitemap.ts, app/robots.ts, app/opengraph-image.tsx
app/privacy, app/terms (pages; copy needed, see §6)
```

| # | Section | Components |
|---|---|---|
| — | Shell | `Frame`, `CornerTab`, `Header` (shrinking `Logo`), `SkipLink` |
| 1 | Hero | `Logo` (draw-in), `HeroCycler`, `ColorField`, `GrainShapes`, `HeroVideo` (mode b), `MotionToggle` |
| 2 | Vision | `SplitLines` |
| 3 | Mission + How We Activate | `SplitLines`, `RichText`, `Marquee` (Art · Culture · Technology · Wealth Literacy) |
| 4 | Core Pillars | `PillarField` ×3 (coral / teal / periwinkle, sequential open), blue frame wrapper |
| 5 | Programs | `ProgramBlock` ×3 (`layout: left/right/center`, `status` badge default "In development", `subOfferings[]` may be empty), `MediaSlot` (image / video / fallback color field with shapes), "Get updates" → `#join?program=<slug>` |
| 6 | About | `About` (placeholder flagged) |
| 7 | Join Us | `PartnerPitch` (mailto CTA), `SignupForm` (first, last, email, opt-in, honeypot, interest; idle/sending/success/error states) |
| 8 | Footer | logo, "Make it major", "Community. Opportunity. Impact.", Instagram, email, Privacy/Terms, © 2026 BRAE Media LLC |
| — | Utility | `useReveal`, `useReducedMotion`, `ReviewFlag` |

**Copy flags:** `[REVIEW]` / `[BRAE TO WRITE]` render as a bright dashed badge plus outline on preview deployments (`VERCEL_ENV !== 'production'`). A **production build fails** if any flag is still in `content/site.ts`, so a flag can't ship by accident.

**Language guard:** a build-time check fails on `foundation|charit|nonprofit|non-profit|501\(c\)|donat|tax-deductible|scholarship|internship|fellowship|funding` anywhere in content, metadata or alt text. JSON-LD will be `Organization` with `parentOrganization: BRAE Media LLC`. It will never be `NGO`.

**Placeholder copy that drifts toward charity language (flagged, not rewritten):**
- How We Activate: "transform their communities into hubs of **generosity**". This reads philanthropic.
- Mission: "advancing education and access equity for **under-resourced programs and communities**". The phrasing is nonprofit-mission-statement style.
- Education pillar: "equip **underserved communities**". Same register.
- AI Anatomy: "black and brown students" is already flagged [REVIEW]. Also note that most style guides capitalize "Black" (Brae's call).

---

## 3. Colors and contrast

Proposed tokens (brights are original, tuned around #4A80CF):

| Token | Hex | Role |
|---|---|---|
| `blue` | **#4A80CF** | Anchor, Pillars frame, large display |
| `blue-deep` | #2F64B3 | Blue text/links, blue fields that carry body text |
| `coral` | #FF7A66 | Color field only |
| `coral-deep` | #B8402F | Coral-family text/headings |
| `teal` | #2BB8A8 | Color field only |
| `teal-deep` | #0D7468 | Teal-family text/headings |
| `periwinkle` | #9A9CF2 | Color field only |
| `periwinkle-deep` | #5450C4 | Periwinkle-family text/headings |
| `ink` | #16181D | Text |
| `grey` | #F3F3F1 | Light ground |
| `white` | #FFFFFF | Ground |

WCAG contrast ratios. AA needs 4.5 for normal text and 3.0 for large text (≥24px, or ≥18.66px bold) and UI elements.

| Color | As text on white | As text on grey | White text on it | Ink text on it |
|---|---|---|---|---|
| blue #4A80CF | 3.98 ⚠ large only | 3.58 ⚠ large only | 3.98 ⚠ large only | 4.46 ⚠ large only |
| blue-deep #2F64B3 | 5.84 ✅ | 5.26 ✅ | 5.84 ✅ | 3.04 ⚠ large only |
| coral #FF7A66 | 2.55 ❌ | 2.30 ❌ | 2.55 ❌ | **6.96 ✅** |
| coral-deep #B8402F | 5.51 ✅ | 4.96 ✅ | 5.51 ✅ | 3.22 ⚠ |
| teal #2BB8A8 | 2.46 ❌ | 2.22 ❌ | 2.46 ❌ | **7.21 ✅** |
| teal-deep #0D7468 | 5.65 ✅ | 5.09 ✅ | 5.65 ✅ | 3.14 ⚠ |
| periwinkle #9A9CF2 | 2.50 ❌ | 2.25 ❌ | 2.50 ❌ | **7.11 ✅** |
| periwinkle-deep #5450C4 | 6.32 ✅ | 5.69 ✅ | 6.32 ✅ | 2.81 ❌ |
| ink #16181D | 17.76 ✅ | 15.98 ✅ | 17.76 ✅ | — |

Rules that keep everything AA:
- **Brights are fields only. All text on them is ink** (about 7:1).
- **Be Major blue #4A80CF fails AA for normal text in every pairing**, including the anchor color. It passes for large display text only, white or ink. On blue fields, body copy sits on an inset white/grey panel or the field switches to `blue-deep` with white text. Blue is never used for small text or links; use `blue-deep`.
- Deep shades are for headings and labels on white or grey.
- Hero: the giant word is ink on coral/teal/periwinkle fields and ink or white on blue (large text, ≥3:1).
- Blue next to periwinkle is only 1.59:1, so they're never used as an adjacent pair without a white gap.

---

## 4. Flodesk plan

Findings from the connected Flodesk account (read-only check, nothing changed):
- The account is Brandi Murphy (bm@bluhonei.com). Brand settings are **Bluhoneí** (Bluhoneí logo, colors and Jersey City mailing address). In Flodesk these are account-wide, so Be Major emails would default to Bluhoneí branding in the footer/header unless each email is overridden.
- Existing segments: Main Subscriber, Money Matters, Tool Results, Unengaged. There is **no Be Major segment yet**.
- **Second sending domain: not confirmed.** The Flodesk API/connector doesn't expose domain settings. Brae, please check Flodesk → Account settings → Domains, or ask Flodesk support whether the plan allows authenticating **be-major.com** alongside bluhonei.com.
- **Unsubscribes:** as far as I know, Flodesk unsubscribes are account-level, not per segment. If so, someone who unsubscribes from a Be Major email is also unsubscribed from Bluhoneí, and the reverse. Please confirm with Flodesk.

**Question for Brae:** put Be Major signups in their own segment in this account (my recommendation if you stay on one account, so lists never mix), or open a **separate Flodesk account** for Be Major? A separate account costs a second subscription but gives clean branding, its own sending domain and its own unsubscribes.

Integration (either way):
- `POST /api/subscribe` (Next.js route handler, Node runtime). It validates input, rejects silently if the honeypot is filled, applies a simple per-IP rate limit, and calls the Flodesk API with `FLODESK_API_KEY` from Vercel env. The key is never in client code and never `NEXT_PUBLIC_`.
- It creates or updates the subscriber, adds them to `Be Major — All` and, if given, the program segment (§7), and sets custom field(s).
- The opt-in checkbox is required and unchecked by default. Double opt-in is recommended (Brae to choose).
- The UI shows clear success and error states. It never reveals whether an email is already subscribed.

DNS for sending from be-major.com (exact values come from Flodesk when the domain is added):
- Flodesk domain-authentication records, typically CNAMEs for DKIM/return-path.
- SPF: only needed if Flodesk asks for it. Merge into one `v=spf1 …` TXT with the email provider's include. Never use two SPF records.
- `_dmarc` TXT. Start with `v=DMARC1; p=none; rua=mailto:…`, then tighten. Gmail/Yahoo require DMARC for bulk senders.

---

## 5. DNS cutover (Squarespace → Vercel) and hello@be-major.com

**Before anything: screenshot or export the full current DNS zone for be-major.com.** That is the rollback copy.

Order:
1. **Email first, independent of the website.** Set up hello@be-major.com now. Add MX + SPF + DKIM + DMARC at the current DNS host. The Squarespace site stays live because only mail records change. Options:
   - **Google Workspace** (if Bluhoneí uses it): add be-major.com as a secondary or alias domain, then create hello@ as a group or alias with "send as". There is usually no extra seat cost. *Recommended if Workspace is already in use. Please confirm.*
   - Forwarding only (e.g. ImprovMX, or Squarespace's own email forwarding if the domain is registered there). This is free and receive-only unless SMTP is configured.
2. Add the Flodesk sending-domain records (§4).
3. Build on Vercel preview URLs. Add `be-major.com` + `www.be-major.com` to the Vercel project. It will show "invalid configuration" until DNS changes, which is fine and doesn't affect the live site.
4. About 24–48h before cutover, lower the TTL on the apex A and www records to 300s.
5. **On Brae's approval:** remove the Squarespace default web records only (apex A records and `www` CNAME → `ext-cust.squarespace.com`). Add the records Vercel shows for the project (currently apex `A 76.76.21.21` and `www CNAME cname.vercel-dns.com`; use the values Vercel displays at that time). **Leave MX/TXT/DKIM records untouched.**
6. Vercel issues SSL automatically, usually within minutes. Then check both hosts, the www → apex redirect, the form and email delivery, and submit the sitemap in Search Console.
7. **Keep the Squarespace site/subscription active for about 2 weeks** as a fallback. Domain registration can stay at Squarespace; moving it is optional and can happen later.

**Rollback:** restore the saved apex A and www CNAME values. With a 300s TTL, most visitors are back on Squarespace within minutes. Email is unaffected because mail records never change during cutover.

**Don't lose existing signups:** export the "Don't Miss Major Moments" subscribers from Squarespace before cancelling, and import them to the Be Major segment. They opted in to Be Major updates, so they stay consented.

---

## 6. Missing assets and questions

| Item | Status |
|---|---|
| Logo, no "Foundation" version | ✅ Received dark-on-transparent and white-on-transparent. ⚠ **Both are raster (WebP, 2000×907), not SVG.** Saved in `design/logo-source/`. The swash draw-in needs vector. |
| Logo SVG | ❓ Can the designer export SVG (or AI/EPS/PDF) with the swash on separate path(s) from "be" and "MAJOR"? If not, **may I auto-vectorize the raster** (tool-based, then cleaned up) and draw a hidden centerline guide path for the mask animation? I won't trace without your OK. |
| Instagram handle | ❓ |
| Hero word list ("Make it ___") | ❓ Data-driven. I'll use clearly flagged placeholder words on preview until supplied. |
| Pillar copy: Access, Community Immersion | ❓ [BRAE TO WRITE] |
| Education pillar wording | ❓ [REVIEW] |
| AI Made Simple one-liner, Culture Collective rewrite | ❓ |
| About (trimmed version) | ❓ Placeholder in use |
| Privacy + Terms copy | ❓ Required at launch because the form collects personal data. Does BRAE Media have existing policies to adapt? |
| Stack confirmation | ❓ Next.js + (Tailwind / CSS Modules?) like Bluhoneí |
| Email provider for hello@ | ❓ Google Workspace or other? |
| Where DNS is hosted | ❓ Squarespace Domains (assumed) or another registrar? |
| OG image | I'll generate one from the logo and tokens unless you want to supply it. |
| Stock video/photos | Brae supplies them. Not needed for the first ship (color mode). |

---

## 7. Program interest on "Get updates"

**Recommend yes.** Each "Get updates" link goes to `#join` with the program pre-selected in a visible "I'm interested in" checkbox group in the form (AI Anatomy / Culture Collective / The (Marketing) Matrix). The person can change it, and it's optional.

In Flodesk: store the selection in a custom field (e.g. `be_major_interests`) **and** add the subscriber to a static segment per program (`Be Major — AI Anatomy`, etc.), plus `Be Major — All`. Program-specific sends are then one click. **Brae to confirm.** I'll create the segments only after you approve.

---

## Next step after go-ahead
Font comparison page (A: Anton/Big Shoulders + Jost · B: Jost only · C: Archivo condensed black + Manrope). Each pairing shows the hero line, a section headline, body text and the form, judged against the logo. Note: the logo's "MAJOR" is a light, widely tracked classical sans, so option B's light tracked labels will sit closest to it.
