export const PROFILE = {
  name: "강정묵",
  email: "k01088219732@gmail.com",
  github: "https://github.com/kangjungmook",
  githubUser: "kangjungmook",
  headline: "안정적인 API 설계와 데이터 최적화에 몰입합니다",
  intro:
    "복잡한 요구사항을 명확한 로직으로 구현하고, 시스템의 확장성을 고려하며 개발하는 백엔드 개발자입니다. 보이지 않는 곳의 견고함을 중요하게 생각합니다.",
};

export const SERVICE = {
  label: "산업기능요원",
  start: new Date("2025-03-05"),
  end: new Date("2028-01-04"),
};

export interface PathEntry {
  period: string;
  title: string;
  sub: string;
  state?: string;
  items?: { title: string; stack: string[] }[];
}

export const PATH: PathEntry[] = [
  {
    period: "2025.03 — 현재",
    title: "(주)유플러스시스템",
    sub: "백엔드 개발자 · 산업기능요원",
    state: "재직 중",
    items: [
      { title: "논술 프로그램 기능 개발 및 유지보수", stack: ["Java", "Spring Boot", "JavaScript"] },
      { title: "사내 업무 자동화 툴 개발", stack: ["Python", "Vue.js"] },
    ],
  },
  {
    period: "재학 중",
    title: "동서울대학교",
    sub: "AI응용소프트웨어학과 · P-TECH, 2학년",
  },
  {
    period: "2021.03 입학",
    title: "성일정보고등학교",
    sub: "소프트웨어개발과 졸업",
  },
];

export const CERTS = {
  held: ["정보처리산업기사", "SW개발 L3"],
  goals: [
    { name: "정보처리기사", status: "준비 중" },
    { name: "AWS SAA", status: "목표" },
    { name: "리눅스마스터 2급", status: "목표" },
    { name: "SQLD", status: "목표" },
  ],
};

export const STACK: { group: string; items: string[]; core?: string[] }[] = [
  { group: "Backend", core: ["Java", "Spring Boot"], items: ["Java", "Spring Boot", "Python"] },
  { group: "Database", items: ["MySQL", "MariaDB", "Firebase"] },
  { group: "DevOps", items: ["Docker", "VMware"] },
  { group: "Frontend", items: ["JavaScript", "TypeScript", "Vue.js", "React", "Next.js"] },
  { group: "AI", items: ["Claude", "Codex"] },
  { group: "Tools", items: ["IntelliJ", "VS Code", "Git", "Windows", "Terminal", "Chrome"] },
];

export const WORKSTYLE = [
  "모르면 일단 만들어보면서 이해하는 편이에요.",
  "막히면 오래 붙잡습니다. 넘기는 게 더 불편해서요.",
  "코드가 많은 것보다 명확한 게 낫다고 생각해요.",
];

export const MBTI = { type: "ISTP", name: "만능 재주꾼" };
