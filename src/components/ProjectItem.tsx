import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

export default function ProjectItem({ project }: { project: Project }) {
  const { slug, title, summary, stack, period, role, icon, metrics } = project;
  return (
    <article className="proj">
      <div className="proj-main">
        <p className="mono">{period} · {role}</p>
        <h3 className="proj-title">
          {icon && <Image src={icon} alt="" width={40} height={40} className="proj-icon" />}
          <Link href={`/projects/${slug}`} className="proj-link">{title}</Link>
        </h3>
        <p className="proj-summary">{summary}</p>
        <span className="proj-more" aria-hidden="true">자세히 보기 →</span>
      </div>
      <div className="proj-side">
        {metrics && (
          <ul className="metrics">
            {metrics.map(m => (
              <li key={m.label}>
                <span className="metric-value">{m.value}</span>
                <span className="metric-label">{m.label}</span>
              </li>
            ))}
          </ul>
        )}
        <ul className="pills">
          {stack.map(s => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </article>
  );
}
