import type { ReactNode } from "react";

interface Props {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
}

/** 왼쪽 여백에 번호·제목, 오른쪽에 본문을 두는 2열 구조. 카드 없이 여백으로 구획을 나눕니다. */
export default function Section({ id, index, label, children }: Props) {
  return (
    <section id={id} className="sec" aria-labelledby={`${id}-title`}>
      <header className="sec-gutter">
        <span className="sec-index">{index}</span>
        <h2 id={`${id}-title`} className="sec-title">{label}</h2>
      </header>
      <div className="sec-body">{children}</div>
    </section>
  );
}
