import { Copy } from "@/components/copy";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { SignupForm } from "@/components/signup-form";
import { SplitLines } from "@/components/split-lines";
import { CONTACT_EMAIL } from "@/config/site";
import { join } from "@/content/site";

export function Join() {
  return (
    <section id="join" aria-labelledby="join-label" className="bg-[var(--color-grey)] px-3 py-20 md:px-8 md:py-28">
      <div className="px-2 md:px-4">
        <SectionLabel id="join-label" tone="blue">{join.label}</SectionLabel>
        <SplitLines text={join.headline} className="t-display mt-6 max-w-[16ch] text-[clamp(3rem,8vw,7.5rem)]" />
      </div>
      <div className="mt-14 grid gap-3 lg:grid-cols-12">
        <Reveal kind="open" className="flex flex-col justify-between gap-10 bg-[var(--color-teal)] p-6 md:p-10 lg:col-span-5">
          <div>
            <h3 className="t-display text-5xl md:text-6xl">{join.partner.heading}</h3>
            <p className="mt-5 text-lg leading-relaxed">
              <Copy value={join.partner.text} />
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="t-label self-start bg-[var(--color-ink)] px-7 py-4 text-xs break-all text-[var(--color-white)] hover:bg-[var(--color-white)] hover:text-[var(--color-ink)]"
          >
            {join.partner.cta}
          </a>
        </Reveal>
        <Reveal kind="open" delay={180} className="relative bg-[var(--color-white)] p-6 md:p-10 lg:col-span-7">
          <h3 className="t-display text-5xl md:text-6xl">{join.signup.heading}</h3>
          <p className="mt-5 mb-8 text-lg">
            <Copy value={join.signup.text} />
          </p>
          <SignupForm />
        </Reveal>
      </div>
    </section>
  );
}
