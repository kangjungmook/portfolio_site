"use client";

import { useEffect, useState } from "react";
import type { ContribDay } from "@/lib/github";

function countToColor(count: number): string {
  if (count === 0) return "rgba(255,255,255,0.05)";
  if (count <= 3)  return "rgba(110,139,255,0.22)";
  if (count <= 6)  return "rgba(110,139,255,0.36)";
  if (count <= 10) return "rgba(110,139,255,0.55)";
  if (count <= 15) return "rgba(110,139,255,0.78)";
  return "rgba(110,139,255,0.95)";
}

export default function ContribGraph({
  contributions,
}: {
  contributions: ContribDay[] | null;
}) {
  const [cells, setCells] = useState<{ bg: string; title?: string }[]>([]);

  useEffect(() => {
    if (contributions && contributions.length > 0) {
      setCells(
        contributions.map((d) => ({
          bg: countToColor(d.count),
          title: `${d.date}: ${d.count}건`,
        }))
      );
    } else {
      // Fallback: random pattern while no token is configured
      const lv = [0.22, 0.36, 0.55, 0.78, 0.95];
      setCells(
        Array.from({ length: 133 }, () => {
          const r = Math.random();
          return {
            bg:
              r < 0.42
                ? "rgba(255,255,255,0.05)"
                : `rgba(110,139,255,${lv[Math.floor(Math.random() * lv.length)]})`,
          };
        })
      );
    }
  }, [contributions]);

  return (
    <div
      className="contribution-graph"
      role="img"
      aria-label="GitHub 기여 그래프"
    >
      {cells.map((cell, i) => (
        <div
          key={i}
          className="contrib-cell"
          style={{ background: cell.bg }}
          title={cell.title}
        />
      ))}
    </div>
  );
}
