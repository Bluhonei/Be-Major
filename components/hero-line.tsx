"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { FlagBadge } from "@/components/copy";
import { IS_PREVIEW } from "@/config/site";
import { copyText, hero } from "@/content/site";

// Field colors in cycle order. The cycle opens on the last word
// ("major"), so that word gets blue and the rest follow in order.
const FIELDS = ["blue", "coral", "teal", "periwinkle"] as const;
const START = hero.words.length - 1;
const fieldFor = (i: number) =>
  FIELDS[((i - START + hero.words.length) % hero.words.length) % FIELDS.length];
const INTERVAL_MS = 2800;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(reducedMotionQuery);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

// "Make it ___" on a cycling color field. The accessible text is the
// static tagline; the cycling word is decorative. Reduced motion shows
// the final word ("major") without cycling.
export function HeroLine({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(START);
  const stopped = reduced || paused;

  useEffect(() => {
    if (stopped) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % hero.words.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [stopped]);

  const shown = reduced ? START : index;
  const word = hero.words[shown];
  const field = fieldFor(shown);
  const prevField = fieldFor((shown - 1 + hero.words.length) % hero.words.length);

  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      style={{ background: `var(--color-${prevField})` }}
    >
      <div
        key={`field-${shown}`}
        aria-hidden
        className="field-wipe absolute inset-0 -z-10"
        style={{ background: `var(--color-${field})` }}
      />
      <p className="sr-only">Make it major.</p>
      <p aria-hidden className="t-display px-5 py-10 text-[clamp(3.5rem,15vw,11rem)] text-[var(--color-ink)] sm:px-10">
        <span className="block">{hero.lead}</span>
        <span className="block overflow-hidden pb-[0.06em]">
          <span key={`word-${shown}`} className="word-rise block">
            {copyText(word)}
          </span>
        </span>
      </p>
      <div className="absolute right-3 bottom-3 flex items-center gap-2">
        {IS_PREVIEW && typeof word !== "string" && <FlagBadge kind={word.flag} note={word.note} />}
        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="rounded-full bg-[var(--color-white)] px-3 py-1 text-xs font-medium text-[var(--color-ink)]"
          >
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>
    </div>
  );
}
