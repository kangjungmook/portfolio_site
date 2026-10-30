import type { Metadata } from "next";
import Link from "next/link";
import { PUBLIC_PROJECTS } from "@/lib/projects";
import ProjectItem from "@/components/ProjectItem";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = { title: "프로젝트 | 강정묵" };

export default function ProjectsPage() {
  return (
    <>
      <header className="bar">
        <div className="bar-inner">
          <Link href="/" className="logo">← 홈으로 돌아가기</Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="wrap">
        <div className="page-head">
          <span className="eyebrow">Selected Works</span>
          <h1 className="page-title">프로젝트</h1>
          <p className="hero-text">직접 만들고 운영하며 배운 것들을 모아뒀습니다.</p>
        </div>
        <div className="list">
          {PUBLIC_PROJECTS.map(p => <ProjectItem key={p.slug} project={p} />)}
        </div>
      </main>
    </>
  );
}
