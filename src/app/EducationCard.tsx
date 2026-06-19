"use client";

import { useState } from "react";

const CURRENT_CERTS = ["정보처리산업기사", "SW개발 L3"];

const GOAL_CERTS = [
  { name: "정보처리기사",     status: "준비 중" },
  { name: "AWS SAA",          status: "목표" },
  { name: "리눅스마스터 2급", status: "목표" },
  { name: "SQLD",             status: "목표" },
];

const CAREER_WORKS = [
  { title: "논술 프로그램 기능 개발 및 유지보수", stack: ["Java", "Spring Boot", "JavaScript"] },
  { title: "사내 업무 자동화 툴 개발",            stack: ["Python", "Vue.js"] },
];

function FlipHint({ label }: { label: string }) {
  return (
    <div className="edu-flip-hint">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 4v6h6M23 20v-6h-6" />
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
      </svg>
      {label}
    </div>
  );
}

function CareerFace() {
  return (
    <>
      <div className="card-label">
        <span className="dot" />
        경력
      </div>

      <div className="car-entry">
        <div className="car-dot-col">
          <div className="car-dot car-dot-active" />
          <div className="car-line" />
        </div>
        <div className="car-body">
          <div className="car-header">
            <span className="car-company">(주)유플러스시스템</span>
            <span className="car-badge">재직 중</span>
          </div>
          <div className="car-role">
            백엔드 개발자
            <span className="car-type">산업기능요원</span>
          </div>
          <div className="car-period">2025.03 — 현재</div>
          <div className="car-works">
            {CAREER_WORKS.map((w) => (
              <div key={w.title} className="car-work-item">
                <span className="car-work-dot" />
                <div>
                  <div className="car-work-title">{w.title}</div>
                  <div className="car-work-stack">
                    {w.stack.map((s) => (
                      <span key={s} className="car-stack-chip">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FlipHint label="탭하면 학력 보기" />
    </>
  );
}

function EduFace() {
  const [showGoals, setShowGoals] = useState(false);

  return (
    <>
      <div className="edu-header">
        <div className="card-label">
          <span className="dot" />
          학력
        </div>
        <button
          className={`mbti-toggle ${showGoals ? "mbti-toggle-open" : ""}`}
          onClick={(e) => { e.stopPropagation(); setShowGoals(v => !v); }}
          aria-label={showGoals ? "닫기" : "목표 자격증 보기"}
        >
          +
        </button>
      </div>

      {showGoals ? (
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

      <FlipHint label="탭하면 경력 보기" />
    </>
  );
}

export default function EducationCard({ delay }: { delay: number }) {
  const [showBack, setShowBack] = useState(false);
  const [animClass, setAnimClass] = useState("");

  const handleFlip = () => {
    if (animClass) return;
    setAnimClass("edu-flip-out");
    setTimeout(() => {
      setShowBack(v => !v);
      setAnimClass("edu-flip-in");
    }, 280);
    setTimeout(() => setAnimClass(""), 560);
  };

  return (
    <div
      className="card"
      style={{ animationDelay: `${delay}s`, cursor: "pointer" }}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleFlip()}
    >
      <div className={animClass || undefined}>
        {showBack ? <EduFace /> : <CareerFace />}
      </div>
    </div>
  );
}
