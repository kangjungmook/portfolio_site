import Link from "next/link";
import { fetchGitHubData } from "@/lib/github";
import { PUBLIC_PROJECTS } from "@/lib/projects";
import { CERTS, MBTI, PATH, PROFILE, SERVICE, STACK, WORKSTYLE } from "@/lib/profile";
import Section from "@/components/Section";
import ProjectItem from "@/components/ProjectItem";
import ContribGraph from "@/components/ContribGraph";
import ThemeToggle from "@/components/ThemeToggle";
import CopyEmail from "@/components/CopyEmail";

// 1시간마다 깃허브 데이터·복무 진행률 갱신
export const revalidate = 3600;

const MS_DAY = 86_400_000;

function serviceProgress() {
  const now = Date.now();
  const total = SERVICE.end.getTime() - SERVICE.start.getTime();
  const elapsed = Math.min(total, Math.max(0, now - SERVICE.start.getTime()));
  return {
    pct: (elapsed / total) * 100,
    remaining: Math.max(0, Math.ceil((SERVICE.end.getTime() - now) / MS_DAY)),
  };
}

const NAV = [
  { href: "#work", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default async function Portfolio() {
  const gh = await fetchGitHubData();
  const service = serviceProgress();

  const stats = [
    { value: `${service.pct.toFixed(1)}%`, label: `${SERVICE.label} 복무 진행 · 전역까지 ${service.remaining.toLocaleString()}일` },
    { value: String(gh.repos), label: "공개 GitHub 저장소" },
    ...(gh.contributions
      ? [
          { value: gh.totalCommits.toLocaleString(), label: "최근 1년 커밋" },
          { value: `${gh.streak}일`, label: "연속 커밋" },
        ]
      : [
          { value: "4종", label: "회의실 시스템 뷰 · 사용자/관리자/키오스크/모바일" },
          { value: "2025.03", label: "(주)유플러스시스템 근무 시작" },
        ]),
  ];

  return (
    <>
      <header className="bar">
        <div className="bar-inner">
          <a href="#top" className="logo">{PROFILE.name}<span>.</span></a>
          <nav className="bar-nav" aria-label="섹션 이동">
            {NAV.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="bar-cta">
              GitHub ↗
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main id="top" className="wrap">
        <section className="hero">
          <span className="eyebrow">Backend Developer · Java · Spring Boot</span>
          <p className="pill"><span className="pulse" aria-hidden="true" />(주)유플러스시스템 재직 중</p>
          <h1 className="hero-title">
            안정적인 <em>API 설계</em>와<br /><em>데이터 최적화</em>에 몰입합니다
          </h1>
          <p className="hero-text">
            복잡한 요구사항을 명확한 로직으로 구현하고, 시스템의 확장성을 고려하는{" "}
            <strong>백엔드 개발자 {PROFILE.name}</strong>입니다. 보이지 않는 곳의 견고함을 중요하게 생각합니다.
          </p>
          <div className="actions">
            <a href="#work" className="btn btn-solid">프로젝트 살펴보기 <span className="mono">→</span></a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn">GitHub 프로필 열기</a>
            <a href={`mailto:${PROFILE.email}`} className="btn">이메일 보내기</a>
          </div>

          <dl className="stats">
            {stats.map(s => (
              <div key={s.label} className="stat">
                <dt className="stat-value">{s.value}</dt>
                <dd className="stat-label">{s.label}</dd>
              </div>
            ))}
          </dl>
          {gh.contributions && <ContribGraph days={gh.contributions} />}
        </section>

        <Section id="work" eyebrow="Selected Works" title="주요 프로젝트">
          <div className="list">
            {PUBLIC_PROJECTS.map(p => <ProjectItem key={p.slug} project={p} />)}
          </div>
        </Section>

        <Section id="experience" eyebrow="Experience" title="경력 · 학력">
          <div className="list">
            {PATH.map(e => (
              <div key={e.title} className="exp">
                <div>
                  <p className="exp-name">
                    {e.title}
                    {e.state && <span className="tag">{e.state}</span>}
                  </p>
                  <p className="mono">{e.period}</p>
                </div>
                <div className="exp-body">
                  <p className="exp-role">{e.sub}</p>
                  {e.items && (
                    <ul className="exp-works">
                      {e.items.map(w => (
                        <li key={w.title}>
                          {w.title}
                          <span className="mono"> — {w.stack.join(" · ")}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="certs">
            <div>
              <h3 className="mono">보유 자격증</h3>
              <ul>{CERTS.held.map(c => <li key={c}>{c}</li>)}</ul>
            </div>
            <div>
              <h3 className="mono">다음 목표</h3>
              <ul>
                {CERTS.goals.map(g => (
                  <li key={g.name}>
                    {g.name}{" "}
                    <span className={g.status === "준비 중" ? "tag" : "mono"}>{g.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="stack" eyebrow="Tech Stack" title="기술 스택">
          <div className="stack">
            {STACK.map(g => (
              <div key={g.group} className="stack-group">
                <h3 className="mono">{g.group.toLowerCase()}</h3>
                <ul>
                  {g.items.map(i => (
                    <li key={i} className={g.core?.includes(i) ? "is-core" : undefined}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="about" eyebrow="About" title="일하는 방식">
          <ol className="list about">
            {WORKSTYLE.map((l, i) => (
              <li key={l}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <p>{l}</p>
              </li>
            ))}
          </ol>
          <p className="mono about-note">{MBTI.type} · {MBTI.name} — 말보다 행동으로 보여주는 쪽입니다.</p>
        </Section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <span className="eyebrow">Contact</span>
          <h2 id="contact-title" className="contact-title">
            함께 단단한 시스템을<br />만들어보고 싶다면.
          </h2>
          <div className="actions">
            <CopyEmail email={PROFILE.email} />
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn">GitHub에서 작업물 보기</a>
            <Link href="/projects" className="btn">전체 프로젝트 보기</Link>
          </div>
        </section>
      </main>

      <footer className="foot">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span>Next.js · Vercel</span>
      </footer>
    </>
  );
}
