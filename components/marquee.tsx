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
        <li key={i} className="t-display flex items-center px-5 text-[clamp(1.75rem,4.5vw,4rem)] md:px-8">
          {item}
          <span aria-hidden className="ml-10 inline-block size-[0.18em] rounded-full bg-current md:ml-16" />
        </li>
      ))}
    </ul>
  );
  return (
    <div ref={ref} data-paused={!active || undefined} className="marquee bg-[var(--color-black)] py-4 text-[var(--color-white)] md:py-5">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
