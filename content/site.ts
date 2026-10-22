// All site copy lives here. Components never hardcode copy.
//
// Copy that still needs Brae is wrapped in `flagged()`. Flagged copy
// renders with a visible badge on previews; production builds must not
// ship with any left (enforced once the landing page is built).
//
// Placeholder text is lorem ipsum by instruction — never invented copy.

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

export const brand = {
  name: "Be Major",
  tagline: "Make it major.",
  supporting: "Community. Opportunity. Impact.",
  email: "hello@be-major.com",
  copyright: "© 2026 BRAE Media LLC",
};

export const hero = {
  lead: "Make it",
  // Final word of the cycle is always "major" (the tagline). The rest
  // are placeholders until Brae supplies the list.
  words: [
    flagged("brae-to-write", "lorem", "Hero word list"),
    flagged("brae-to-write", "ipsum", "Hero word list"),
    flagged("brae-to-write", "dolor", "Hero word list"),
    "major",
  ] as Copy[],
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
    "Phrasing reads close to a nonprofit mission statement",
  ),
  activateLabel: "How We Activate",
  activate: flagged(
    "review",
    "Our collaborations deliver transformative programs and elevated experiences focused on art, culture, technology, and wealth literacy. By sparking curiosity and creating opportunities for enrichment, we empower individuals and organizations to transform their communities into hubs of generosity, well-being, and economic prosperity. Through innovation and leadership, we build bridges to boundless growth.",
    "\"hubs of generosity\" leans philanthropic",
  ),
  focusAreas: ["Art", "Culture", "Technology", "Wealth Literacy"],
};

export const pillars = {
  label: "Core Pillars",
  items: [
    {
      name: "Access",
      color: "coral",
      text: flagged("brae-to-write", LOREM, "Access pillar"),
    },
    {
      name: "Community Immersion",
      color: "teal",
      text: flagged("brae-to-write", LOREM, "Community Immersion pillar"),
    },
    {
      name: "Education",
      color: "periwinkle",
      text: flagged(
        "review",
        "Economic empowerment begins with knowledge. This program demystifies the wealth system, providing actionable insights and best practices for financial growth. By bridging the information gap, we equip underserved communities with the tools to build generational wealth and unlock new possibilities for success.",
        "Repurposed from Evolve Wealth Literacy; adjust \"This program\" wording and length for a pillar",
      ),
    },
  ],
};

export type Program = {
  slug: string;
  name: string;
  status: string;
  text: Copy;
  subOfferings: { name: string; text: Copy }[];
};

export const programs = {
  label: "Programs",
  cta: "Get updates",
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
    },
    {
      slug: "marketing-matrix",
      name: "The (Marketing) Matrix",
      status: "In development",
      text: "In a digital-first world, personal branding is paramount. This program teaches young professionals how to craft compelling narratives, control their stories, and leverage their talents with purpose. Participants also gain critical insights into navigating the digital landscape and avoiding online pitfalls.",
      subOfferings: [],
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
    cta: "Email us",
  },
  signup: {
    heading: "Don't Miss Major Moments",
    text: flagged("brae-to-write", LOREM_SHORT, "Signup intro"),
    fields: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      interests: "I'm interested in",
      optIn: "Yes, send me Be Major updates. Unsubscribe anytime.",
    },
    submit: "Sign up",
    success: "You're in. Watch your inbox for what's next.",
    error: "Something went wrong. Please try again.",
  },
};

export const footer = {
  privacy: "Privacy",
  terms: "Terms",
};

// Copy used only on the /type comparison page.
export const typePage = {
  title: "Type comparison",
  intro:
    "Three pairings (A has two display options), each shown with the logo, the hero line, a section headline, body text and the signup form. Same layout and colors in each; only the type changes.",
  previewNote: "Preview only. The form does not submit.",
  pairings: {
    a: {
      name: "A — Anton + Jost",
      note: "Heavy condensed display, Jost body and labels.",
    },
    a2: {
      name: "A′ — Big Shoulders Display + Jost",
      note: "Option A's alternative display face (Big Shoulders, display optical size).",
    },
    b: {
      name: "B — Jost throughout",
      note: "Heavy Jost headlines, light widely tracked uppercase labels. Closest in spirit to the logo's spaced MAJOR.",
    },
    c: {
      name: "C — Archivo Condensed Black + Manrope",
      note: "Archivo at its narrowest width and heaviest weight, Manrope body.",
    },
  },
};

export const copyText = (c: Copy) => (typeof c === "string" ? c : c.text);
