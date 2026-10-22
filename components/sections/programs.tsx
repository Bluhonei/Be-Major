import { Copy } from "@/components/copy";
import { GetUpdatesLink } from "@/components/get-updates-link";
import { MediaSlot } from "@/components/media-slot";
import { Reveal } from "@/components/reveal";
import { SplitLines } from "@/components/split-lines";
import { programs, type Program } from "@/content/site";

export function Programs() {
  return (
    <section id="programs" aria-labelledby="programs-heading" className="px-5 py-24 md:px-12 md:py-36">
      <SplitLines as="h2" id="programs-heading" text={programs.label} className="t-display text-[clamp(3.5rem,10vw,9rem)]" />
      <div className="mt-16 grid gap-28 md:mt-24 md:gap-40">
        {programs.items.map((p) => (
          <ProgramBlock key={p.slug} program={p} />
        ))}
      </div>
    </section>
  );
}

// Staggered collage: main media offset left, right or center around the
// text, with a small inset media tile overlapping its corner.
function ProgramBlock({ program: p }: { program: Program }) {
  const center = p.layout === "center";
  const mediaCol = center
    ? "md:col-span-8 md:col-start-3"
    : p.layout === "left"
      ? "md:col-span-7"
      : "md:col-span-7 md:col-start-6 md:row-start-1";
  const textCol = center
    ? "md:col-span-8 md:col-start-3"
    : p.layout === "left"
      ? "md:col-span-4 md:col-start-9 md:self-end"
      : "md:col-span-4 md:col-start-1 md:row-start-1 md:self-end";
  const insetPos = p.layout === "right" ? "-left-4 md:-left-12" : "-right-4 md:-right-12";

  return (
    <article aria-labelledby={`program-${p.slug}`} className="grid gap-10 md:grid-cols-12 md:gap-8">
      <div className={`relative ${mediaCol}`}>
        <Reveal kind={p.layout === "right" ? "wipe-left" : "wipe"}>
          <MediaSlot
            media={p.media.main}
            color={p.color}
            sizes="(min-width: 768px) 58vw, 100vw"
            className={center ? "aspect-[16/9]" : "aspect-[4/5] md:aspect-[5/6]"}
          />
        </Reveal>
        <Reveal kind="wipe-up" delay={350} className={`absolute -bottom-8 w-[38%] md:-bottom-14 ${insetPos}`}>
          <MediaSlot
            media={p.media.inset}
            color={p.color === "blue" ? "periwinkle" : "blue"}
            sizes="(min-width: 768px) 22vw, 38vw"
            variant="inset"
            className="aspect-square border-[6px] border-[var(--color-white)]"
          />
        </Reveal>
      </div>
      <Reveal delay={200} className={`${textCol} ${center ? "md:text-center" : ""} pt-6`}>
        <p className="t-label inline-block border border-[var(--color-ink)] px-3 py-1.5 text-[11px]">{p.status}</p>
        <h3 id={`program-${p.slug}`} className="t-display mt-5 text-[clamp(3rem,6vw,5.5rem)]">
          {p.name}
        </h3>
        <p className="mt-5 text-lg leading-relaxed">
          <Copy value={p.text} />
        </p>
        {p.subOfferings.length > 0 && (
          <div className="mt-6 border-t border-[var(--color-ink)] pt-4">
            <p className="t-label text-[11px] text-[var(--color-blue-deep)]">{programs.subOfferingsLabel}</p>
            <ul className="mt-3 grid gap-3">
              {p.subOfferings.map((s) => (
                <li key={s.name}>
                  <span className="font-semibold">{s.name}.</span> <Copy value={s.text} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <GetUpdatesLink
          slug={p.slug}
          label={programs.cta}
          className="t-label mt-8 inline-block bg-[var(--color-ink)] px-7 py-4 text-xs text-[var(--color-white)] hover:bg-[var(--color-blue-deep)]"
        />
      </Reveal>
    </article>
  );
}
