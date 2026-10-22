"use client";

import { useActive } from "@/lib/motion";

// Focus-area band in Be Major blue, sitting as the top edge of the Pillars
// block (white Anton at 24px and up passes AA large text on blue). The
// track holds the list twice and scrolls by half its width for a seamless
// loop; the second copy is hidden from screen readers and dropped entirely
// under reduced motion.
export function Marquee({ items }: { items: string[] }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const row = (dupe: boolean) => (
    <ul aria-hidden={dupe || undefined} className={`flex shrink-0 ${dupe ? "marquee__dupe" : ""}`}>
      {[...items, ...items].map((item, i) => (
        <li key={i} className="t-display flex items-center px-5 text-[clamp(1.5rem,3.2vw,2.75rem)] md:px-8">
          {item}
          <span aria-hidden className="ml-10 inline-block size-[0.18em] rounded-full bg-current md:ml-16" />
        </li>
      ))}
    </ul>
  );
  return (
    <div ref={ref} data-paused={!active || undefined} className="marquee border-b border-[var(--color-white)]/35 bg-[var(--color-blue)] py-3.5 text-[var(--color-white)]">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
