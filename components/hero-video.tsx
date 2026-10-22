"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { HERO_VIDEO } from "@/config/site";
import { useReducedMotion } from "@/lib/motion";

const CROSSFADE_MS = 1200;
const CLIP_MS = 6000;

type NetworkInformation = { saveData?: boolean };
const saveData = () =>
  (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData === true;

// Two stacked <video> elements crossfading through Brae's clips. The
// poster <img> is the LCP element; video only loads after window load, and
// never under reduced motion or Save-Data.
export function HeroVideo({ playing }: { playing: boolean }) {
  const reduced = useReducedMotion();
  const noVideo = useSyncExternalStore(() => () => {}, saveData, () => true);
  const [loaded, setLoaded] = useState(false);
  const [clip, setClip] = useState(0);
  const [front, setFront] = useState<0 | 1>(0);
  const refs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const allowed = loaded && !reduced && !noVideo;
  const clips = HERO_VIDEO.clips;

  useEffect(() => {
    const on = () => setLoaded(true);
    if (document.readyState === "complete") {
      const t = window.setTimeout(on, 0);
      return () => window.clearTimeout(t);
    }
    window.addEventListener("load", on, { once: true });
    return () => window.removeEventListener("load", on);
  }, []);

  // Play/pause the front clip; advance on a timer, preloading the next
  // clip into the back element before it fades up.
  useEffect(() => {
    if (!allowed) return;
    const v = refs[front].current;
    if (!v) return;
    if (!playing) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
    if (clips.length < 2) return;
    const t = window.setTimeout(() => {
      setClip((c) => (c + 1) % clips.length);
      setFront((f) => (f === 0 ? 1 : 0));
    }, CLIP_MS);
    return () => window.clearTimeout(t);
    // refs are stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowed, playing, front, clips.length]);

  const sources = (i: number) => {
    const c = clips[i % clips.length];
    return (
      <>
        {c.webmPortrait && <source src={c.webmPortrait} type="video/webm" media="(max-width: 767px)" />}
        {c.mp4Portrait && <source src={c.mp4Portrait} type="video/mp4" media="(max-width: 767px)" />}
        <source src={c.webm} type="video/webm" />
        <source src={c.mp4} type="video/mp4" />
      </>
    );
  };

  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      {HERO_VIDEO.poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={HERO_VIDEO.poster}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {allowed &&
        ([0, 1] as const).map((slot) => {
          const i = slot === front ? clip : clip + 1;
          return (
            <video
              key={`${slot}-${i % clips.length}`}
              ref={refs[slot]}
              muted
              playsInline
              loop
              preload={slot === front ? "auto" : "metadata"}
              className="absolute inset-0 h-full w-full object-cover transition-opacity"
              style={{ opacity: slot === front ? 1 : 0, transitionDuration: `${CROSSFADE_MS}ms` }}
            >
              {sources(i)}
            </video>
          );
        })}
      {/* Legibility overlay for white type. */}
      <div className="absolute inset-0 bg-[var(--color-ink)] opacity-45" />
    </div>
  );
}
