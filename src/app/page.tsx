import Link from "next/link";
import { fetchGitHubData } from "@/lib/github";
import { PROJECTS } from "@/lib/projects";
import { CAREER_START, PROFILE, SKILLS, TIMELINE } from "@/lib/profile";
import Section from "@/components/Section";
import ProjectItem from "@/components/ProjectItem";
import ContribGraph from "@/components/ContribGraph";
import ThemeToggle from "@/components/ThemeToggle";
import CopyEmail from "@/components/CopyEmail";

// 1시간마다 깃허브 데이터·경력 기간 갱신
export const revalidate = 3600;

const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function careerLabel() {
  const now = new Date();
  const months =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 + now.getMonth() - CAREER_START.getMonth();
  const y = Math.floor(months / 12);
  const m = months % 12;
  return `${y}년${m ? ` ${m}개월` : ""}+`;
}

export default async function Portfolio() {
  const gh = await fetchGitHubData();
  const work = PROJECTS.filter(p => p.kind === "work");
  const side = PROJECTS.filter(p => p.kind === "side");
  const wip = PROJECTS.filter(p => p.kind === "wip");

  const numbers = [
    { value: careerLabel(), label: "실무 경력" },
    { value: "2개", label: "자격증 · 정보처리산업기사, SW개발 L3" },
    { value: "5개+", label: "사내 프로젝트" },
    { value: "1개", label: "실서비스 팀 프로젝트" },
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
          <span className="eyebrow">Backend Developer</span>
          <p className="pill"><span className="pulse" aria-hidden="true" />(주)유플러스시스템 재직 중</p>
          <h1 className="hero-title">
            기능을 만드는 것에서 끝내지 않고, <em>현장에서 돌아가는 것</em>까지 책임지는 백엔드 개발자입니다.
          </h1>
          <p className="hero-text mono-lg">{PROFILE.stack}</p>
          <div className="actions">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              GitHub 프로필 열기 <span className="mono">↗</span>
            </a>
            <a href={`mailto:${PROFILE.email}`} className="btn">{PROFILE.email}</a>
          </div>
        </section>

        <Section id="about" eyebrow="About" title="소개">
          <div className="prose-cols">
            {PROFILE.about.map(p => <p key={p}>{p}</p>)}
          </div>
          <dl className="stats">
            {numbers.map(n => (
              <div key={n.label} className="stat">
                <dt className="stat-value">{n.value}</dt>
                <dd className="stat-label">{n.label}</dd>
              </div>
            ))}
          </dl>
          {gh.contributions && (
            <div className="activity">
              <p className="mono">GitHub 활동 · 최근 19주</p>
              <ContribGraph days={gh.contributions} />
            </div>
          )}
        </Section>

        <Section id="skills" eyebrow="Skills" title="기술">
          <div className="list">
            {SKILLS.map(s => (
              <div key={s.group} className="exp">
                <p className="mono exp-label">{s.group}</p>
                <ul className="pills">{s.items.map(i => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="work" eyebrow="Work Projects" title="회사 프로젝트">
          <div className="list">
            {work.map((p, i) => <ProjectItem key={p.slug} project={p} index={i} />)}
          </div>
        </Section>

        <Section id="side" eyebrow="Side Projects" title="개인 · 팀 프로젝트">
          <div className="list">
            {side.map((p, i) => <ProjectItem key={p.slug} project={p} index={i} />)}
          </div>
          <h3 className="sub-title">진행 중</h3>
          <div className="list">
            {wip.map(p => <ProjectItem key={p.slug} project={p} />)}
          </div>
        </Section>

        <Section id="experience" eyebrow="Experience" title="경력 · 학력 · 자격">
          <div className="list">
            {TIMELINE.map(e => (
              <div key={e.title + e.period} className="exp">
                <div>
                  <p className="exp-name">
                    {e.title}
                    {e.state && <span className="tag">{e.state}</span>}
                  </p>
                  <p className="mono">{e.period}</p>
                </div>
                <p className="exp-role">{e.sub}</p>
              </div>
            ))}
          </div>
        </Section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <span className="eyebrow">Contact</span>
          <h2 id="contact-title" className="contact-title">함께 일할 기회를<br />찾고 있습니다.</h2>
          <div className="actions">
            <CopyEmail email={PROFILE.email} />
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn">GitHub 열기 ↗</a>
            <Link href="/projects" className="btn">프로젝트 상세 보기</Link>
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
