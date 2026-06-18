"use client";

import { useEffect, useRef, useState } from "react";
import { FaJava, FaWindows, FaTerminal, FaCode } from "react-icons/fa";
import {
  SiSpring,
  SiMysql, SiMariadb, SiFirebase,
  SiDocker, SiVmware,
  SiJavascript, SiVuedotjs,
  SiAnthropic, SiOpenai,
  SiIntellijidea, SiGit, SiGooglechrome,
} from "react-icons/si";
import type { IconType } from "react-icons";

interface SkillItem  { name: string; Icon: IconType; color: string; }
interface SkillGroup { category: string; items: SkillItem[]; }

const SKILLS: SkillGroup[] = [
  {
    category: "Backend",
    items: [
      { name: "Java",        Icon: FaJava,   color: "#f89820" },
      { name: "Spring Boot", Icon: SiSpring, color: "#6DB33F" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL",    Icon: SiMysql,    color: "#4479A1" },
      { name: "MariaDB",  Icon: SiMariadb,  color: "#c0765a" },
      { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker",  Icon: SiDocker,  color: "#2496ED" },
      { name: "VMware",  Icon: SiVmware,  color: "#607078" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "Vue.js",     Icon: SiVuedotjs,   color: "#4FC08D" },
    ],
  },
  {
    category: "AI",
    items: [
      { name: "Claude", Icon: SiAnthropic, color: "#d97757" },
      { name: "Codex",  Icon: SiOpenai,    color: "#ffffff" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "IntelliJ", Icon: SiIntellijidea, color: "#fe2857" },
      { name: "VS Code",  Icon: FaCode,          color: "#007acc" },
      { name: "Git",      Icon: SiGit,           color: "#f05032" },
      { name: "Windows",  Icon: FaWindows,       color: "#0078d4" },
      { name: "Terminal", Icon: FaTerminal,      color: "#4ec9b0" },
      { name: "Chrome",   Icon: SiGooglechrome,  color: "#fbbc05" },
    ],
  },
];

export default function SkillsCard({ delay }: { delay: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
    };
    check();
    el.addEventListener("scroll", check);
    return () => el.removeEventListener("scroll", check);
  }, []);

  return (
    <div className="card" style={{ animationDelay: `${delay}s` }}>
      <div className="card-label">
        <span className="dot" />
        Skills
      </div>
      <div className="skills-scroll-wrap">
        <div className="skills-scroll" ref={scrollRef}>
          <div className="skills-list">
            {SKILLS.map(({ category, items }) => (
              <div key={category} className="skill-row">
                <span className="skill-category">{category}</span>
                <div className="skill-tags">
                  {items.map(({ name, Icon, color }) => (
                    <span key={name} className="skill-tag">
                      <Icon style={{ color, fontSize: "15px", flexShrink: 0 }} />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {!atBottom && (
          <div className="skills-more">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
