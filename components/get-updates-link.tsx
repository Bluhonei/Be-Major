"use client";

export const INTEREST_EVENT = "bemajor:interest";

// Jumps to the signup and pre-ticks the given interest. Without JS it is a
// plain link to #join.
export function GetUpdatesLink({ interest, label, className }: { interest: string; label: string; className?: string }) {
  return (
    <a
      href="#join"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: interest }))}
    >
      {label}
    </a>
  );
}
