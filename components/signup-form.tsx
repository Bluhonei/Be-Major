"use client";

import { useEffect, useState, type FormEvent } from "react";
import { INTEREST_EVENT } from "@/components/get-updates-link";
import { join } from "@/content/site";

type State = "idle" | "sending" | "success" | "error";
const ERRORS = join.signup.errors;

// "Don't Miss Major Moments". Posts to /api/subscribe, which holds the
// Flodesk key server-side. `website` is the honeypot.
export function SignupForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string>(ERRORS.generic);
  const [interests, setInterests] = useState<string[]>([]);
  const f = join.signup.fields;

  useEffect(() => {
    const on = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      setInterests((cur) => (cur.includes(slug) ? cur : [...cur, slug]));
    };
    window.addEventListener(INTEREST_EVENT, on);
    return () => window.removeEventListener(INTEREST_EVENT, on);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          optIn: data.get("optIn") === "on",
          interests,
          website: data.get("website"),
        }),
      });
      if (res.ok) {
        setState("success");
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: keyof typeof ERRORS };
      setError(ERRORS[body.error ?? "generic"] ?? ERRORS.generic);
      setState("error");
    } catch {
      setError(ERRORS.generic);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <p role="status" className="border-l-4 border-[var(--color-teal-deep)] py-3 pl-5 text-xl">
        {join.signup.success}
      </p>
    );
  }

  const input =
    "w-full border-0 border-b-2 border-[var(--color-ink)] bg-transparent px-0 py-2 text-lg focus:border-[var(--color-blue-deep)] focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="t-label text-[11px]">{f.firstName}</span>
          <input name="firstName" required autoComplete="given-name" maxLength={80} className={input} />
        </label>
        <label className="grid gap-1">
          <span className="t-label text-[11px]">{f.lastName}</span>
          <input name="lastName" required autoComplete="family-name" maxLength={80} className={input} />
        </label>
      </div>
      <label className="grid gap-1">
        <span className="t-label text-[11px]">{f.email}</span>
        <input name="email" type="email" required autoComplete="email" maxLength={254} className={input} />
      </label>
      <fieldset className="grid gap-2">
        <legend className="t-label mb-2 text-[11px]">{f.interests}</legend>
        {join.signup.interestOptions.map((o) => (
          <label key={o.id} className="flex items-center gap-3 text-base">
            <input
              type="checkbox"
              checked={interests.includes(o.id)}
              onChange={(e) =>
                setInterests((cur) => (e.target.checked ? [...cur, o.id] : cur.filter((s) => s !== o.id)))
              }
              className="size-4 accent-[var(--color-blue-deep)]"
            />
            {o.label}
          </label>
        ))}
      </fieldset>
      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          {f.honeypot}
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex items-start gap-3 text-sm">
        <input name="optIn" type="checkbox" required className="mt-1 size-4 shrink-0 accent-[var(--color-blue-deep)]" />
        {f.optIn}
      </label>
      <div>
        <button
          type="submit"
          disabled={state === "sending"}
          className="t-label bg-[var(--color-ink)] px-8 py-4 text-xs text-[var(--color-white)] hover:bg-[var(--color-blue-deep)] disabled:opacity-60"
        >
          {state === "sending" ? join.signup.sending : join.signup.submit}
        </button>
      </div>
      <p role="alert" className="min-h-6 text-sm text-[var(--color-coral-deep)]">
        {state === "error" ? error : ""}
      </p>
    </form>
  );
}
