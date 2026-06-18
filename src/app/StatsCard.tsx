"use client";

import { useEffect, useState } from "react";

const MILITARY_START = new Date("2025-03-05");
const CODE_START     = new Date("2021-03-01"); // 고등학교 SW과 입학

interface Props {
  totalCommits: number;
  repos: number;
  streak: number;
  delay: number;
}

interface Stat {
  value: string;
  unit: string;
  label: string;
  sub: string;
}

export default function StatsCard({ totalCommits, repos, streak, delay }: Props) {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const now = new Date();
    const militaryDays = Math.floor((now.getTime() - MILITARY_START.getTime()) / 86_400_000);
    const codeYears    = ((now.getTime() - CODE_START.getTime()) / (86_400_000 * 365.25)).toFixed(1);
    const coffeeCups   = Math.floor(totalCommits * 0.8);

    setStats([
      {
        value: totalCommits.toLocaleString(),
        unit:  "회",
        label: "총 커밋",
        sub:   "1년간 쌓인 흔적",
      },
      {
        value: repos.toString(),
        unit:  "개",
        label: "레포지토리",
        sub:   "만들고 또 만들고",
      },
      {
        value: streak.toString(),
        unit:  "일",
        label: "연속 커밋",
        sub:   "불꽃 유지 중 🔥",
      },
      {
        value: militaryDays.toLocaleString(),
        unit:  "일",
        label: "복무 경과",
        sub:   "산업기능요원으로",
      },
      {
        value: codeYears,
        unit:  "년",
        label: "개발 입문",
        sub:   "SW과 입학부터",
      },
      {
        value: coffeeCups.toLocaleString(),
        unit:  "잔",
        label: "추정 커피",
        sub:   "커밋당 0.8잔 기준",
      },
    ]);
  }, [totalCommits, repos, streak]);

  return (
    <div className="card" style={{ animationDelay: `${delay}s` }}>
      <div className="card-label">
        <span className="dot" />
        숫자로 보는 나
      </div>
      <div className="stats-grid">
        {stats.map(({ value, unit, label, sub }) => (
          <div key={label} className="stats-cell">
            <div className="stats-number">
              {value}<span className="stats-unit">{unit}</span>
            </div>
            <div className="stats-label">{label}</div>
            <div className="stats-sub">{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
