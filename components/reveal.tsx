"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/motion";

type Kind = "fade" | "open" | "wipe" | "wipe-left" | "wipe-up";

const CLASS: Record<Kind, string> = {
  fade: "reveal-fade",
  open: "reveal-open",
  wipe: "reveal-wipe",
  "wipe-left": "reveal-wipe reveal-wipe--left",
  "wipe-up": "reveal-wipe reveal-wipe--up",
};

export function Reveal({
  as: Tag = "div",
  kind = "fade",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  kind?: Kind;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  id?: string;
  "aria-labelledby"?: string;
}) {
  const ref = useReveal<HTMLElement>();
  const vars = { ...style, "--delay": `${delay}ms` } as CSSProperties;
  // Wipes start fully clipped, and Chrome's IntersectionObserver treats a
  // fully clipped element as invisible, so the observed element is an
  // unclipped wrapper and the clip goes on its child.
  if (kind.startsWith("wipe")) {
    return (
      <Tag ref={ref} className={className} style={style} {...rest}>
        <div className={CLASS[kind]} style={vars}>
          {children}
        </div>
      </Tag>
    );
  }
  return (
    <Tag ref={ref} className={`${CLASS[kind]} ${className}`} style={vars} {...rest}>
      {children}
    </Tag>
  );
}
