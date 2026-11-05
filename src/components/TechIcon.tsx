import { getTech } from "@/lib/tech";

/** 기술 이름에 맞는 아이콘. 등록되지 않은 이름은 아무것도 그리지 않습니다. */
export default function TechIcon({ name, size = 20 }: { name: string; size?: number }) {
  const tech = getTech(name);
  if (!tech) return null;
  const { Icon, color } = tech;
  return <Icon aria-hidden="true" size={size} className="tech-icon" style={color ? { color } : undefined} />;
}
