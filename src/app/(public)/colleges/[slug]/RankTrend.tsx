export interface RankPoint {
  year: number;
  rank: number;
}

const WIDTH = 600;
const HEIGHT = 140;
const PAD_X = 28;
const PAD_TOP = 28;
const PAD_BOTTOM = 28;

export function RankTrend({ points }: { points: RankPoint[] }) {
  if (points.length < 2) return null;

  const sorted = [...points].sort((a, b) => a.year - b.year);
  const ranks = sorted.map(p => p.rank);
  const minRank = Math.min(...ranks);
  const maxRank = Math.max(...ranks);
  const span = Math.max(maxRank - minRank, 1);

  const plotW = WIDTH - PAD_X * 2;
  const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const coords = sorted.map((p, i) => {
    const x = sorted.length === 1 ? WIDTH / 2 : PAD_X + (i / (sorted.length - 1)) * plotW;
    // Lower rank is better, so invert the y-axis: best rank sits near the top.
    const y = PAD_TOP + ((p.rank - minRank) / span) * plotH;
    return { ...p, x, y };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto max-w-md" role="img" aria-label="NIRF rank trend over time">
      <path d={linePath} fill="none" stroke="#1c67f6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {coords.map(c => (
        <g key={c.year}>
          <circle cx={c.x} cy={c.y} r={4} fill="#1c67f6" stroke="var(--background)" strokeWidth={2} />
          <title>{`${c.year}: #${c.rank}`}</title>
          <text x={c.x} y={c.y - 12} textAnchor="middle" className="fill-foreground text-[11px] font-bold">#{c.rank}</text>
          <text x={c.x} y={HEIGHT - 8} textAnchor="middle" className="fill-muted-foreground text-[11px]">{c.year}</text>
        </g>
      ))}
    </svg>
  );
}
