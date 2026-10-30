import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "강정묵 | 백엔드 개발자",
  description:
    "기능을 만드는 것에서 끝내지 않고, 현장에서 돌아가는 것까지 책임지는 백엔드 개발자 강정묵의 포트폴리오",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "강정묵 | 백엔드 개발자",
    description: "Java · Spring Boot · MyBatis · Oracle 백엔드 개발자입니다.",
    url: "https://kangjungmook.vercel.app",
    siteName: "강정묵 포트폴리오",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "강정묵 | 백엔드 개발자",
    description: "Java · Spring Boot · MyBatis · Oracle 백엔드 개발자입니다.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
