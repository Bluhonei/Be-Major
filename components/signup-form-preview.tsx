"use client";

import { useState } from "react";
import { Copy } from "@/components/copy";
import { join, programs, typePage } from "@/content/site";

// Visual-only signup form for the type comparison. The real form posts to
// /api/subscribe (Flodesk) and is built with the landing page.
export function SignupFormPreview({ idPrefix }: { idPrefix: string }) {
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const f = join.signup.fields;
  const input =
    "t-body w-full border-0 border-b-2 border-[var(--color-ink)] bg-transparent px-0 py-2 text-base focus:border-[var(--color-blue-deep)] focus:outline-none";

  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setState((s) => (s === "success" ? "error" : "success"));
      }}
    >
      <h3 className="t-display text-4xl sm:text-5xl">{join.signup.heading}</h3>
      <p className="t-body text-base">
        <Copy value={join.signup.text} />
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="t-label text-xs">{f.firstName}</span>
          <input id={`${idPrefix}-first`} autoComplete="given-name" className={input} />
        </label>
        <label className="grid gap-1">
          <span className="t-label text-xs">{f.lastName}</span>
          <input id={`${idPrefix}-last`} autoComplete="family-name" className={input} />
        </label>
      </div>
      <label className="grid gap-1">
        <span className="t-label text-xs">{f.email}</span>
        <input id={`${idPrefix}-email`} type="email" autoComplete="email" className={input} />
      </label>
      <fieldset className="grid gap-2">
        <legend className="t-label mb-2 text-xs">{f.interests}</legend>
        {programs.items.map((p) => (
          <label key={p.slug} className="t-body flex items-center gap-3 text-base">
            <input type="checkbox" className="size-4 accent-[var(--color-blue-deep)]" />
            {p.name}
          </label>
        ))}
      </fieldset>
      <label className="t-body flex items-start gap-3 text-sm">
        <input type="checkbox" required className="mt-1 size-4 accent-[var(--color-blue-deep)]" />
        {f.optIn}
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="t-label bg-[var(--color-ink)] px-7 py-4 text-sm text-[var(--color-white)] hover:bg-[var(--color-blue-deep)]"
        >
          {join.signup.submit}
        </button>
        <span className="t-body text-xs opacity-70">{typePage.previewNote}</span>
      </div>
      {state !== "idle" && (
        <p
          role="status"
          className={`t-body border-l-4 py-2 pl-4 text-sm ${
            state === "success" ? "border-[var(--color-teal-deep)]" : "border-[var(--color-coral-deep)]"
          }`}
        >
          {state === "success" ? join.signup.success : join.signup.error}
        </p>
      )}
    </form>
  );
}
