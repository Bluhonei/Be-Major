"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";
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
  const measure = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const words = text.split(/\s+/);

  useEffect(() => {
    const el = measure.current;
    if (!el) return;
    const group = () => {
      const spans = Array.from(el.children) as HTMLElement[];
      const out: string[][] = [];
      let top = -Infinity;
      spans.forEach((s, i) => {
        if (s.offsetTop > top + 2) {
          out.push([]);
          top = s.offsetTop;
        }
        out[out.length - 1].push(words[i]);
      });
      setLines(out.map((l) => l.join(" ")));
    };
    group();
    const ro = new ResizeObserver(group);
    ro.observe(el);
    document.fonts?.ready.then(group);
    return () => ro.disconnect();
    // words derive from text
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag ref={ref} id={id} className={`reveal-lines relative ${className}`}>
      <span className="sr-only">{text}</span>
      {/* Invisible copy used only to find line breaks at the current width. */}
      <span ref={measure} aria-hidden className="pointer-events-none invisible absolute inset-x-0 top-0">
        {words.map((w, i) => (
          <span key={i}>{w} </span>
        ))}
      </span>
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
