import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import ScrollReveal from "./ScrollReveal";
import "./globals.css";

export const metadata: Metadata = {
  title: "강정묵 | 백엔드 개발자",
  description:
    "기본기에 충실하며 실무에서 부딪히며 배우는 것을 즐기는 백엔드 개발자 강정묵의 포트폴리오",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "강정묵 | 백엔드 개발자",
    description: "Java · Spring Boot · 안정적인 API 설계를 추구하는 백엔드 개발자입니다.",
    url: "https://kangjungmook.vercel.app",
    siteName: "강정묵 포트폴리오",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "강정묵 | 백엔드 개발자",
    description: "Java · Spring Boot · 안정적인 API 설계를 추구하는 백엔드 개발자입니다.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <ScrollReveal />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
