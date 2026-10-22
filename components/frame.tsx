import { cornerTab } from "@/content/site";

// Fixed white viewport frame plus the diagonal corner tab (bottom-right)
// carrying the Join Us CTA.
export function Frame() {
  return (
    <>
      <div aria-hidden className="frame" />
      <nav aria-label="Quick actions" className="corner-tab">
        <div className="corner-tab__links t-label text-[11px] md:text-xs">
          <a href={cornerTab.join.href} className="hover:text-[var(--color-blue-deep)]">
            {cornerTab.join.label}
          </a>
        </div>
      </nav>
    </>
  );
}
