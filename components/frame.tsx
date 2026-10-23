import { cornerTab } from "@/content/site";

// Fixed white viewport frame plus the diagonal corner tab (bottom-right)
// carrying the Join Us CTA. Long-form pages turn the tab off: it is fixed,
// so it would cover line ends at every scroll position on a phone.
export function Frame({ cornerTab: showTab = true }: { cornerTab?: boolean }) {
  return (
    <>
      <div aria-hidden className="frame" />
      {showTab && (
        <nav aria-label="Quick actions" className="corner-tab">
          <div className="corner-tab__links t-label text-[11px] md:text-xs">
            <a href={cornerTab.join.href} className="hit hover:text-[var(--color-blue-deep)]">
              {cornerTab.join.label}
            </a>
          </div>
        </nav>
      )}
    </>
  );
}
