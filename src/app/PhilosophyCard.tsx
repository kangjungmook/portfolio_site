const LINES = [
  "모르면 일단 만들어보면서 이해하는 편이에요.",
  "막히면 오래 붙잡습니다. 넘기는 게 더 불편해서요.",
  "코드가 많은 것보다 명확한 게 낫다고 생각해요.",
];

export default function PhilosophyCard({ delay }: { delay: number }) {
  return (
    <div className="card" style={{ animationDelay: `${delay}s` }}>
      <div className="card-label">
        <span className="dot" />
        이런 개발자입니다
      </div>
      <div className="phil-lines">
        {LINES.map(line => (
          <p key={line} className="phil-line">{line}</p>
        ))}
      </div>
    </div>
  );
}
