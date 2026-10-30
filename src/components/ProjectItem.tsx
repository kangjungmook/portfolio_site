import Link from "next/link";
import Image from "next/image";
import { hasDetail, type Project } from "@/lib/projects";

const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];

export default function ProjectItem({ project, index }: { project: Project; index?: number }) {
  const { slug, title, summary, stack, period, org, role, team, problem, did, icon, liveUrl } = project;
  const detail = hasDetail(project);

  return (
    <article className="proj">
      <div className="proj-main">
        <p className="mono">{[period, org].filter(Boolean).join(" · ")}</p>
        <h3 className="proj-title">
          {icon && <Image src={icon} alt="" width={40} height={40} className="proj-icon" />}
          {index !== undefined && <span className="proj-no" aria-hidden="true">{CIRCLED[index]}</span>}
          {detail ? (
            <Link href={`/projects/${slug}`} className="proj-link">{title}</Link>
          ) : (
            <span>{title}</span>
          )}
        </h3>
        <p className="proj-summary">{summary}</p>
        {team && <p className="mono">{team}</p>}
        {role && <p className="mono">내 역할 · {role}</p>}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="link proj-live">
            {liveUrl.replace("https://", "")} 열기 ↗
          </a>
        )}
        {detail && <span className="proj-more" aria-hidden="true">자세히 보기 →</span>}
      </div>
      <div className="proj-side">
        {problem && (
          <div>
            <h4 className="mono">문제</h4>
            <p>{problem}</p>
          </div>
        )}
        {did.length > 0 && (
          <div>
            <h4 className="mono">{problem ? "한 일" : "주요 내용"}</h4>
            <ul className="did">{did.map(d => <li key={d}>{d}</li>)}</ul>
          </div>
        )}
        <ul className="pills">{stack.map(s => <li key={s}>{s}</li>)}</ul>
      </div>
    </article>
  );
}
