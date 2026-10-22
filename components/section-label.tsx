type Tone = "coral" | "teal" | "periwinkle" | "blue";

// Section eyebrow as a solid tag: white caps on the section's deep accent
// (all pass AA: 5.5–6.3:1), so it holds its own next to the big type
// without growing the font.
export function SectionLabel({ id, tone, children }: { id: string; tone: Tone; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="t-label inline-block px-3 py-1.5 text-sm leading-none text-[var(--color-white)]"
      style={{ background: `var(--color-${tone}-deep)` }}
    >
      {children}
    </h2>
  );
}
