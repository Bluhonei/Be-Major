import { Copy } from "@/components/copy";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { mission } from "@/content/site";

export function Mission() {
  return (
    <section id="mission" aria-labelledby="mission-label" className="bg-[var(--color-grey)]">
      <div className="grid gap-14 px-5 py-24 md:grid-cols-12 md:px-12 md:py-32">
        <Reveal className="md:col-span-6">
          <SectionLabel id="mission-label" tone="teal">{mission.label}</SectionLabel>
          <p className="mt-6 text-2xl leading-snug font-light md:text-3xl">
            <Copy value={mission.text} />
          </p>
        </Reveal>
        <Reveal delay={150} className="md:col-span-5 md:col-start-8 md:pt-16">
          <h3 className="t-display text-5xl md:text-6xl">{mission.activateLabel}</h3>
          <p className="mt-6 text-lg leading-relaxed">
            <Copy value={mission.activate} />
          </p>
        </Reveal>
      </div>
      <Marquee items={mission.focusAreas} />
    </section>
  );
}
