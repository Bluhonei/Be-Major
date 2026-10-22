import { SHOW_FLAGS } from "@/config/site";
import type { Copy as CopyValue, FlagKind } from "@/content/site";

const FLAG_LABEL: Record<FlagKind, string> = {
  review: "REVIEW",
  "brae-to-write": "BRAE TO WRITE",
  "brae-to-supply": "BRAE TO SUPPLY",
};

// Renders a content value. Flagged copy gets a dashed outline and a badge
// until launch so it can't be mistaken for approved text.
export function Copy({ value }: { value: CopyValue }) {
  if (typeof value === "string") return <>{value}</>;
  if (!SHOW_FLAGS) return <>{value.text}</>;
  return (
    <span className="outline-2 outline-offset-2 outline-[var(--color-flag)] outline-dashed">
      <FlagBadge kind={value.flag} note={value.note} />
      {value.text}
    </span>
  );
}

export function FlagBadge({ kind, note }: { kind: FlagKind; note?: string }) {
  if (!SHOW_FLAGS) return null;
  return (
    <span
      title={note}
      className="mr-2 inline-block bg-[var(--color-flag)] px-1.5 py-0.5 align-middle font-sans text-[10px] leading-tight font-bold tracking-wider text-[var(--color-ink)] normal-case"
    >
      {FLAG_LABEL[kind]}
      {note ? `: ${note}` : ""}
    </span>
  );
}
