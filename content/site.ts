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

export const flagged = (flag: FlagKind, text: string, note?: string): Flagged => ({
  text,
  flag,
  note,
});

export const copyText = (c: Copy) => (typeof c === "string" ? c : c.text);

export const brand = {
  name: "Be Major",
  tagline: "Make it Major",
  supporting: "Community. Opportunity. Impact.",
  parent: "BRAE Media LLC",
  copyright: "© 2026 Be Major. An initiative of BRAE Media LLC.",
};

export const seo = {
  title: "Be Major — Make it Major",
  description:
    "Be Major is the community arm of BRAE Media. Community. Opportunity. Impact.",
  ogAlt: "Be Major — Make it Major",
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
  linkedin: "LinkedIn",
};

export const nav = [
  { href: "/#about", label: "About" },
  { href: "/#mission", label: "Mission" },
  { href: "/#programs", label: "Programs" },
  { href: "/#join", label: "Contact" },
];

// Fixed corner tab, bottom-right.
export const cornerTab = {
  join: { label: "Join Us", href: "/#join" },
};

export const hero = {
  lead: "Make it",
  // The cycle opens and closes on "major" (the tagline).
  words: ["possible", "happen", "count", "major"] as Copy[],
  accessible: "Make it Major",
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
      status: "Q2 / 2027",
      text: "Culture Collective brings people together through immersive experiences, creative exploration, and meaningful conversations. From the arts and culinary traditions to cultural storytelling, the program celebrates diverse perspectives while creating opportunities for discovery, connection, and collaboration.",
      subOfferings: [],
      media: {},
      color: "coral",
      layout: "left",
    },
    {
      slug: "ai-anatomy",
      name: "AI Anatomy",
      status: "Q1 / 2027",
      text: "AI Anatomy makes emerging technology more accessible through practical learning and hands-on exploration. Designed for curious minds at every stage, the program demystifies artificial intelligence, builds digital confidence, and equips participants with the knowledge to navigate an increasingly AI-driven world.",
      subOfferings: [],
      media: {},
      color: "periwinkle",
      layout: "right",
    },
    {
      slug: "marketing-matrix",
      name: "The (Marketing) Matrix",
      status: "Q1 / 2027",
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
    // Interest checkboxes. Each id maps to an optional Flodesk segment env
    // var, e.g. FLODESK_SEGMENT_COMMUNITY_OPPORTUNITIES.
    interestOptions: [
      { id: "programs", label: "Programs" },
      { id: "events", label: "Events" },
      { id: "community-opportunities", label: "Community Opportunities" },
    ],
    submit: "Keep Me Posted",
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

// Legal pages. Drafted from what the site actually does (signup form to
// Flodesk, Vercel hosting, no analytics, no cookies). The `draft` flag
// keeps the DRAFT banner up and blocks launch until Brae's review is done.
// Rendered in order: paragraphs, then list, then after.
export type LegalSection = { heading: string; paragraphs?: string[]; list?: string[]; after?: string[] };
export type LegalPage = {
  title: string;
  description: string;
  updated: string;
  draft?: Flagged;
  intro: string[];
  sections: LegalSection[];
};

const OPERATOR = "Be Major, an initiative of BRAE Media LLC";
const LEGAL_UPDATED = "October 22, 2026";

export const privacy: LegalPage = {
  title: "Privacy Policy",
  description: "How Be Major collects, uses and protects the information you share with us.",
  updated: LEGAL_UPDATED,
  draft: flagged("review", "Draft for review", "Privacy policy to be reviewed before launch"),
  intro: [
    `This Privacy Policy explains what information ${OPERATOR} (“Be Major,” “we,” “us”) collects through be-major.com (the “Site”), how we use it, and the choices you have. We keep this short because the Site collects very little.`,
  ],
  sections: [
    {
      heading: "What we collect",
      paragraphs: ["We collect information only when you choose to give it to us by signing up for updates. The signup form asks for:"],
      list: [
        "Your first name, last name and email address.",
        "The topics you're interested in, if you choose any: Programs, Events or Community Opportunities.",
        "Your consent to receive Be Major emails, which you give by ticking the opt-in box.",
      ],
    },
    {
      heading: "Information collected automatically",
      paragraphs: [
        "The Site does not use cookies, analytics, advertising pixels or tracking tools.",
        "Like any website, the Site is delivered by a hosting provider, Vercel, which processes technical information such as your IP address, browser type and the pages requested in order to serve the Site and keep it secure. When you submit the signup form, we also use your IP address briefly to limit repeated submissions and prevent spam. We do not store it with your signup.",
      ],
    },
    {
      heading: "How we use your information",
      list: [
        "To send you emails about Be Major programs, events and opportunities to get involved.",
        "To tailor those emails to the interests you selected.",
        "To confirm your subscription. We send a confirmation email, and you're added to our list only after you confirm.",
        "To respond to you when you email us.",
      ],
      after: ["We do not sell or rent your personal information."],
    },
    {
      heading: "Who we share it with",
      paragraphs: [
        "We use a small number of service providers who process information on our behalf:",
      ],
      list: [
        "Flodesk, our email provider, which stores your signup details and sends our emails.",
        "Vercel, which hosts the Site.",
      ],
    },
    {
      heading: "Your choices",
      list: [
        "Unsubscribe at any time using the link at the bottom of any Be Major email.",
        "Ask us to access, correct or delete your information by emailing hello@be-major.com.",
      ],
      after: ["We'll respond within a reasonable time and as required by applicable law."],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep your signup information while you're subscribed. If you unsubscribe or ask us to delete your information, we'll remove it or keep only what we need to honor your request, such as a record that you've unsubscribed.",
      ],
    },
    {
      heading: "Links to other sites",
      paragraphs: [
        "The Site links to our Instagram and LinkedIn pages. Those services have their own privacy policies, and we're not responsible for how they handle your information.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "The signup form is not directed to children under 13, and we do not knowingly collect personal information from them. If you believe a child has signed up, email us and we'll remove the information.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "If we change this policy, we'll post the updated version here and change the date at the top.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`${OPERATOR}. Email hello@be-major.com.`],
    },
  ],
};

