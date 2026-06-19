export interface ProjectImage {
  label: string;
  folder: string;
  files: string[];
}

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
  images?: ProjectImage[];
  icon?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "meeting-room",
    icon: "/icons/meeting-room.jpg",
    title: "회의실 예약 시스템",
    summary: "사내 회의실 예약·관리·키오스크를 하나로 묶은 풀스택 시스템",
    description: `사내에서 실제로 운영 중인 회의실 예약 시스템입니다.
직원들이 매일 사용하는 만큼 안정성과 편의성에 집중해 개발했습니다.

사용자는 일·주·월 캘린더 뷰로 전체 예약 현황을 확인하고 바로 예약할 수 있으며, 관리자는 별도 콘솔에서 회의실·회원·예약을 통합 관리합니다. 로비에 설치된 키오스크 모드도 함께 제공합니다.`,
    stack: ["Java 21", "Spring Boot", "Spring Security", "JWT", "JPA", "MariaDB", "Vue.js", "Firebase FCM"],
    githubUrl: "https://github.com/kangjungmook/meeting-room",
    liveUrl: "",
    period: "2025.03 — 2026.06",
    role: "풀스택 개발 (단독)",
    highlights: [
      "사용자 / 관리자 / 키오스크 / 모바일 4가지 뷰 구현",
      "Firebase FCM 연동으로 예약 생성·변경·취소 시 푸시 알림 발송",
      "관리 로그로 모든 액션(로그인·예약·회원 관리 등) IP·디바이스·브라우저 기록",
      "점검 모드 — 활성화 시 ADMIN 제외 전체 API를 503으로 차단",
      "Spring Security + JWT 기반 인증, 회원 가입 승인·거절·자동 승인 흐름 구현",
    ],
    images: [
      {
        label: "사용자 화면",
        folder: "user",
        files: [
          "88adcd0f-d567-41bf-9cbd-2dfd3f38285f.png",
          "0da20038-cbb5-4391-820d-580cad195673.png",
          "1f56d25c-d86d-4264-8769-0073cb4782b2.png",
          "90b61dd4-1b48-43de-9205-5aea403c6ddd.png",
          "98d61c04-a713-4092-a1ec-86d0665e678d.png",
          "bde03e12-5bf7-48e3-8eaf-e94cf3fb63ca.png",
          "db4f9e9a-b868-4cc8-94ec-8428dc46da96.png",
          "de14a40b-22f9-49d2-a775-52fc38456867.png",
          "fd3288c8-5988-4d4a-8234-c3200591642c.png",
        ],
      },
      {
        label: "키오스크",
        folder: "kiosk",
        files: [
          "28512916-e922-4020-83c8-614c583e44d7.png",
          "7a8bcfb4-015f-4859-a5c5-4d1a15a0abe8.png",
        ],
      },
      {
        label: "모바일",
        folder: "mobile",
        files: [],
      },
      {
        label: "관리자 화면",
        folder: "admin",
        files: [
          "1e3379c0-0c5b-4865-af5c-2ee79f3aadc5.png",
          "054af8cd-ed9a-4482-bec5-ae84e01d1143.png",
          "1fd000fd-8404-4e2a-aefe-022837d5c07e.png",
          "208be1a4-e274-48fe-8bfe-f2dcbad7a89b.png",
          "5a6f36c4-5c5b-4c55-a261-9d221743386a.png",
          "901766f0-0f3a-4875-938b-13fcd1bcfd59.png",
          "b545ef23-6bb1-4e40-a9a7-d848f96ccb7e.png",
          "d1db746d-9aec-4943-8d41-341de520a8d3.png",
          "db0c7785-fca3-48dc-be79-e81683e58584.png",
          "dda03c55-38bd-4305-9cc1-490e4e9fd1c4.png",
          "ec23d347-56d3-46bb-a6f7-d4982a8cdee7.png",
        ],
      },
    ],
  },
  {
    slug: "omr-tool",
    title: "OMR 좌표 추출 툴",
    summary: "여기에 한 줄 요약을 적어주세요",
    description: `여기에 프로젝트 설명을 적어주세요.`,
    stack: ["Python"],
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
