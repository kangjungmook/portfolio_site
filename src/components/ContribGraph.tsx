import type { ContribDay } from "@/lib/github";

function level(count: number) {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 10) return 3;
  return 4;
}

export default function ContribGraph({ days }: { days: ContribDay[] }) {
  const total = days.reduce((sum, d) => sum + d.count, 0);
  return (
    <div
      className="contrib"
      role="img"
      aria-label={`최근 ${Math.round(days.length / 7)}주 동안 ${total}건의 기여`}
    >
      {days.map(d => (
        <span key={d.date} className="contrib-cell" data-level={level(d.count)} />
      ))}
    </div>
  );
}
