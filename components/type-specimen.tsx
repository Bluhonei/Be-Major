import { Copy } from "@/components/copy";
import { HeroLine } from "@/components/hero-line";
import { Logo } from "@/components/logo";
import { SignupFormPreview } from "@/components/signup-form-preview";
import { brand, mission, vision } from "@/content/site";

// One full pairing: logo, hero line, section headlines, body, form.
// Fonts come from the pairing class (app/globals.css), nothing else.
export function TypeSpecimen({
  id,
  pairingClass,
  name,
  note,
}: {
  id: string;
  pairingClass: string;
  name: string;
  note: string;
}) {
  return (
    <section id={id} aria-label={name} className={`${pairingClass} scroll-mt-16 border-t-8 border-[var(--color-ink)]`}>
      <header className="flex flex-wrap items-end justify-between gap-6 px-5 pt-10 pb-8 sm:px-10">
        <div>
          <p className="t-label text-xs text-[var(--color-blue-deep)]">Pairing</p>
          <h2 className="t-display mt-2 text-4xl sm:text-6xl">{name}</h2>
          <p className="t-body mt-3 max-w-xl text-base">{note}</p>
        </div>
        <Logo className="h-auto w-40 sm:w-56" />
      </header>

      <HeroLine className="mx-3 sm:mx-6" />

      <div className="grid gap-16 px-5 py-16 sm:px-10 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <p className="t-label text-xs text-[var(--color-coral-deep)]">{vision.label}</p>
          <p className="t-display mt-4 max-w-[20ch] text-[clamp(2.25rem,6.5vw,5.5rem)]">{vision.text}</p>
        </div>

        <div className="lg:col-span-7">
          <p className="t-label text-xs text-[var(--color-teal-deep)]">{mission.label}</p>
          <h3 className="t-display mt-4 text-5xl sm:text-7xl">{mission.activateLabel}</h3>
          <p className="t-body mt-6 max-w-[62ch] text-lg leading-relaxed">
            <Copy value={mission.text} />
          </p>
          <p className="t-body mt-4 max-w-[62ch] text-base leading-relaxed">
            <Copy value={mission.activate} />
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {mission.focusAreas.map((a) => (
              <li key={a} className="t-label text-sm text-[var(--color-periwinkle-deep)]">
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[var(--color-grey)] p-6 sm:p-10 lg:col-span-5">
          <SignupFormPreview idPrefix={id} />
        </div>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-6 bg-[var(--color-blue)] px-5 py-10 text-[var(--color-white)] sm:px-10">
        <Logo tone="white" className="h-auto w-44" />
        <div className="text-right">
          <p className="t-display text-4xl sm:text-6xl">{brand.tagline}</p>
          <p className="t-label mt-2 text-xs">{brand.supporting}</p>
        </div>
      </footer>
    </section>
  );
}
