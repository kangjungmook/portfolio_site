"use client";

import { useState } from "react";

const TRAITS = [
  "논리적이고 분석적인 문제 해결",
  "말보다 행동으로 보여주는 스타일",
  "조용하지만 날카로운 관찰력",
  "자유롭고 유연한 사고방식",
];

export default function MbtiCard({ delay }: { delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card" style={{ animationDelay: `${delay}s` }}>
      {/* 헤더 */}
      <div className="mbti-header">
        <div className="card-label">
          <span className="dot" />
          MBTI
        </div>
        <button
          className={`mbti-toggle ${open ? "mbti-toggle-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "설명 닫기" : "설명 보기"}
        >
          +
        </button>
      </div>

      {/* 설명 */}
      {open && (
        <div className="mbti-desc">
          {TRAITS.map((t) => (
            <div key={t} className="mbti-desc-item">
              <span className="mbti-desc-dot" />
              {t}
            </div>
          ))}
        </div>
      )}

      {/* 메인 */}
      {!open && (
        <>
          <div className="mbti-type">ISTP</div>
          <div className="mbti-name">만능 재주꾼</div>
          <div className="mbti-bars">
            {[
              { left: "I 내향", right: "E 외향", pct: 72 },
              { left: "S 감각", right: "N 직관", pct: 60 },
              { left: "T 사고", right: "F 감정", pct: 65 },
              { left: "P 인식", right: "J 판단", pct: 58 },
            ].map(({ left, right, pct }) => (
              <div key={left} className="mbti-row">
                <span className="mbti-label mbti-active">{left}</span>
                <div className="mbti-track">
                  <div className="mbti-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="mbti-label">{right}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
