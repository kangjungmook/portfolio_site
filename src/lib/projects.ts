export interface ProjectImage {
  label: string;
  folder: string;
  files: string[];
}

export interface Feature {
  group: string;
  items: string;
}

export interface Project {
  slug: string;
  kind: "work" | "side" | "wip";
  title: string;
  summary: string;
  period?: string;
  org?: string;
  role?: string;
  team?: string;
  problem?: string;
  /** 상세 페이지 소개문 */
  description?: string;
  /** 한 일 / 주요 구현 */
  did: string[];
  features?: Feature[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  images?: ProjectImage[];
  icon?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "essay-grading",
    kind: "work",
    title: "논술 채점 시스템 고도화",
    period: "2025.05 ~ 2025.12",
    org: "(주)유플러스시스템",
    summary: "채점 분포를 모집단위별로 자세히 볼 수 있게 개선",
    problem: "채점 분포 화면이 여러 메뉴로 나뉘어 있어서, 고객사가 모집단위별로 자세히 보기 어려웠습니다.",
    did: [
      "모집단위·문제·평가자 기준으로 분포를 보는 메뉴를 Controller–Service–MyBatis 구조로 개발했습니다.",
      "답안지 이미지의 문항별 채점 영역 좌표 데이터를 구축했습니다.",
      "대학별 수험자 데이터를 Oracle로 옮겼습니다.",
    ],
    stack: ["Java", "Spring MVC", "MyBatis", "Oracle"],
  },
  {
    slug: "omr-tool",
    kind: "work",
    title: "OMR 좌표 추출 툴",
    period: "2026.04 ~ 2026.06",
    org: "(주)유플러스시스템",
    summary: "답안지 코너 마커를 인식해 판독 좌표를 자동으로 추출하는 데스크톱 툴",
    problem: "OMR 답안지마다 판독 좌표를 손으로 설정해야 했습니다.",
    did: [
      "답안지 네 모서리의 코너 마커를 인식해 203개 답안 영역의 좌표를 자동으로 뽑는 데스크톱 툴을 만들었습니다.",
      "탐색·직접 그리기·선택 모드 GUI를 넣었습니다.",
      "개발 환경 없이도 쓸 수 있게 실행 파일로 배포했습니다.",
    ],
    stack: ["Python", "OpenCV", "Tkinter", "PyInstaller"],
  },
  {
    slug: "ams",
    kind: "work",
    title: "자산관리시스템 (AMS)",
    period: "2026.07 ~ 2026.09",
    org: "(주)유플러스시스템",
    summary: "역할별로 메뉴와 기능을 나눈 자산관리 시스템",
    did: ["5단계 역할 기반 권한(RBAC)을 설계해 역할별로 메뉴와 기능을 나눴습니다."],
    stack: ["Vue 3", "Pinia", "Spring Boot", "MariaDB"],
  },
  {
    slug: "field-ops",
    kind: "work",
    title: "현장 배포 · 장애 대응",
    org: "(주)유플러스시스템",
    summary: "입시 시즌 고객사 현장 배포와 복구 절차화",
    did: [
      "입시 시즌마다 고객사에 나가 WAR 파일을 내부망 서버에 배포했고, 네트워크 구성·점검과 데이터 백업·복구를 함께 맡았습니다.",
      "개발 DB의 Oracle 스키마가 유실됐을 때 Docker로 DB를 다시 구축했습니다. 덤프 복원 배치 스크립트도 만들어 복구 절차를 남겼습니다.",
    ],
    stack: ["WAR 배포", "Docker", "Oracle", "네트워크"],
  },
  {
    slug: "meeting-room",
    kind: "work",
    icon: "/icons/meeting-room.jpg",
    title: "회의실 예약 시스템",
    org: "사내 운영 시스템",
    summary: "사내 회의실 예약·관리·키오스크를 하나로 묶은 풀스택 시스템",
    description: `사내에서 실제로 운영 중인 회의실 예약 시스템입니다.
직원들이 매일 사용하는 만큼 안정성과 편의성에 집중해 개발했습니다.

사용자는 일·주·월 캘린더 뷰로 전체 예약 현황을 확인하고 바로 예약할 수 있으며, 관리자는 별도 콘솔에서 회의실·회원·예약을 통합 관리합니다. 로비에 설치된 키오스크 모드도 함께 제공합니다.`,
    stack: ["Java 21", "Spring Boot", "Spring Security", "JWT", "JPA", "MariaDB", "Vue.js", "Firebase FCM"],
    githubUrl: "https://github.com/kangjungmook/meeting-room",
    period: "2025.03 ~ 2026.06",
    role: "풀스택 개발 (단독)",
    did: [
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
    slug: "sajuit",
    kind: "side",
    title: "사주잇 (SAJUIT)",
    period: "팀 프로젝트 (4명)",
    summary: "생년월일만 넣으면 AI가 사주를 풀어 주는 모바일 웹 서비스",
    role: "백엔드 개발 · 프론트 개발",
    team: "개발 강정묵·이용하 / 디자인 박준호·어수훈 / 마케팅 박준호",
    liveUrl: "https://sajuit.me",
    did: [],
    features: [
      { group: "무료 운세", items: "무료 명식·오행, 오늘의 운세, 행운 오미쿠지, 이름 궁합" },
      { group: "연애", items: "연애 궁합, 설아의 솔탈사주(크리스마스 솔로 탈출)" },
      { group: "재물", items: "내 사주 상장(이름이 종목이 되는 카드), 로또·연금복권 번호" },
      { group: "진로 · 이름", items: "직업·이직 사주, 시험운, 작명·개명" },
      { group: "캐릭터 상담", items: "신통할매 채팅 상담, 서윤의 인플루언서 사주" },
      { group: "공통", items: "토스 결제와 쿠폰, 로그인(이메일·네이버), 마이페이지, 결과 공유, 친구 초대, 후기와 공지" },
      { group: "관리자", items: "매출과 방문 통계, 주문과 회원 관리, 홈 배너와 가격 설정, 쿠폰과 공지 관리" },
    ],
    stack: ["React", "TypeScript", "Node.js", "Supabase", "Google Gemini", "토스페이먼츠", "Vercel"],
  },
  {
    slug: "dadeum",
    kind: "side",
    title: "다듬: AI 논술 첨삭 앱",
    period: "캡스톤디자인",
    summary: "학생이 논술문을 쓰면 AI가 논리성·표현력·주제 적합성을 평가하고 문장마다 첨삭해 주는 앱입니다. 회사에서 다루는 논술 채점 분야를 학생 쪽 서비스로 넓힌 프로젝트입니다.",
    did: [],
    stack: ["React Native (Expo)", "Spring Boot", "MariaDB", "Claude API"],
  },
  {
    slug: "steplock",
    kind: "wip",
    title: "스텝락",
    summary: "걸음 수·수면·뽀모도로를 달성해야 쇼츠·릴스 화면이 열리는 안드로이드 습관 앱",
    did: [],
    stack: ["Kotlin", "Jetpack Compose"],
  },
  {
    slug: "stock-dashboard",
    kind: "wip",
    title: "주식 대시보드",
    summary: "보유·관심 종목의 공시·뉴스·차트를 한곳에 모으는 개인화 대시보드",
    did: [],
    stack: ["Vue 3", "DART API", "FRED API"],
  },
];

/** 이미지·기능 목록처럼 따로 보여줄 내용이 있는 프로젝트만 상세 페이지를 만듭니다 */
export const hasDetail = (p: Project) => !!(p.images?.length || p.features?.length);

export const DETAIL_PROJECTS = PROJECTS.filter(hasDetail);

export function getProject(slug: string) {
  return DETAIL_PROJECTS.find(p => p.slug === slug) ?? null;
}
