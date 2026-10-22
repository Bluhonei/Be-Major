// All site copy lives here. Components never hardcode copy.
//
// Copy that still needs Brae is wrapped in `flagged()`. Flagged copy
// renders with a visible badge until launch (config/site.ts SHOW_FLAGS),
// and scripts/check-content.mjs fails a launched build that still has any.
//
// Placeholder text is lorem ipsum by instruction, never invented copy.
// Brand language rule (also enforced by scripts/check-content.mjs): no
// copy may say or imply a tax-exempt organization (see scripts/check-content.mjs).

export type FlagKind = "review" | "brae-to-write" | "brae-to-supply";

export type Flagged = { text: string; flag: FlagKind; note?: string };
export type Copy = string | Flagged;

const flagged = (flag: FlagKind, text: string, note?: string): Flagged => ({
  text,
  flag,
  note,
});

const LOREM_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

export const copyText = (c: Copy) => (typeof c === "string" ? c : c.text);

export const brand = {
  name: "Be Major",
  tagline: "Make it major.",
  supporting: "Community. Opportunity. Impact.",
  parent: "BRAE Media LLC",
  copyright: "© 2026 BRAE Media LLC",
};

export const seo = {
  title: "Be Major — Make it major.",
  description:
    "Be Major is the community arm of BRAE Media. Community. Opportunity. Impact.",
  ogAlt: "Be Major — Make it major.",
};

export const ui = {
  skipToContent: "Skip to content",
  menu: "Menu",
  closeMenu: "Close menu",
  pause: "Pause",
  play: "Play",
  status: "Status",
  emailUs: "Email us",
  instagram: "Instagram",
};

export const nav = [
  { href: "#vision", label: "Vision" },
  { href: "#mission", label: "Mission" },
  { href: "#pillars", label: "Pillars" },
  { href: "#programs", label: "Programs" },
  { href: "#about", label: "About" },
  { href: "#join", label: "Join Us" },
];

// Fixed corner tab, bottom-right.
export const cornerTab = {
  join: { label: "Join Us", href: "#join" },
  partner: { label: "Partner With Us" },
};

export const hero = {
  lead: "Make it",
  // The cycle opens and closes on "major" (the tagline). The rest are
  // placeholders until Brae supplies the list.
  words: [
    flagged("brae-to-write", "lorem", "Hero word list"),
    flagged("brae-to-write", "ipsum", "Hero word list"),
    flagged("brae-to-write", "dolor", "Hero word list"),
    "major",
  ] as Copy[],
  accessible: "Make it major.",
  scrollCue: "Scroll",
};

export const vision = {
  label: "Vision",
  text: "We envision spaces where individuals are empowered to seek, achieve, and flourish. By transforming opportunities into action, we aim to build pathways that foster equity, growth, and impact.",
};

export const mission = {
  label: "Mission",
  text: flagged(
    "review",
    "Be Major is dedicated to advancing education and access equity for under-resourced programs and communities. By championing exposure and access, we create an environment where individuals can discover their potential and take bold strides toward a brighter future.",
    "Wording may drift from the brand language rule",
  ),
  activateLabel: "How We Activate",
  activate: flagged(
    "review",
    "Our collaborations deliver transformative programs and elevated experiences focused on art, culture, technology, and wealth literacy. By sparking curiosity and creating opportunities for enrichment, we empower individuals and organizations to transform their communities into hubs of generosity, well-being, and economic prosperity. Through innovation and leadership, we build bridges to boundless growth.",
    "\"hubs of generosity\" leans toward giving-sector language",
  ),
  focusAreas: ["Art", "Culture", "Technology", "Wealth Literacy"],
};

export type PillarColor = "coral" | "teal" | "periwinkle";

export const pillars = {
  label: "Core Pillars",
  items: [
    {
      name: "Access",
      color: "coral" as PillarColor,
      text: flagged("brae-to-write", LOREM, "Access pillar"),
    },
    {
      name: "Community Immersion",
      color: "teal" as PillarColor,
      text: flagged("brae-to-write", LOREM, "Community Immersion pillar"),
    },
    {
      name: "Education",
      color: "periwinkle" as PillarColor,
      text: flagged(
        "review",
        "Economic empowerment begins with knowledge. This program demystifies the wealth system, providing actionable insights and best practices for financial growth. By bridging the information gap, we equip underserved communities with the tools to build generational wealth and unlock new possibilities for success.",
        "Repurposed from Evolve Wealth Literacy; adjust \"This program\" wording and length for a pillar",
      ),
    },
  ],
};

