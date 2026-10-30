import Link from "next/link";
import { fetchGitHubData } from "@/lib/github";
import { PUBLIC_PROJECTS } from "@/lib/projects";
import { CERTS, MBTI, PATH, PROFILE, SERVICE, STACK, WORKSTYLE } from "@/lib/profile";
import Section from "@/components/Section";
import ProjectRow from "@/components/ProjectRow";
import ContribGraph from "@/components/ContribGraph";
import ThemeToggle from "@/components/ThemeToggle";

// 1시간마다 깃허브 데이터·복무 진행률 갱신
export const revalidate = 3600;

const MS_DAY = 86_400_000;

function serviceProgress() {
  const now = Date.now();
  const total = SERVICE.end.getTime() - SERVICE.start.getTime();
  const elapsed = Math.min(total, Math.max(0, now - SERVICE.start.getTime()));
  return {
    ratio: elapsed / total,
    remaining: Math.max(0, Math.ceil((SERVICE.end.getTime() - now) / MS_DAY)),
  };
}

const NAV = [
  { href: "#work", label: "프로젝트" },
  { href: "#path", label: "이력" },
  { href: "#stack", label: "기술" },
  { href: "#activity", label: "활동" },
  { href: "#contact", label: "연락" },
];

export default async function Portfolio() {
  const gh = await fetchGitHubData();
  const service = serviceProgress();

  return (
    <>
      <header className="bar">
        <div className="bar-inner">
          <a href="#top" className="bar-mark">{PROFILE.name}</a>
          <nav className="bar-nav" aria-label="섹션 이동">
            {NAV.map(n => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main id="top" className="wrap">
        <div className="hero">
          <p className="eyebrow">Backend Developer</p>
          <h1 className="hero-name">{PROFILE.name}</h1>
          <p className="hero-lead">{PROFILE.headline}</p>
          <p className="hero-text">{PROFILE.intro}</p>

          <dl className="facts">
            <div>
              <dt>소속</dt>
              <dd>(주)유플러스시스템</dd>
            </div>
            <div>
              <dt>주력</dt>
              <dd>Java · Spring Boot</dd>
            </div>
            <div className="facts-service">
              <dt>{SERVICE.label} 복무</dt>
              <dd>
                <span className="track" role="img" aria-label={`복무 진행률 ${(service.ratio * 100).toFixed(1)}%`}>
                  <span className="track-fill" style={{ transform: `scaleX(${service.ratio})` }} />
                </span>
                <span className="facts-note">
                  {(service.ratio * 100).toFixed(1)}% · 전역까지 {service.remaining.toLocaleString()}일
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <Section id="work" index="01" label="프로젝트">
          <div className="rows">
            {PUBLIC_PROJECTS.map((p, i) => (
              <ProjectRow key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Section>

        <Section id="path" index="02" label="이력">
          <ol className="ledger">
            {PATH.map(e => (
              <li key={e.title} className="ledger-item">
                <span className="ledger-period">{e.period}</span>
                <div>
                  <h3 className="ledger-title">
                    {e.title}
                    {e.state && <span className="tag">{e.state}</span>}
                  </h3>
                  <p className="ledger-sub">{e.sub}</p>
                  {e.items && (
                    <ul className="works">
                      {e.items.map(w => (
                        <li key={w.title}>
                          <span>{w.title}</span>
                          <span className="works-stack">{w.stack.join(" · ")}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="certs">
            <div>
              <h3 className="mini-title">보유 자격증</h3>
              <ul className="plain">
                {CERTS.held.map(c => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="mini-title">다음 목표</h3>
              <ul className="plain">
                {CERTS.goals.map(g => (
                  <li key={g.name}>
                    {g.name}
                    <span className={g.status === "준비 중" ? "tag" : "muted"}> {g.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="stack" index="03" label="기술">
          <dl className="stack">
            {STACK.map(g => (
              <div key={g.group} className="stack-row">
                <dt>{g.group}</dt>
                <dd>
                  {g.items.map(i => (
                    <span key={i} className={g.core?.includes(i) ? "stack-core" : undefined}>{i}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="activity" index="04" label="활동">
          <div className="numbers">
{gh.contributions && (
            <div>
              <span className="num">{gh.totalCommits.toLocaleString()}</span>
              <span className="num-label">최근 1년 커밋</span>
            </div>
)}
            <div>
              <span className="num">{gh.repos}</span>
              <span className="num-label">공개 저장소</span>
            </div>
{gh.contributions && (
            <div>
              <span className="num">{gh.streak}<small>일</small></span>
              <span className="num-label">연속 커밋</span>
            </div>
)}
          </div>
          {gh.contributions ? (
            <ContribGraph days={gh.contributions} />
          ) : (
            <p className="muted activity-empty">기여 그래프는 GitHub 토큰을 연결하면 표시됩니다.</p>
          )}
          <p className="aside">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="link">
              @{PROFILE.githubUser} GitHub 프로필 열기 ↗
            </a>
          </p>
        </Section>

        <Section id="about" index="05" label="일하는 방식">
          <ul className="statements">
            {WORKSTYLE.map(l => <li key={l}>{l}</li>)}
          </ul>
          <p className="aside muted">
            {MBTI.type} · {MBTI.name} — 말보다 행동으로 보여주는 쪽입니다.
          </p>
        </Section>

        <Section id="contact" index="06" label="연락">
          <p className="contact-lead">함께 일할 이야기라면 언제든 환영합니다.</p>
          <a href={`mailto:${PROFILE.email}`} className="contact-mail">{PROFILE.email}</a>
          <p className="aside">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="link">
              GitHub에서 작업물 보기 ↗
            </a>
            <Link href="/projects" className="link">전체 프로젝트 보기 →</Link>
          </p>
        </Section>
      </main>

      <footer className="foot">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span>Next.js · Vercel</span>
      </footer>
    </>
  );
}
