import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <main className="proj-page">
      <div className="proj-container">

        <Link href="/" className="proj-back">
          ← 돌아가기
        </Link>

        <div className="projlist-header">
          <h1 className="projlist-title">프로젝트</h1>
          <p className="projlist-desc">직접 만들고 경험한 것들을 모아뒀습니다.</p>
        </div>

        <div className="projlist-grid">
          {PROJECTS.map(({ slug, title, summary, stack, period, role, icon }) => (
            <Link key={slug} href={`/projects/${slug}`} className="projlist-card">
              {icon ? (
                <div className="projlist-thumb">
                  <Image src={icon} alt={title} fill className="project-thumb-img" />
                </div>
              ) : (
                <div className="projlist-thumb" aria-hidden="true" />
              )}
              <div className="projlist-body">
                <div className="projlist-meta">
                  <span className="projlist-period">{period}</span>
                  <span className="projlist-role">{role}</span>
                </div>
                <h2 className="projlist-name">{title}</h2>
                <p className="projlist-summary">{summary}</p>
                <div className="projlist-stack">
                  {stack.map(s => (
                    <span key={s} className="proj-stack-tag">{s}</span>
                  ))}
                </div>
              </div>
              <span className="projlist-arrow">↗</span>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