export type Media =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; mp4: string; webm?: string; poster: string };

export type Program = {
  slug: string;
  name: string;
  status: string;
  text: Copy;
  subOfferings: { name: string; text: Copy }[];
  // Stock media from Brae. Empty → color fields with shapes.
  media: { main?: Media; inset?: Media };
  color: PillarColor | "blue";
  layout: "left" | "right" | "center";
};

export const programs = {
  label: "Programs",
  cta: "Get updates",
  subOfferingsLabel: "Includes",
  items: [
    {
      slug: "ai-anatomy",
      name: "AI Anatomy",
      status: "In development",
      text: flagged(
        "review",
        "As technology reshapes the world, we aim to ensure black and brown students lead its evolution. The AI Anatomy program equips students with the knowledge and skills to create AI models that accurately reflect diverse cultures. By addressing and eliminating biases in artificial intelligence, we empower the next generation to redefine technological innovation and representation.",
        "Demographic-specific line",
      ),
      subOfferings: [
        {
          name: "AI Made Simple",
          text: flagged("brae-to-write", LOREM_SHORT, "One-line description"),
        },
      ],
      media: {},
      color: "periwinkle",
      layout: "left",
    },
    {
      slug: "culture-collective",
      name: "Culture Collective",
      status: "In development",
      text: flagged(
        "review",
        "This program uncovers untapped talents in the culinary arts, exploring the intersection of creativity and business in the food and beverage industry. From mentorships to hands-on workshops, participants learn how to elevate their craft and seize entrepreneurial opportunities.",
        "Brae is rewriting so it is not solely culinary",
      ),
      subOfferings: [],
      media: {},
      color: "coral",
      layout: "right",
    },
    {
      slug: "marketing-matrix",
      name: "The (Marketing) Matrix",
      status: "In development",
      text: "In a digital-first world, personal branding is paramount. This program teaches young professionals how to craft compelling narratives, control their stories, and leverage their talents with purpose. Participants also gain critical insights into navigating the digital landscape and avoiding online pitfalls.",
      subOfferings: [],
      media: {},
      color: "teal",
      layout: "center",
    },
  ] as Program[],
};

export const about = {
  label: "About",
  text: flagged(
    "brae-to-supply",
    "Founded by Brandi Murphy, Be Major is dedicated to empowering individuals to aspire for more. We believe in the transformative power of exposure, education, and access.",
    "Placeholder until the trimmed version arrives",
  ),
};

export const join = {
  label: "Join Us",
  headline: "Let's reimagine what's possible and build a future that inspires us all.",
  partner: {
    heading: "Partner With Us",
    text: flagged("brae-to-write", LOREM, "Partner pitch"),
    cta: "Email hello@be-major.com",
  },
  signup: {
    heading: "Don't Miss Major Moments",
    text: flagged("brae-to-write", LOREM_SHORT, "Signup intro"),
    fields: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      interests: "I'm interested in (optional)",
      optIn: "Yes, send me Be Major updates. I can unsubscribe anytime.",
      honeypot: "Leave this field empty",
    },
    submit: "Sign up",
    sending: "Sending…",
    success: "You're in. Watch your inbox for what's next.",
    errors: {
      generic: "Something went wrong. Please try again in a moment.",
      invalid: "Please add your first name, last name and a valid email, and tick the opt-in box.",
      rateLimited: "Too many tries. Please wait a minute and try again.",
      notConfigured: "Signups aren't switched on yet. Please check back soon.",
    },
  },
};

export const footer = {
  privacy: { label: "Privacy", href: "/privacy" },
  terms: { label: "Terms", href: "/terms" },
};

export const legal = {
  privacy: {
    title: "Privacy",
    body: flagged("brae-to-supply", `${LOREM} ${LOREM}`, "Privacy policy copy"),
  },
  terms: {
    title: "Terms",
    body: flagged("brae-to-supply", `${LOREM} ${LOREM}`, "Terms copy"),
  },
  back: "Back to Be Major",
};
