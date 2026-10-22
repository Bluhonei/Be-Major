"use client";

export const INTEREST_EVENT = "bemajor:interest";

// Jumps to the signup and pre-ticks this program. Without JS it is a plain
// link to #join.
export function GetUpdatesLink({ slug, label, className }: { slug: string; label: string; className?: string }) {
  return (
    <a
      href="#join"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: slug }))}
    >
      {label}
    </a>
  );
}
