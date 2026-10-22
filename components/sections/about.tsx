import { Copy } from "@/components/copy";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { about } from "@/content/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-label" className="border-t border-[var(--color-ink)]/15 px-5 py-24 md:px-12 md:py-32">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel id="about-label" tone="periwinkle">{about.label}</SectionLabel>
        </div>
        <Reveal className="grid gap-6 md:col-span-8 md:col-start-5 md:gap-8">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-2xl leading-snug font-light md:text-4xl md:leading-tight">
              <Copy value={p} />
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
