# 강정묵 포트폴리오

백엔드 개발자 강정묵의 포트폴리오 사이트입니다.

**https://kangjungmook.vercel.app**

## 구성

| 영역 | 내용 |
| --- | --- |
| 소개 | 한 줄 소개, 주력 기술, 경력 연차·자격증 등 핵심 숫자 |
| 기술 | 분류별 기술 스택 (아이콘 타일) |
| 회사 프로젝트 / 개인·팀 프로젝트 | 문제 → 한 일 → 스택 순서로 정리 |
| 경력 · 학력 · 자격 | 타임라인 |
| 프로젝트 상세 (`/projects/[slug]`) | 화면 갤러리·기능 목록이 있는 프로젝트만 별도 페이지 제공 |

- 기본은 라이트 화면이고, 우측 상단 버튼으로 다크 화면으로 바꿀 수 있습니다. 선택은 브라우저에 저장됩니다.
- 스크롤하면 항목이 순서대로 나타납니다. 기기에서 모션 줄이기를 켜 두었다면 효과를 쓰지 않습니다.
- GitHub 토큰이 설정되어 있으면 최근 활동 그래프를 보여줍니다.

## 기술 스택

- Next.js 16 (App Router) · React 19 · TypeScript
- 스타일: 순수 CSS (OKLCH 색상 토큰, 4/8px 간격 체계)
- 아이콘: react-icons
- 분석·배포: Vercel Analytics, Vercel

## 실행 방법

Node.js 20.9 이상이 필요합니다.

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build
npm start        # 프로덕션 빌드 실행
```

## 환경 변수

| 이름 | 필수 | 설명 |
| --- | --- | --- |
| `GITHUB_TOKEN` | 선택 | GitHub 활동 그래프 표시용. `read:user` 권한만 있으면 됩니다. |

`.env.local.example`을 `.env.local`로 복사해 값을 채웁니다. 토큰이 없으면 활동 그래프만 빠지고 나머지는 그대로 표시됩니다. 토큰은 저장소에 올리지 않습니다 (`.env*.local`은 `.gitignore`에 포함).

## 폴더 구조

```
src/
├── app/
│   ├── page.tsx              # 홈
│   ├── layout.tsx            # 폰트, 테마 초기화, 분석
│   ├── globals.css           # 디자인 토큰과 전체 스타일
│   └── projects/             # 프로젝트 목록·상세
├── components/               # Section, ProjectItem, TechIcon, ScrollReveal 등
└── lib/
    ├── profile.ts            # 소개, 기술, 경력·학력
    ├── projects.ts           # 프로젝트 데이터
    ├── tech.ts               # 기술 이름 → 아이콘 연결
    └── github.ts             # GitHub 활동 데이터 조회
public/projects/<slug>/       # 프로젝트 스크린샷
```

## 내용 수정하기

코드를 건드리지 않고 데이터 파일만 고치면 됩니다.

- 소개·기술·경력·학력: `src/lib/profile.ts`
- 프로젝트 추가·수정: `src/lib/projects.ts` (스크린샷은 `public/projects/<slug>/<분류>/`에 넣고 파일명을 `images`에 적습니다)
- 새 기술 아이콘: `src/lib/tech.ts`에 이름과 아이콘을 추가합니다. 등록되지 않은 기술은 아이콘 없이 이름만 표시됩니다.

## 배포

Vercel에 연결되어 있습니다. `main`에 머지하면 프로덕션에 반영되고, Pull Request마다 미리보기 배포가 만들어집니다.
