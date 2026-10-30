import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

export default function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { slug, title, summary, stack, period, role, icon } = project;
  return (
    <Link href={`/projects/${slug}`} className="row" aria-label={`${title} 자세히 보기`}>
      <span className="row-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="row-main">
        <span className="row-head">
          {icon && (
            <Image src={icon} alt="" width={48} height={48} className="row-icon" />
          )}
          <span className="row-title">{title}</span>
        </span>
        <span className="row-summary">{summary}</span>
        <span className="row-meta">{period} · {role}</span>
        <span className="row-stack">{stack.join(" · ")}</span>
      </span>
      <span className="row-arrow" aria-hidden="true">→</span>
    </Link>
  );
}
