"use client";

import { useState } from "react";

const CURRENT_CERTS = ["정보처리산업기사", "SW개발 L3"];

const GOAL_CERTS = [
  { name: "정보처리기사",        status: "준비 중" },
  { name: "AWS SAA",             status: "목표" },
  { name: "리눅스마스터 2급",    status: "목표" },
  { name: "SQLD",                status: "목표" },
];

export default function EducationCard({ delay }: { delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card" style={{ animationDelay: `${delay}s` }}>
      {/* 헤더 */}
      <div className="edu-header">
        <div className="card-label">
          <span className="dot" />
          Education
        </div>
        <button
          className={`mbti-toggle ${open ? "mbti-toggle-open" : ""}`}
          onClick={() => setOpen(v => !v)}
          aria-label={open ? "닫기" : "자격증 목표 보기"}
        >
          +
        </button>
      </div>

      {open ? (
        /* 목표 자격증 뷰 */
        <div className="edu-goals">
          <div className="edu-goals-title">목표 자격증</div>
          <div className="edu-goal-list">
            {GOAL_CERTS.map(({ name, status }) => (
              <div key={name} className="edu-goal-item">
                <span className="edu-goal-name">{name}</span>
                <span className={`edu-goal-status ${status === "준비 중" ? "edu-goal-active" : ""}`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 기본 뷰 */
        <>
          <div className="edu-timeline">
            <div className="edu-tl-item">
              <div className="edu-tl-dot edu-tl-dot-active" />
              <div className="edu-tl-body">
                <div className="edu-school">동서울대학교</div>
                <div className="edu-detail">
                  AI응용소프트웨어학과 · P-TECH<br />2학년 재학 중
                </div>
                <span className="edu-badge">재학</span>
              </div>
            </div>
            <div className="edu-tl-line" />
            <div className="edu-tl-item">
              <div className="edu-tl-dot" />
              <div className="edu-tl-body">
                <div className="edu-school">성일정보고등학교</div>
                <div className="edu-detail">소프트웨어개발과 졸업</div>
                <span className="edu-badge edu-badge-done">졸업</span>
              </div>
            </div>
          </div>

          <div className="edu-cert-section">
            <div className="edu-cert-title">보유 자격증</div>
            <div className="cert-tags">
              {CURRENT_CERTS.map(c => (
                <span key={c} className="cert-tag">{c}</span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
