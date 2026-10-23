import { Logo } from "@/components/logo";
import { SocialIcons } from "@/components/social-icons";
import { PARENT_URL } from "@/config/site";
import { brand, footer } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] px-5 pt-20 pb-40 text-[var(--color-white)] md:px-12 md:pb-28">
      <Logo className="h-auto w-48 md:w-64" />
      {/* Tagline as a quiet silhouette under the logo. Purely decorative (the
          same line is the page's h1), so it's drawn by CSS from data-text:
          no DOM text for screen readers, contrast checks or text extraction. */}
      <p aria-hidden data-text={brand.tagline} className="silhouette t-display mt-4 text-6xl opacity-15 md:mt-5 md:text-9xl" />
      <SocialIcons className="mt-8 -ml-1" />
      <div className="t-label mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--color-white)]/20 pt-6 text-[11px]">
        <a href={footer.privacy.href} className="hit hover:underline">
          {footer.privacy.label}
        </a>
        <a href={footer.terms.href} className="hit hover:underline">
          {footer.terms.label}
        </a>
        <span>
          {brand.copyright}{" "}
          {PARENT_URL ? (
            <a href={PARENT_URL} className="hit underline-offset-4 hover:underline">
              {brand.parent}
            </a>
          ) : (
            brand.parent
          )}
          .
        </span>
      </div>
    </footer>
  );
}
