import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, PROJECTS } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <main className="proj-page">
      <div className="proj-container">

        {/* back */}
        <Link href="/" className="proj-back">
          ← 돌아가기
        </Link>

        {/* header */}
        <div className="proj-header">
          <h1 className="proj-title">{project.title}</h1>
          <p className="proj-summary">{project.summary}</p>
          <div className="proj-meta">
            <span className="proj-meta-item">📅 {project.period}</span>
            <span className="proj-meta-item">🙋 {project.role}</span>
          </div>
          <div className="proj-links">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-link proj-link-github">
                GitHub ↗
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-link proj-link-live">
                Live ↗
              </a>
            )}
          </div>
        </div>

        <div className="proj-body">

          {/* description */}
          <section className="proj-section">
            <h2 className="proj-section-title">프로젝트 소개</h2>
            <p className="proj-desc">{project.description}</p>
          </section>

          {/* highlights */}
          <section className="proj-section">
            <h2 className="proj-section-title">주요 기능</h2>
            <ul className="proj-highlights">
              {project.highlights.map(h => (
                <li key={h} className="proj-highlight-item">
                  <span className="proj-highlight-dot" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          {/* stack */}
          <section className="proj-section">
            <h2 className="proj-section-title">기술 스택</h2>
            <div className="proj-stack">
              {project.stack.map(s => (
                <span key={s} className="proj-stack-tag">{s}</span>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
