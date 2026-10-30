import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, DETAIL_PROJECTS } from "@/lib/projects";
import Section from "@/components/Section";
import ThemeToggle from "@/components/ThemeToggle";
import ImageGallery from "./ImageGallery";

export function generateStaticParams() {
  return DETAIL_PROJECTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: `${project.title} | 강정묵`, description: project.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const hasImages = project.images?.some(g => g.files.length > 0);

  return (
    <>
      <header className="bar">
        <div className="bar-inner">
          <Link href="/projects" className="logo">← 프로젝트 목록으로 돌아가기</Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="wrap">
        <div className="page-head">
          <span className="eyebrow">Project</span>
          <h1 className="page-title">{project.title}</h1>
          <p className="hero-text">{project.summary}</p>
          <dl className="stats stats-3">
            {(project.period || project.role) && (
              <div className="stat">
                <dt className="stat-label">{project.role ? "기간 · 역할" : "구분"}</dt>
                <dd className="stat-value stat-value-sm">
                  {[project.period, project.role].filter(Boolean).join(" · ")}
                </dd>
              </div>
            )}
            {project.team && (
              <div className="stat">
                <dt className="stat-label">팀 구성</dt>
                <dd className="stat-value stat-value-sm">{project.team}</dd>
              </div>
            )}
            {(project.githubUrl || project.liveUrl) && (
              <div className="stat">
                <dt className="stat-label">링크</dt>
                <dd className="stat-value stat-value-sm facts-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link">
                      GitHub 저장소 열기 ↗
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link">
                      서비스 열기 ↗
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {project.description && (
          <Section id="intro" eyebrow="Overview" title="소개">
            <p className="prose">{project.description}</p>
          </Section>
        )}

        {project.did.length > 0 && (
          <Section id="highlights" eyebrow="Highlights" title="주요 구현">
            <ol className="numbered">
              {project.did.map(h => <li key={h}>{h}</li>)}
            </ol>
          </Section>
        )}

        {project.features && (
          <Section id="features" eyebrow="Features" title="주요 기능">
            <div className="list">
              {project.features.map(f => (
                <div key={f.group} className="exp">
                  <p className="exp-name">{f.group}</p>
                  <p className="exp-role">{f.items}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section id="stack" eyebrow="Tech Stack" title="기술 스택">
          <ul className="pills">
            {project.stack.map(s => <li key={s}>{s}</li>)}
          </ul>
        </Section>

        {hasImages && project.images && (
          <Section id="screens" eyebrow="Screens" title="화면">
            <ImageGallery images={project.images} slug={slug} title={project.title} />
          </Section>
        )}
      </main>
    </>
  );
}
