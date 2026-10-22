"use client";

import { useEffect, useState } from "react";
import { FlagBadge } from "@/components/copy";
import { HeroVideo } from "@/components/hero-video";
import { LogoIntro } from "@/components/logo";
import { HERO_MODE, HERO_VIDEO } from "@/config/site";
import { copyText, hero, ui } from "@/content/site";
import { useActive, useReducedMotion } from "@/lib/motion";

// Field colors in cycle order. The cycle opens on the last word
// ("major"), so that word gets blue and the rest follow in order.
const FIELDS = ["blue", "coral", "teal", "periwinkle"] as const;
const N = hero.words.length;
const START = N - 1;
const fieldFor = (i: number) => FIELDS[((i - START + N) % N) % FIELDS.length];

const INTRO_MS = 2300; // logo intro finishes before the words start moving
const INTERVAL_MS = 2800;

export function Hero() {
  const reduced = useReducedMotion();
  const [ref, active] = useActive<HTMLElement>();
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(START);
  const video = HERO_MODE === "video" && HERO_VIDEO.clips.length > 0;
  const running = started && active && !paused && !reduced;

  useEffect(() => {
    const t = window.setTimeout(() => setStarted(true), INTRO_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % N), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const shown = reduced ? START : index;
  const word = hero.words[shown];
  const field = fieldFor(shown);
  const prevField = fieldFor((shown - 1 + N) % N);
  const ink = video ? "text-[var(--color-white)]" : "text-[var(--color-black)]";

  return (
    <section
      id="top"
      ref={ref}
      aria-label={hero.accessible}
      data-paused={!active || paused || undefined}
      className="grain relative isolate flex min-h-[max(600px,100svh)] flex-col justify-between gap-10 overflow-hidden"
      style={{ background: video ? "var(--color-ink)" : `var(--color-${prevField})` }}
    >
      {video ? (
        <HeroVideo playing={active && !paused} />
      ) : (
        <>
          <div
            key={`field-${shown}`}
            aria-hidden
            className={`absolute inset-0 -z-10 ${shown === START && !started ? "" : "field-wipe"}`}
            style={{ background: `var(--color-${field})` }}
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <span className="shape shape--a right-[-12vw] top-[10%] size-[55vw] max-w-[720px] max-h-[720px] bg-[var(--color-white)] opacity-40" />
            <span className="shape shape--b bottom-[-20%] left-[30%] h-[40vw] w-[70vw] rotate-12 rounded-[40%] bg-[var(--color-ink)] opacity-20" />
          </div>
        </>
      )}

      <div className="px-5 pt-[calc(var(--header-h)+var(--frame)+8px)] md:px-12">
        <LogoIntro className={`w-[min(68vw,460px)] ${ink}`} />
      </div>

      <div className="px-5 pb-[calc(var(--frame)+72px)] md:px-12 md:pb-[calc(var(--frame)+48px)]">
        <h1 className="sr-only">{hero.accessible}</h1>
        {/* Size follows the shorter of width and height so the logo always has
            room above; the negative indent cancels Anton's left side bearing
            so the letters line up with the logo's left edge. */}
        <p aria-hidden className={`t-display -ml-[0.035em] text-[clamp(4rem,min(19vw,24svh),15rem)] ${ink}`}>
          <span className="block">{hero.lead}</span>
          <span className="block overflow-hidden pb-[0.04em]">
            <span key={`word-${shown}`} className={`block ${started ? "word-rise" : ""}`}>
              {copyText(word)}
            </span>
          </span>
        </p>
        <div className="mt-4 flex items-center gap-3">
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="t-label rounded-full bg-[var(--color-white)] px-4 py-2 text-[11px] text-[var(--color-ink)]"
            >
              {paused ? ui.play : ui.pause}
            </button>
          )}
          {typeof word !== "string" && <FlagBadge kind={word.flag} note={word.note} />}
        </div>
      </div>
    </section>
  );
}
