import type { ReactNode } from "react";

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}

export default function Section({ id, eyebrow, title, children, aside }: Props) {
  return (
    <section id={id} className="sec" aria-labelledby={`${id}-title`}>
      <header className="sec-head">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 id={`${id}-title`} className="sec-title">{title}</h2>
        </div>
        {aside}
      </header>
      {children}
    </section>
  );
}
