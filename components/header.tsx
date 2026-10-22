"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { nav, ui } from "@/content/site";

// Transparent over the hero, solid once the hero has scrolled under it.
export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 80;
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), {
      rootMargin: `-${header}px 0px 0px 0px`,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const pill = "rounded-full bg-[var(--color-white)] px-4 py-2";

  return (
    <header className={`site-header ${solid || open ? "is-solid" : ""}`}>
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        <a href="#top" className="site-header__logo block w-24 md:w-32" tabIndex={solid ? 0 : -1} aria-hidden={!solid}>
          <Logo className="h-auto w-full" />
        </a>
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className={`t-label flex gap-6 text-xs ${solid ? "" : pill}`}>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-[var(--color-blue-deep)]">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className={`t-label text-xs lg:hidden ${pill}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? ui.closeMenu : ui.menu}
        </button>
      </div>
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-[var(--color-grey)] bg-[var(--color-white)] px-4 pt-2 pb-6 lg:hidden"
      >
        <ul className="grid gap-1">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={() => setOpen(false)} className="t-display block py-2 text-4xl">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
