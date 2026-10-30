"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="toggle"
      onClick={toggle}
      aria-label={theme === "dark" ? "밝은 화면으로 바꾸기" : "어두운 화면으로 바꾸기"}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
