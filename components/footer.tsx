import { Logo } from "@/components/logo";
import { SocialIcons } from "@/components/social-icons";
import { CONTACT_EMAIL } from "@/config/site";
import { brand, footer } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] px-5 pt-20 pb-40 text-[var(--color-white)] md:px-12 md:pb-28">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <Logo className="h-auto w-48 md:w-64" />
          {/* Tagline as a quiet silhouette behind the footer content. */}
          <p className="t-display mt-10 text-6xl opacity-15 md:text-9xl">{brand.tagline}</p>
        </div>
        <div className="grid content-end gap-5 md:col-span-4 md:col-start-9">
          <SocialIcons />
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg hover:underline">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
      <div className="t-label mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--color-white)]/20 pt-6 text-[11px]">
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
