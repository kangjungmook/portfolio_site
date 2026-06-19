"use client";

import { useEffect, useState } from "react";

const START = new Date("2025-03-05");
const END   = new Date("2028-01-04");

const MILESTONES = [
  { label: "입대",  date: new Date("2025-03-05") },
  { label: "1년차", date: new Date("2026-03-05") },
  { label: "2년차", date: new Date("2027-03-05") },
  { label: "전역",  date: new Date("2028-01-04") },
];

const MS_DAY = 1000 * 60 * 60 * 24;

function calcProgress() {
  const now       = new Date();
  const total     = END.getTime() - START.getTime();
  const elapsed   = now.getTime() - START.getTime();
  const pct       = Math.min(100, Math.max(0, (elapsed / total) * 100));
  const remaining = Math.ceil((END.getTime() - now.getTime()) / MS_DAY);
  const elapsedDays = Math.floor(elapsed / MS_DAY);
  const totalDays   = Math.floor(total / MS_DAY);
  return { pct, remaining, elapsedDays, totalDays };
}

function fmt(date: Date) {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

export default function MilitaryCard({ delay }: { delay: number }) {
  const [info, setInfo] = useState({ pct: 0, remaining: 0, elapsedDays: 0, totalDays: 0 });

  useEffect(() => {
    setInfo(calcProgress());
  }, []);

  const now = new Date();

  return (
    <div className="card" style={{ animationDelay: `${delay}s` }}>
      <div className="card-label">
        <span className="dot" />
        병역
      </div>

      <div className="mil-top">
        <div>
          <div className="mil-role">산업기능요원</div>
          <div className="mil-dates">{fmt(START)} — {fmt(END)}</div>
        </div>
        <div className="mil-pct-badge">{info.pct.toFixed(1)}%</div>
      </div>

      <div className="mil-track">
        <div className="mil-fill" style={{ width: `${info.pct}%` }} />
      </div>

      <div className="mil-footer">
        <span className="mil-label">입대</span>
        <span className="mil-remaining">{info.remaining.toLocaleString()}일 남음</span>
        <span className="mil-label">전역</span>
      </div>

      {/* 통계 */}
      <div className="mil-stats">
        <div className="mil-stat">
          <span className="mil-stat-value">{info.elapsedDays.toLocaleString()}</span>
          <span className="mil-stat-label">경과일</span>
        </div>
        <div className="mil-stat-divider" />
        <div className="mil-stat">
          <span className="mil-stat-value">{info.totalDays.toLocaleString()}</span>
          <span className="mil-stat-label">총 복무일</span>
        </div>
        <div className="mil-stat-divider" />
        <div className="mil-stat">
          <span className="mil-stat-value">{info.remaining.toLocaleString()}</span>
          <span className="mil-stat-label">D-day</span>
        </div>
      </div>

      {/* 마일스톤 */}
      <div className="mil-milestone-wrap">
        <div className="mil-milestone-line" />
        {MILESTONES.map((m, i) => {
          const passed  = now >= m.date;
          const current = i < MILESTONES.length - 1 && now >= m.date && now < MILESTONES[i + 1].date;
          return (
            <div key={m.label} className="mil-milestone">
              <div className={`mil-ms-dot ${passed ? "mil-ms-dot-done" : ""} ${current ? "mil-ms-dot-current" : ""}`} />
              <span className={`mil-ms-label ${passed ? "mil-ms-label-done" : ""}`}>{m.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
