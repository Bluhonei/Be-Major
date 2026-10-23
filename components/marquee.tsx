"use client";

import { useActive } from "@/lib/motion";

// Focus-area band in Be Major blue, sitting as the top edge of the Pillars
// block (white Anton at 24px and up passes AA large text on blue).
//
// The track scrolls by half its width for a seamless loop, so it holds the
// topics four times. Only the first set is real content (a list screen
// readers hear once); the other three are decorative clones, hidden from
// assistive tech and dropped entirely under reduced motion.
const COPIES = 4;
const ITEM = "t-display flex items-center px-5 text-[clamp(1.5rem,3.2vw,2.75rem)] md:px-8";

export function Marquee({ items }: { items: string[] }) {
  const [ref, active] = useActive<HTMLDivElement>();
  const dot = <span aria-hidden className="ml-10 inline-block size-[0.18em] rounded-full bg-current md:ml-16" />;
  return (
    <div ref={ref} data-paused={!active || undefined} className="marquee border-b border-[var(--color-white)]/35 bg-[var(--color-blue)] py-3.5 text-[var(--color-white)]">
      <div className="marquee__track">
        <ul className="flex shrink-0">
          {items.map((item) => (
            <li key={item} className={ITEM}>
              {item}
              {dot}
            </li>
          ))}
        </ul>
        {Array.from({ length: COPIES - 1 }, (_, c) => (
          <div key={c} aria-hidden className="marquee__clone flex shrink-0">
            {items.map((item) => (
              <span key={item} className={ITEM}>
                {item}
                {dot}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