export const terms: LegalPage = {
  title: "Terms of Use",
  description: "The terms that apply when you use be-major.com.",
  updated: LEGAL_UPDATED,
  draft: flagged("review", "Draft for review", "Terms to be reviewed before launch"),
  intro: [
    `These Terms of Use apply to your use of be-major.com (the “Site”), operated by ${OPERATOR} (“Be Major,” “we,” “us”). By using the Site, you agree to these terms.`,
  ],
  sections: [
    {
      heading: "Using the Site",
      paragraphs: [
        "You may use the Site for your own personal, non-commercial purposes. Please don't misuse it, including by interfering with how it works, attempting to access it in unauthorized ways, or submitting false or automated signups.",
      ],
    },
    {
      heading: "Our content",
      paragraphs: [
        "The Site's content, including text, graphics, the Be Major name and logo, belongs to BRAE Media LLC. You may not copy, modify or reuse it without our written permission, except as allowed by law.",
      ],
    },
    {
      heading: "Email updates",
      paragraphs: [
        "If you sign up for updates, you agree to receive emails from Be Major about programs, events and opportunities. You can unsubscribe at any time. Our Privacy Policy explains how we handle your information.",
      ],
    },
    {
      heading: "Programs and events",
      paragraphs: [
        "Information on the Site about programs, events and their timing is provided for general information and may change. Listing a program or date on the Site is not a guarantee that it will take place as described.",
      ],
    },
    {
      heading: "Links to other sites",
      paragraphs: [
        "The Site links to third-party services such as Instagram and LinkedIn. We don't control those sites and aren't responsible for their content or practices.",
      ],
    },
    {
      heading: "No warranties",
      paragraphs: [
        'The Site is provided “as is” and “as available.” To the fullest extent permitted by law, we make no warranties of any kind about the Site, including that it will be uninterrupted or error-free.',
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, BRAE Media LLC will not be liable for any indirect, incidental or consequential damages arising from your use of the Site.",
      ],
    },
    {
      heading: "Changes to these terms",
      paragraphs: [
        "We may update these terms from time to time. We'll post the updated version here and change the date at the top. Continuing to use the Site after an update means you accept the revised terms.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`${OPERATOR}. Email hello@be-major.com.`],
    },
  ],
};

export const legalUi = {
  lastUpdated: "Last updated",
  back: "Back to Be Major",
};
