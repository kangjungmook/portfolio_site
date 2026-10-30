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
          <Link href="/projects" className="bar-mark">← 프로젝트 목록으로 돌아가기</Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="wrap">
        <div className="page-head">
          <h1 className="page-title">{project.title}</h1>
          <p className="hero-text">{project.summary}</p>
          <dl className="facts">
            <div>
              <dt>기간</dt>
              <dd>{project.period}</dd>
            </div>
            <div>
              <dt>역할</dt>
              <dd>{project.role}</dd>
            </div>
            {(project.githubUrl || project.liveUrl) && (
              <div>
                <dt>링크</dt>
                <dd className="facts-links">
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

        <Section id="intro" index="01" label="소개">
          <p className="prose">{project.description}</p>
        </Section>

        <Section id="highlights" index="02" label="주요 구현">
          <ol className="numbered">
            {project.highlights.map(h => <li key={h}>{h}</li>)}
          </ol>
        </Section>

        <Section id="stack" index="03" label="기술">
          <p className="stack-inline">
            {project.stack.map(s => <span key={s}>{s}</span>)}
          </p>
        </Section>

        {hasImages && project.images && (
          <Section id="screens" index="04" label="화면">
            <ImageGallery images={project.images} slug={slug} title={project.title} />
          </Section>
        )}
      </main>
    </>
  );
}
