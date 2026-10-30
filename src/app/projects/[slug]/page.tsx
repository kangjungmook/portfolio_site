import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, PUBLIC_PROJECTS } from "@/lib/projects";
import Section from "@/components/Section";
import ThemeToggle from "@/components/ThemeToggle";
import ImageGallery from "./ImageGallery";

export function generateStaticParams() {
  return PUBLIC_PROJECTS.map(p => ({ slug: p.slug }));
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
            <div className="stat">
              <dt className="stat-label">기간</dt>
              <dd className="stat-value stat-value-sm">{project.period}</dd>
            </div>
            <div className="stat">
              <dt className="stat-label">역할</dt>
              <dd className="stat-value stat-value-sm">{project.role}</dd>
            </div>
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

        <Section id="intro" eyebrow="Overview" title="소개">
          <p className="prose">{project.description}</p>
        </Section>

        <Section id="highlights" eyebrow="Highlights" title="주요 구현">
          <ol className="numbered">
            {project.highlights.map(h => <li key={h}>{h}</li>)}
          </ol>
        </Section>

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
