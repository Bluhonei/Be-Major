import Link from "next/link";
import { FlagBadge } from "@/components/copy";
import { Footer } from "@/components/footer";
import { Frame } from "@/components/frame";
import { Header } from "@/components/header";
import { SHOW_FLAGS } from "@/config/site";
import { legalUi, type LegalPage as LegalPageContent } from "@/content/site";

// Long-form legal page in the site's type and colors: Anton title, Jost
// body at a comfortable measure, section headings as small display caps.
export function LegalPage({ page }: { page: LegalPageContent }) {
  return (
    <>
      <Header alwaysSolid />
      <Frame cornerTab={false} />
      <main id="main" className="px-5 pt-[calc(var(--header-h)+var(--frame)+48px)] pb-24 md:px-12 md:pb-32">
        <article className="mx-auto max-w-[68ch]">
          {page.draft && SHOW_FLAGS && (
            <p className="mb-8 border-2 border-dashed border-[var(--color-flag)] p-4 text-sm">
              <FlagBadge kind={page.draft.flag} note={page.draft.note} />
              {page.draft.text}
            </p>
          )}
          <h1 className="t-display text-[clamp(3rem,9vw,6.5rem)]">{page.title}</h1>
          <p className="t-label mt-6 text-xs text-[var(--color-blue-deep)]">
            {legalUi.lastUpdated}: {page.updated}
          </p>
          <div className="mt-10 grid gap-5 text-lg leading-relaxed">
            {page.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {page.sections.map((s) => (
            <section key={s.heading} className="mt-12">
              <h2 className="t-display text-3xl md:text-4xl">{s.heading}</h2>
              <div className="mt-4 grid gap-4 text-lg leading-relaxed">
                {s.paragraphs?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.list && (
                  <ul className="grid list-disc gap-2 pl-6 marker:text-[var(--color-coral-deep)]">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.after?.map((p, i) => (
                  <p key={`after-${i}`}>{p}</p>
                ))}
                {s.address && (
                  <address className="not-italic">
                    {s.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                )}
              </div>
            </section>
          ))}
          <Link href="/" className="t-label hit mt-16 inline-block text-xs text-[var(--color-blue-deep)] hover:underline">
            ← {legalUi.back}
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
