import { CONTACT_EMAIL } from "@/config/site";
import { cornerTab } from "@/content/site";

// Fixed white viewport frame plus the diagonal corner tab (bottom-right).
// On phones the tab carries only "Join Us"; Partner With Us lives in the
// Join section and footer.
export function Frame() {
  return (
    <>
      <div aria-hidden className="frame" />
      <nav aria-label="Quick actions" className="corner-tab">
        <div className="corner-tab__links t-label text-[11px] md:text-xs">
          <a href={cornerTab.join.href} className="hover:text-[var(--color-blue-deep)]">
            {cornerTab.join.label}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="corner-tab__partner hover:text-[var(--color-blue-deep)]">
            {cornerTab.partner.label}
          </a>
        </div>
      </nav>
    </>
  );
}
