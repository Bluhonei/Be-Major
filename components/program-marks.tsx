// Abstract marks for the program inset tiles, used until real media
// arrives. Flat white on the blue tile, drawn only from the page's own
// vocabulary: soft solid circles, pills and rounded squares, translucent
// where they overlap. Original drawings; no stock art.

function Collective() {
  // Three circle-on-pill figures, overlapping like the field shapes: a
  // group, suggested rather than drawn.
  const figure = (cx: number, top: number, s: number) => (
    <g key={cx} opacity="0.55">
      <circle cx={cx} cy={top + 8 * s} r={8 * s} />
      <rect x={cx - 13 * s} y={top + 19 * s} width={26 * s} height={34 * s} rx={13 * s} />
    </g>
  );
  return (
    <g fill="#fff">
      {figure(34, 20, 0.95)}
      {figure(66, 20, 0.95)}
      {figure(50, 30, 1.05)}
    </g>
  );
}

function Network() {
  // A radial constellation: a core, a ring of six, an outer ring of twelve,
  // joined by faint lines. Each inner dot fans out to its two nearest
  // outer dots.
  const ring = (n: number, r: number, offset = 0) =>
    Array.from({ length: n }, (_, i) => {
      const a = ((i * 360) / n + offset - 90) * (Math.PI / 180);
      return [50 + r * Math.cos(a), 50 + r * Math.sin(a)] as const;
    });
  const inner = ring(6, 19);
  const outer = ring(12, 36, 15);
  const lines: [readonly [number, number], readonly [number, number]][] = [
    ...inner.map((p) => [[50, 50] as const, p] as [readonly [number, number], readonly [number, number]]),
    // Outer dot i sits at 15° + 30°·i; its nearest inner dot is round(angle / 60).
    ...outer.map(
      (p, i) =>
        [p, inner[Math.round((15 + 30 * i) / 60) % 6]] as [readonly [number, number], readonly [number, number]],
    ),
  ];
  return (
    <g fill="#fff">
      <g stroke="#fff" strokeWidth="1.4" opacity="0.4">
        {lines.map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
        ))}
      </g>
      {outer.map(([x, y], i) => (
        <circle key={`o${i}`} cx={x} cy={y} r="2.8" opacity="0.7" />
      ))}
      {inner.map(([x, y], i) => (
        <circle key={`i${i}`} cx={x} cy={y} r="4.2" />
      ))}
      <circle cx="50" cy="50" r="8" />
    </g>
  );
}

function Grid() {
  // 3×3 matrix with one square standing out in coral.
  const cells = [0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => [r, c]));
  return (
    <g>
      {cells.map(([r, c]) => {
        const lit = r === 0 && c === 2;
        return (
          <rect
            key={`${r}${c}`}
            x={22 + c * 20}
            y={22 + r * 20}
            width="16"
            height="16"
            rx="3"
            fill={lit ? "var(--color-coral)" : "#fff"}
            opacity={lit ? 1 : 0.35}
          />
        );
      })}
    </g>
  );
}

const MARKS: Record<string, () => React.ReactElement> = {
  "culture-collective": Collective,
  "ai-anatomy": Network,
  "marketing-matrix": Grid,
};

export function ProgramMark({ slug, className = "" }: { slug: string; className?: string }) {
  const Mark = MARKS[slug];
  if (!Mark) return null;
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <Mark />
    </svg>
  );
}
