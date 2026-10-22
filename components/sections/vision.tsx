import { SectionLabel } from "@/components/section-label";
import { SplitLines } from "@/components/split-lines";
import { vision } from "@/content/site";

export function Vision() {
  return (
    <section id="vision" aria-labelledby="vision-label" className="px-5 py-24 md:px-12 md:py-40">
      <SectionLabel id="vision-label" tone="coral">{vision.label}</SectionLabel>
      <SplitLines text={vision.text} className="t-display mt-6 max-w-[20ch] text-[clamp(2.75rem,7.6vw,7.5rem)]" />
    </section>
  );
}
