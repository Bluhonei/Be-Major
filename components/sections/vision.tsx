import { SplitLines } from "@/components/split-lines";
import { vision } from "@/content/site";

export function Vision() {
  return (
    <section id="vision" aria-labelledby="vision-label" className="px-5 py-24 md:px-12 md:py-40">
      <h2 id="vision-label" className="t-label text-base text-[var(--color-coral-deep)]">
        {vision.label}
      </h2>
      <SplitLines text={vision.text} className="t-display mt-6 max-w-[20ch] text-[clamp(2.75rem,7.6vw,7.5rem)]" />
    </section>
  );
}
