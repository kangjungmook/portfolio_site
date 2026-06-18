export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  period: string;
  role: string;
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "meeting-room",
    title: "회의실 예약 시스템",
    summary: "여기에 한 줄 요약을 적어주세요",
    description: `여기에 프로젝트 설명을 적어주세요.
여러 줄로 작성할 수 있습니다.`,
    stack: ["Java", "Spring Boot"],         // 사용 기술 추가
    githubUrl: "",                           // GitHub 주소
    liveUrl: "",                             // 배포 주소 (없으면 빈 칸)
    period: "0000.00 — 0000.00",            // 개발 기간
    role: "역할을 적어주세요",
    highlights: [
      "주요 기능 또는 성과 1",
      "주요 기능 또는 성과 2",
      "주요 기능 또는 성과 3",
    ],
  },
  {
    slug: "omr-tool",
    title: "OMR 좌표 추출 툴",
    summary: "여기에 한 줄 요약을 적어주세요",
    description: `여기에 프로젝트 설명을 적어주세요.`,
    stack: ["Python"],                       // 사용 기술 추가
    githubUrl: "",
    liveUrl: "",
    period: "0000.00 — 0000.00",
    role: "역할을 적어주세요",
    highlights: [
      "주요 기능 또는 성과 1",
      "주요 기능 또는 성과 2",
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find(p => p.slug === slug) ?? null;
}
