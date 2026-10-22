import Link from "next/link";
import { Copy } from "@/components/copy";
import { Logo } from "@/components/logo";
import type { Copy as CopyValue } from "@/content/site";
import { legal } from "@/content/site";

export function LegalPage({ title, body }: { title: string; body: CopyValue }) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <Link href="/" aria-label={legal.back} className="block w-32">
        <Logo className="h-auto w-full" />
      </Link>
      <h1 className="t-display mt-16 text-6xl md:text-8xl">{title}</h1>
      <p className="mt-8 text-lg leading-relaxed">
        <Copy value={body} />
      </p>
      <Link href="/" className="t-label mt-16 inline-block text-xs text-[var(--color-blue-deep)] hover:underline">
        ← {legal.back}
      </Link>
    </main>
  );
}
