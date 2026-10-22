import { Logo } from "@/components/logo";
import { CONTACT_EMAIL, INSTAGRAM } from "@/config/site";
import { brand, footer, ui } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] px-5 pt-20 pb-40 text-[var(--color-white)] md:px-12 md:pb-28">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <Logo className="h-auto w-48 md:w-64" />
          <p className="t-display mt-10 text-6xl md:text-8xl">{brand.tagline}</p>
          <p className="t-label mt-4 text-xs">{brand.supporting}</p>
        </div>
        <ul className="grid content-end gap-3 text-lg md:col-span-4 md:col-start-9">
          <li>
            <a href={INSTAGRAM.url} rel="noopener" target="_blank" className="hover:underline">
              {ui.instagram} @{INSTAGRAM.handle}
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
              {CONTACT_EMAIL}
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--color-white)]/20 pt-6 text-sm">
        <a href={footer.privacy.href} className="hover:underline">
          {footer.privacy.label}
        </a>
        <a href={footer.terms.href} className="hover:underline">
          {footer.terms.label}
        </a>
        <span>{brand.copyright}</span>
      </div>
    </footer>
  );
}
