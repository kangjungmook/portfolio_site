import Link from "next/link";
import Image from "next/image";
import { fetchGitHubData } from "@/lib/github";
import { PROJECTS } from "@/lib/projects";
import ContribGraph from "./ContribGraph";
import SkillsCard from "./SkillsCard";
import MbtiCard from "./MbtiCard";
import MilitaryCard from "./MilitaryCard";
import EducationCard from "./EducationCard";
import PhilosophyCard from "./PhilosophyCard";
import StatsCard from "./StatsCard";
import TypingText from "./TypingText";

// 1시간마다 깃허브 데이터 재요청
export const revalidate = 3600;

const CARD_DELAYS = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4];

// 공통 컴포넌트
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

export default async function Portfolio() {
  const gh = await fetchGitHubData();

  const hasRealData = gh.contributions !== null || process.env.GITHUB_TOKEN;
  const stats = [
    { value: String(gh.totalCommits), unit: "",   label: "최근 1년 커밋" },
    { value: String(gh.repos),        unit: "",   label: "Repositories" },
    { value: String(gh.streak),       unit: "일", label: "연속 커밋" },
  ];

  return (
    <main className="page">
      <div className="bg-glow" aria-hidden="true" />

      <div className="container">

        {/* 상단 소개 */}
        <section className="hero">
          <div className="greeting-badge">
            안녕하세요 <span aria-label="인사">👋</span>
          </div>
          <h1 className="hero-name">강정묵</h1>
          <p className="hero-tagline">
            <TypingText />
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
            <a href="mailto:k01088219732@gmail.com" className="cta-secondary">
              Email ✉
            </a>
          </div>
        </section>

        {/* 카드 그리드 */}
        <div className="bento">

          {/* 자기소개 */}
          <div className="card" style={{ animationDelay: `${CARD_DELAYS[0]}s` }}>
            <CardLabel>소개</CardLabel>
            <h3 className="card-title">
              안정적인 API 설계와 데이터 최적화에 몰입합니다
            </h3>
            <p className="card-text">
              복잡한 요구사항을 명확한 로직으로 구현하고, 시스템의 확장성을
              고려하며 개발하는 백엔드 개발자입니다. 보이지 않는 곳의 견고함을
              중요하게 생각합니다.
            </p>
          </div>

          {/* MBTI */}
          <MbtiCard delay={CARD_DELAYS[1]} />

          {/* 기술 스택 */}
          <SkillsCard delay={CARD_DELAYS[2]} />

          {/* 학력 */}
          <EducationCard delay={CARD_DELAYS[3]} />

          {/* 깃허브 활동 */}
          <div className="card" style={{ animationDelay: `${CARD_DELAYS[4]}s` }}>
            <div className="card-header">
              <CardLabel>깃허브 활동</CardLabel>
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

          {/* 병역 */}
          <MilitaryCard delay={CARD_DELAYS[6]} />

          {/* 개인 통계 */}
          <StatsCard
            totalCommits={gh.totalCommits}
            repos={gh.repos}
            streak={gh.streak}
            delay={CARD_DELAYS[5]}
          />

          {/* 개발자 소개 */}
          <PhilosophyCard delay={CARD_DELAYS[6]} />

          {/* 프로젝트 */}
          <div className="card" style={{ animationDelay: `${CARD_DELAYS[7]}s` }}>
            <div className="card-header">
              <CardLabel>최근 프로젝트</CardLabel>
              <Link href="/projects" className="github-link">전체 보기 ↗</Link>
            </div>
            <div className="projects-grid">
              {PROJECTS.map(({ slug, title, summary, stack, icon }) => (
                <Link key={slug} href={`/projects/${slug}`} className="project-card">
                  {icon ? (
                    <div className="project-thumb project-thumb-icon">
                      <Image src={icon} alt={title} fill className="project-thumb-img" />
                    </div>
                  ) : (
                    <div className="project-thumb" aria-hidden="true" />
                  )}
                  <div className="project-info">
                    <div className="project-name">{title}</div>
                    <div className="project-desc">{summary}</div>
                    <div className="project-stack-row">
                      {stack.slice(0, 3).map(s => (
                        <span key={s} className="project-stack-chip">{s}</span>
                      ))}
                    </div>
                  </div>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
