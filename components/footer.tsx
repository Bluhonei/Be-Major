import { Logo } from "@/components/logo";
import { SocialIcons } from "@/components/social-icons";
import { brand, footer } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] px-5 pt-20 pb-40 text-[var(--color-white)] md:px-12 md:pb-28">
      <Logo className="h-auto w-48 md:w-64" />
      {/* Tagline as a quiet silhouette under the logo. */}
      <p className="t-display mt-4 text-6xl opacity-15 md:mt-5 md:text-9xl">{brand.tagline}</p>
      <SocialIcons className="mt-8 -ml-1" />
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
