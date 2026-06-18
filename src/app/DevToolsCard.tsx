import { SiIntellijidea, SiGit, SiGooglechrome } from "react-icons/si";
import { FaWindows, FaTerminal, FaCode } from "react-icons/fa";
import type { IconType } from "react-icons";

interface Tool { icon: IconType; name: string; label: string; color: string; }

const TOOLS: Tool[] = [
  { icon: SiIntellijidea, name: "IntelliJ IDEA", label: "IDE",      color: "#fe2857" },
  { icon: FaCode,         name: "VS Code",        label: "Editor",   color: "#007acc" },
  { icon: FaWindows,      name: "Windows 11",     label: "OS",       color: "#0078d4" },
  { icon: FaTerminal,     name: "Git Bash",       label: "Terminal", color: "#4ec9b0" },
  { icon: SiGit,          name: "Git",            label: "VCS",      color: "#f05032" },
  { icon: SiGooglechrome, name: "Chrome",         label: "Browser",  color: "#fbbc05" },
];

export default function DevToolsCard({ delay }: { delay: number }) {
  return (
    <div className="card" style={{ animationDelay: `${delay}s` }}>
      <div className="card-label">
        <span className="dot" />
        개발 도구
      </div>
      <div className="tools-list">
        {TOOLS.map(({ icon: Icon, name, label, color }) => (
          <div key={name} className="tool-item">
            <Icon style={{ color, fontSize: "18px", flexShrink: 0 }} />
            <span className="tool-name">{name}</span>
            <span className="tool-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
