import type { Metadata } from "next";
import Link from "next/link";
import { PUBLIC_PROJECTS } from "@/lib/projects";
import ProjectRow from "@/components/ProjectRow";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = { title: "프로젝트 | 강정묵" };

export default function ProjectsPage() {
  return (
    <>
      <header className="bar">
        <div className="bar-inner">
          <Link href="/" className="bar-mark">← 홈으로 돌아가기</Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="wrap">
        <div className="page-head">
          <h1 className="page-title">프로젝트</h1>
          <p className="hero-text">직접 만들고 운영하며 배운 것들을 모아뒀습니다.</p>
        </div>
        <div className="rows rows-open">
          {PUBLIC_PROJECTS.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </main>
    </>
  );
}
