"use client";

import { useActive } from "@/lib/motion";

// Focus-area band. The track holds the list twice and scrolls by half its
// width for a seamless loop; the second copy is hidden from screen readers
// and dropped entirely under reduced motion.
export function Marquee({ items }: { items: string[] }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const row = (dupe: boolean) => (
    <ul aria-hidden={dupe || undefined} className={`flex shrink-0 ${dupe ? "marquee__dupe" : ""}`}>
      {[...items, ...items].map((item, i) => (
        <li key={i} className="t-display flex items-center px-6 text-[clamp(3rem,9vw,8rem)] md:px-10">
          {item}
          <span aria-hidden className="ml-12 inline-block size-[0.18em] rounded-full bg-current md:ml-20" />
        </li>
      ))}
    </ul>
  );
  return (
    <div ref={ref} data-paused={!active || undefined} className="marquee bg-[var(--color-blue)] py-6 text-[var(--color-white)] md:py-8">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
