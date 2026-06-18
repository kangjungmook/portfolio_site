import { fetchGitHubData } from "@/lib/github";
import ContribGraph from "./ContribGraph";

export const revalidate = 3600; // re-fetch GitHub data every hour

/* ─── Static content ─────────────────────────────────────────────── */

const SKILLS = [
  { category: "Backend",  items: ["Java", "Spring Boot", "MySQL", "MariaDB"] },
  { category: "DevOps",   items: ["Docker"] },
  { category: "Frontend", items: ["JavaScript", "Vue.js"] },
] as const;

const PS_LINKS = [
  { name: "백준 BOJ",   desc: "프로필 링크 추가 예정" },
  { name: "solved.ac",  desc: "티어 / 링크 추가 예정" },
] as const;

const PROJECTS = [
  { name: "회의실 예약 시스템", desc: "설명 추가 예정" },
  { name: "OMR 좌표 추출 툴",  desc: "설명 추가 예정" },
] as const;

const CARD_DELAYS = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35];

/* ─── Helpers ────────────────────────────────────────────────────── */

function Dot({ green }: { green?: boolean }) {
  return <span className={green ? "dot dot-green" : "dot"} />;
}

function CardLabel({ children, green }: { children: React.ReactNode; green?: boolean }) {
  return (
    <div className="card-label">
      <Dot green={green} />
      {children}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

/* ─── Page (server component) ────────────────────────────────────── */

export default async function Portfolio() {
  const gh = await fetchGitHubData();

  const hasRealData = gh.contributions !== null || process.env.GITHUB_TOKEN;
  const stats = [
    { value: String(gh.totalCommits), unit: "",  label: "최근 1년 커밋" },
    { value: String(gh.repos),        unit: "",  label: "Repositories" },
    { value: String(gh.streak),       unit: "일", label: "연속 커밋" },
  ];

  return (
    <main className="page">
      <div className="bg-glow" aria-hidden="true" />

      <div className="container">

        {/* ── Hero ── */}
        <section className="hero">
          <div className="greeting-badge">
            안녕하세요 <span aria-label="인사">👋</span>
          </div>
          <h1 className="hero-name">강정묵</h1>
          <p className="hero-tagline">
            기본기에 충실하며 실무에서 부딪히며 배우는 것을 즐깁니다
          </p>
          <div className="hero-ctas">
            <a
              href="https://github.com/kangjungmook"
              target="_blank" rel="noopener noreferrer"
              className="cta-primary"
            >
              GitHub <ArrowIcon />
            </a>
            <a href="#" className="cta-secondary">
              Blog <ArrowIcon />
            </a>
            <a href="mailto:" className="cta-secondary">
              Email ✉
            </a>
          </div>
        </section>

        {/* ── Bento grid ── */}
        <div className="bento">

          {/* 1 · About (c2) */}
          <div className="card c2" style={{ animationDelay: `${CARD_DELAYS[0]}s` }}>
            <CardLabel>About</CardLabel>
            <h3 className="card-title">
              안정적인 API 설계와 데이터 최적화에 몰입합니다
            </h3>
            <p className="card-text">
              복잡한 요구사항을 명확한 로직으로 구현하고, 시스템의 확장성을
              고려하며 개발하는 백엔드 개발자입니다. 보이지 않는 곳의 견고함을
              중요하게 생각합니다.
            </p>
          </div>

          {/* 2 · Now Playing (c1) */}
          <div className="card" style={{ animationDelay: `${CARD_DELAYS[1]}s` }}>
            <CardLabel green>Now Playing</CardLabel>
            <div className="music-row">
              <div className="album-art">♪</div>
              <div className="music-info">
                <div className="track-name">Sample Track</div>
                <div className="artist-name">Sample Artist</div>
              </div>
            </div>
            <div className="eq-bars">
              {([0, 0.2, 0.4, 0.15, 0.35] as const).map((delay, i) => (
                <span key={i} className="eq-bar" style={{ animationDelay: `${delay}s` }} />
              ))}
            </div>
            <p className="card-note">* Spotify 연동 예정</p>
          </div>

          {/* 3 · Skills (c2) */}
          <div className="card c2" style={{ animationDelay: `${CARD_DELAYS[2]}s` }}>
            <CardLabel>Skills</CardLabel>
            <div className="skills-list">
              {SKILLS.map(({ category, items }) => (
                <div key={category} className="skill-row">
                  <span className="skill-category">{category}</span>
                  <div className="skill-tags">
                    {items.map((item) => (
                      <span key={item} className="skill-tag">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 · Education (c1) */}
          <div className="card" style={{ animationDelay: `${CARD_DELAYS[3]}s` }}>
            <CardLabel>Education</CardLabel>
            <div className="edu-item">
              <div className="edu-school">동서울대학교</div>
              <div className="edu-detail">
                AI응용소프트웨어학과 · P-TECH<br />2학년 재학 중
              </div>
            </div>
            <div className="edu-item edu-item-sep">
              <div className="edu-school">성일정보고등학교</div>
              <div className="edu-detail">소프트웨어개발과 졸업</div>
            </div>
            <div className="cert-tags">
              <span className="cert-tag">정보처리산업기사</span>
              <span className="cert-tag">SW개발 L3</span>
            </div>
          </div>

          {/* 5 · GitHub Activity (c2) */}
          <div className="card c2" style={{ animationDelay: `${CARD_DELAYS[4]}s` }}>
            <div className="card-header">
              <CardLabel>GitHub Activity</CardLabel>
              <a
                href="https://github.com/kangjungmook"
                target="_blank" rel="noopener noreferrer"
                className="github-link"
              >
                @kangjungmook ↗
              </a>
            </div>

            <div className="github-stats">
              {stats.map(({ value, unit, label }) => (
                <div key={label} className="stat-card">
                  <div className="stat-value">
                    {value}
                    {unit && <span className="stat-unit">{unit}</span>}
                  </div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>

            <ContribGraph contributions={gh.contributions} />

            {!hasRealData && (
              <p className="card-note">* 실제 GitHub 데이터 연동 예정</p>
            )}
          </div>

          {/* 6 · Algorithm / PS (c1) */}
          <div className="card" style={{ animationDelay: `${CARD_DELAYS[5]}s` }}>
            <CardLabel>Algorithm / PS</CardLabel>
            {PS_LINKS.map(({ name, desc }) => (
              <a key={name} href="#" className="ps-link">
                <div>
                  <div className="ps-name">{name}</div>
                  <div className="ps-desc">{desc}</div>
                </div>
                <span className="ps-arrow">↗</span>
              </a>
            ))}
          </div>

          {/* 7 · Recent Projects (c3) */}
          <div className="card c3" style={{ animationDelay: `${CARD_DELAYS[6]}s` }}>
            <CardLabel>Recent Projects</CardLabel>
            <div className="projects-grid">
              {PROJECTS.map(({ name, desc }) => (
                <a key={name} href="#" className="project-card">
                  <div className="project-thumb" aria-hidden="true" />
                  <div className="project-info">
                    <div className="project-name">{name}</div>
                    <div className="project-desc">{desc}</div>
                  </div>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
