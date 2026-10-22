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
  { href: "#about", label: "About" },
  { href: "#mission", label: "Mission" },
  { href: "#programs", label: "Programs" },
  { href: "#join", label: "Contact" },
];

// Fixed corner tab, bottom-right.
export const cornerTab = {
  join: { label: "Join Us", href: "#join" },
  partner: { label: "Partner With Us" },
};

export const hero = {
  lead: "Make it",
  // The cycle opens and closes on "major" (the tagline).
  words: ["possible", "happen", "count", "major"] as Copy[],
  accessible: "Make it major.",
  scrollCue: "Scroll",
};

export const vision = {
  label: "Vision",
  text: "A future where access isn't a privilege and opportunity is the expectation, not the exception.",
};

export const mission = {
  label: "Mission",
  text: "Be Major expands access to education, culture, and opportunity through engaging programs and experiences that introduce new perspectives, build practical skills, and connect communities to resources that move them forward.",
  activateLabel: "How We Activate",
  activate:
    "We collaborate with educators, brands, and community partners to turn ideas into experiences people can learn from and participate in. Through workshops, cultural programming, and hands-on learning, we create opportunities for connection, discovery, and practical growth.",
  focusAreas: ["Arts & Culture", "Financial Empowerment", "Education", "Technology", "Entrepreneurship"],
};

export type PillarColor = "coral" | "teal" | "periwinkle";

export const pillars = {
  label: "Pillars",
  items: [
    {
      name: "Access",
      color: "coral" as PillarColor,
      text: "We connect individuals and communities with the resources, relationships, and opportunities that open doors, remove barriers, and create pathways for meaningful advancement.",
    },
    {
      name: "Immersion",
      color: "teal" as PillarColor,
      text: "We bring people together through engaging experiences, cultural exploration, and hands-on programming that spark curiosity, broaden perspectives, and inspire new possibilities.",
    },
    {
      name: "Education",
      color: "periwinkle" as PillarColor,
      text: "We make learning accessible through practical programs that build knowledge, develop skills, and equip people to navigate opportunities with greater confidence.",
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
      slug: "culture-collective",
      name: "Culture Collective",
      status: "In development",
      text: "Culture Collective brings people together through immersive experiences, creative exploration, and meaningful conversations. From the arts and culinary traditions to cultural storytelling, the program celebrates diverse perspectives while creating opportunities for discovery, connection, and collaboration.",
      subOfferings: [],
      media: {},
      color: "coral",
      layout: "left",
    },
    {
      slug: "ai-anatomy",
      name: "AI Anatomy",
      status: "In development",
      text: "AI Anatomy makes emerging technology more accessible through practical learning and hands-on exploration. Designed for curious minds at every stage, the program demystifies artificial intelligence, builds digital confidence, and equips participants with the knowledge to navigate an increasingly AI-driven world.",
      subOfferings: [],
      media: {},
      color: "periwinkle",
      layout: "right",
    },
    {
      slug: "marketing-matrix",
      name: "The (Marketing) Matrix",
      status: "In development",
      text: "The (Marketing) Matrix explores the power of personal branding and digital storytelling. Through practical workshops and real-world insights, participants learn to shape their narratives, strengthen their professional presence, and navigate the digital landscape with confidence and intention.",
      subOfferings: [],
      media: {},
      color: "teal",
      layout: "center",
    },
  ] as Program[],
};

export const about = {
  label: "About",
  paragraphs: [
    "Founded by Brandi Murphy, Be Major is a purpose-driven organization creating meaningful opportunities through education, cultural experiences, and community engagement.",
    "We believe exposure can change perspectives, access can change circumstances, and the right experiences can change what's possible.",
  ] as Copy[],
};

export const join = {
  label: "Join Us",
  headline: "Good things happen in good company",
  partner: {
    heading: "Partner With Us",
    text: "Have an idea worth exploring? Let's connect. We collaborate with brands, organizations, and community leaders to bring thoughtful programs and experiences to life.",
    cta: "Email hello@be-major.com",
  },
  signup: {
    heading: "Don't Miss Major Moments",
    text: "Be among the first to hear about upcoming programs, events, and opportunities to get involved. Let us know what interests you.",
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
