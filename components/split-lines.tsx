"use client";

import { useEffect, useState, type CSSProperties, type ElementType } from "react";
import { useReveal } from "@/lib/motion";

// Oversized text that slides up line by line as it enters. Words are
// grouped into the lines the browser actually laid out, and regrouped on
// resize. Server render (and no-JS) is the plain text in one line block.
export function SplitLines({
  text,
  as: Tag = "p",
  className = "",
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  const ref = useReveal<HTMLElement>(0.15);
  const [lines, setLines] = useState<string[] | null>(null);

  // Line breaks are found with a throwaway copy of the words, built and
  // removed in one pass, so the page only ever holds the screen-reader text
  // and the visible lines (no third copy for text extractors to pick up).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = text.split(/\s+/);
    const group = () => {
      const probe = document.createElement("span");
      probe.setAttribute("aria-hidden", "true");
      probe.className = "pointer-events-none invisible absolute inset-x-0 top-0";
      for (const w of words) {
        const s = document.createElement("span");
        s.textContent = `${w} `;
        probe.appendChild(s);
      }
      el.appendChild(probe);
      const out: string[][] = [];
      let top = -Infinity;
      Array.from(probe.children).forEach((s, i) => {
        const t = (s as HTMLElement).offsetTop;
        if (t > top + 2) {
          out.push([]);
          top = t;
        }
        out[out.length - 1].push(words[i]);
      });
      probe.remove();
      setLines(out.map((l) => l.join(" ")));
    };
    group();
    let width = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth === width) return;
      width = el.clientWidth;
      group();
    });
    ro.observe(el);
    document.fonts?.ready.then(group);
    return () => ro.disconnect();
  }, [text, ref]);

  return (
    <Tag ref={ref} id={id} className={`reveal-lines relative ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="block">
        {(lines ?? [text]).map((line, i) => (
          <span key={i} className="line" style={{ "--i": i } as CSSProperties}>
            <span>{line}</span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
