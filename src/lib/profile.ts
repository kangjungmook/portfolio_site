export const PROFILE = {
  name: "강정묵",
  email: "kangjungmook882@gmail.com",
  github: "https://github.com/kangjungmook",
  githubUser: "kangjungmook",
  tagline: "기능을 만드는 것에서 끝내지 않고, 현장에서 돌아가는 것까지 책임지는 백엔드 개발자입니다.",
  stack: "Java · Spring Boot · MyBatis · Oracle",
  about: [
    "2024년 3월부터 대입 입시 솔루션 회사에서 백엔드 개발을 하고 있습니다. 논술 채점·전자출결·OMR 판독 시스템의 기능을 개발했고, 입시 시즌에는 고객사 현장에 나가 배포와 네트워크·백업까지 맡아 왔습니다.",
    "반복되는 일은 도구로 만들고, 한 번 겪은 장애는 다음 사람도 같은 방법으로 처리할 수 있게 절차로 남기는 것을 좋아합니다.",
  ],
};

export const CAREER_START = new Date("2024-03-01");

export const SKILLS: { group: string; items: string[] }[] = [
  { group: "Backend", items: ["Java", "Spring Boot", "MyBatis", "Node.js"] },
  { group: "Frontend", items: ["React", "Vue 3 (Pinia)", "React Native (Expo)", "TypeScript"] },
  { group: "Database", items: ["Oracle", "MariaDB", "Supabase"] },
  { group: "DevOps / Infra", items: ["Docker", "nginx", "Vercel", "WAR 배포", "네트워크 구성"] },
  { group: "API / AI", items: ["Google Gemini", "Claude API", "토스페이먼츠"] },
  { group: "Tools", items: ["GitLab", "GitHub", "SVN", "Claude Code"] },
  { group: "Etc", items: ["Python", "OpenCV", "Tkinter", "PyInstaller"] },
];

export const TIMELINE: { period: string; title: string; sub: string; state?: string }[] = [
  { period: "2024.03 ~ 현재", title: "(주)유플러스시스템", sub: "백엔드 개발 (산업기능요원)", state: "재직 중" },
  { period: "2025.03 ~ 재학 중", title: "동서울대학교", sub: "AI응용소프트웨어과 (P-TECH)" },
  { period: "2022.03 ~ 2024.12", title: "성일정보고등학교", sub: "소프트웨어개발과" },
  { period: "2024.12", title: "자격증", sub: "정보처리산업기사 / SW개발 L3 (일학습병행), 한국산업인력공단" },
];
