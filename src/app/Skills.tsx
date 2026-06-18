"use client";

import { FaJava } from "react-icons/fa";
import {
  SiSpring,
  SiMysql, SiMariadb, SiFirebase,
  SiDocker,
  SiJavascript, SiVuedotjs,
  SiAnthropic, SiOpenai,
} from "react-icons/si";
import type { IconType } from "react-icons";

interface SkillItem {
  name: string;
  Icon: IconType;
  color: string;
}

interface SkillCategory {
  category: string;
  items: SkillItem[];
}

const SKILLS: SkillCategory[] = [
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
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
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
      { name: "Claude",  Icon: SiAnthropic, color: "#d97757" },
      { name: "Codex",   Icon: SiOpenai,    color: "#ffffff" },
    ],
  },
];

export default function Skills() {
  return (
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
  );
}
