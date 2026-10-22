import { Copy } from "@/components/copy";
import { Reveal } from "@/components/reveal";
import { about } from "@/content/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-label" className="border-t border-[var(--color-ink)]/15 px-5 py-24 md:px-12 md:py-32">
      <div className="grid gap-8 md:grid-cols-12">
        <h2 id="about-label" className="t-label text-xs text-[var(--color-periwinkle-deep)] md:col-span-3">
          {about.label}
        </h2>
        <Reveal className="md:col-span-8 md:col-start-5">
          <p className="text-2xl leading-snug font-light md:text-4xl md:leading-tight">
            <Copy value={about.text} />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
