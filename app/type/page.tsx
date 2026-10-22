import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { TypeSpecimen } from "@/components/type-specimen";
import { brand, typePage } from "@/content/site";

export const metadata: Metadata = {
  title: typePage.title,
  robots: { index: false, follow: false },
};

const PAIRINGS = [
  { id: "a", pairingClass: "pairing-a", ...typePage.pairings.a },
  { id: "a2", pairingClass: "pairing-a2", ...typePage.pairings.a2 },
  { id: "b", pairingClass: "pairing-b", ...typePage.pairings.b },
  { id: "c", pairingClass: "pairing-c", ...typePage.pairings.c },
];

export default function TypePage() {
  return (
    <main>
      <nav className="sticky top-0 z-20 flex items-center gap-4 overflow-x-auto bg-[var(--color-white)]/95 px-5 py-3 shadow-sm backdrop-blur sm:px-10">
        <span className="shrink-0 text-xs font-semibold tracking-[0.2em] uppercase">{typePage.title}</span>
        {PAIRINGS.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className="shrink-0 rounded-full border border-[var(--color-ink)] px-3 py-1 text-sm hover:bg-[var(--color-ink)] hover:text-[var(--color-white)]"
          >
            {p.name.split(" — ")[0]}
          </a>
        ))}
      </nav>

      <section className="px-5 pt-12 pb-16 sm:px-10">
        <Logo priority className="h-auto w-56 sm:w-72" />
        <p className="mt-8 max-w-2xl text-lg">{typePage.intro}</p>
        <ul className="mt-12 grid gap-px bg-[var(--color-ink)] sm:grid-cols-2">
          {PAIRINGS.map((p) => (
            <li key={p.id} className={`${p.pairingClass} bg-[var(--color-white)]`}>
              <a href={`#${p.id}`} className="block p-6 hover:bg-[var(--color-grey)]">
                <span className="t-label block text-xs">{p.name}</span>
                <span className="t-display mt-3 block text-6xl sm:text-7xl">{brand.tagline}</span>
                <span className="t-body mt-3 block text-base">{brand.supporting}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {PAIRINGS.map((p) => (
        <TypeSpecimen key={p.id} {...p} />
      ))}
    </main>
  );
}
