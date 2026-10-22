import { Copy } from "@/components/copy";
import { Reveal } from "@/components/reveal";
import { pillars } from "@/content/site";

// Be Major blue frames the section; the three pillar fields open in
// sequence (staggered on desktop, each as it enters on mobile).
export function Pillars() {
  return (
    <section id="pillars" aria-labelledby="pillars-heading" className="bg-[var(--color-blue)] px-3 py-20 md:px-8 md:py-28">
      <h2 id="pillars-heading" className="t-display px-2 text-[clamp(3.5rem,10vw,9rem)] text-[var(--color-white)] md:px-4">
        {pillars.label}
      </h2>
      <div className="mt-10 grid gap-3 md:mt-14 lg:grid-cols-3">
        {pillars.items.map((p, i) => (
          <Reveal
            key={p.name}
            kind="open"
            delay={i * 180}
            className="flex min-h-[420px] flex-col justify-between p-6 md:p-10 lg:min-h-[640px]"
            style={{ background: `var(--color-${p.color})` }}
          >
            <span className="t-display text-[clamp(5rem,12vw,9rem)] opacity-90">0{i + 1}</span>
            <div>
              <h3 className="t-display text-5xl md:text-6xl">{p.name}</h3>
              <p className="mt-5 text-lg leading-relaxed">
                <Copy value={p.text} />
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
