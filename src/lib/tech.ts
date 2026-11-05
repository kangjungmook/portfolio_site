import type { IconType } from "react-icons";
import {
  SiSpring, SiSpringboot, SiSpringsecurity, SiMariadb, SiSupabase, SiDocker, SiNginx,
  SiVercel, SiGooglegemini, SiClaude, SiGitlab, SiGithub, SiSubversion, SiPython, SiOpencv,
  SiVuedotjs, SiReact, SiExpo, SiTypescript, SiNodedotjs, SiKotlin, SiJetpackcompose,
  SiFirebase, SiJsonwebtokens, SiHibernate,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import {
  LuDatabase, LuDatabaseZap, LuWallet, LuPackage, LuNetwork, LuAppWindow, LuFileText, LuTrendingUp,
} from "react-icons/lu";

export interface Tech {
  Icon: IconType;
  /** 브랜드 색. 없으면 본문 색(currentColor)을 씁니다 (검정 계열 로고는 다크 모드에서 사라지므로) */
  color?: string;
}

const TECH: Record<string, Tech> = {
  Java: { Icon: FaJava, color: "#E76F00" },
  "Java 21": { Icon: FaJava, color: "#E76F00" },
  "Spring Boot": { Icon: SiSpringboot, color: "#6DB33F" },
  "Spring MVC": { Icon: SiSpring, color: "#6DB33F" },
  "Spring Security": { Icon: SiSpringsecurity, color: "#6DB33F" },
  MyBatis: { Icon: LuDatabaseZap },
  JPA: { Icon: SiHibernate },
  JWT: { Icon: SiJsonwebtokens },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  React: { Icon: SiReact, color: "#149ECA" },
  "Vue 3": { Icon: SiVuedotjs, color: "#4FC08D" },
  "Vue 3 (Pinia)": { Icon: SiVuedotjs, color: "#4FC08D" },
  "Vue.js": { Icon: SiVuedotjs, color: "#4FC08D" },
  "React Native (Expo)": { Icon: SiExpo },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  Kotlin: { Icon: SiKotlin, color: "#7F52FF" },
  "Jetpack Compose": { Icon: SiJetpackcompose, color: "#4285F4" },
  Oracle: { Icon: LuDatabase },
  MariaDB: { Icon: SiMariadb },
  Supabase: { Icon: SiSupabase, color: "#3FCF8E" },
  "Firebase FCM": { Icon: SiFirebase, color: "#F5A100" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  nginx: { Icon: SiNginx, color: "#009639" },
  Vercel: { Icon: SiVercel },
  "WAR 배포": { Icon: LuPackage },
  "네트워크 구성": { Icon: LuNetwork },
  네트워크: { Icon: LuNetwork },
  "Google Gemini": { Icon: SiGooglegemini, color: "#8E75B2" },
  "Claude API": { Icon: SiClaude, color: "#D97757" },
  "Claude Code": { Icon: SiClaude, color: "#D97757" },
  토스페이먼츠: { Icon: LuWallet },
  GitLab: { Icon: SiGitlab, color: "#FC6D26" },
  GitHub: { Icon: SiGithub },
  SVN: { Icon: SiSubversion, color: "#809CC9" },
  Python: { Icon: SiPython, color: "#3776AB" },
  OpenCV: { Icon: SiOpencv, color: "#5C3EE8" },
  Tkinter: { Icon: LuAppWindow },
  PyInstaller: { Icon: LuPackage },
  "DART API": { Icon: LuFileText },
  "FRED API": { Icon: LuTrendingUp },
};

export function getTech(name: string): Tech | undefined {
  return TECH[name];
}
