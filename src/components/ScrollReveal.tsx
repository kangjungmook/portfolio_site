"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** 스크롤해서 보이게 되는 요소들 (같은 부모 안에서는 순서대로 조금씩 늦게 나타남) */
const TARGETS = [
  ".sec-head",
  ".activity",
  ".sub-title",
  ".proj",
  ".exp",
  ".stat",
  ".core-grid li",
  ".stack-group",
  ".about li",
  ".numbered li",
  ".prose-cols p",
  ".contact > *",
  ".gallery",
].join(",");

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("rv-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const seen = new Map<Element, number>();
    document.querySelectorAll(TARGETS).forEach(el => {
      // 이미 화면 안에 있는 요소는 건드리지 않아 깜빡임이 없습니다
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      const parent = el.parentElement!;
      const n = seen.get(parent) ?? 0;
      seen.set(parent, n + 1);
      (el as HTMLElement).style.setProperty("--rv-delay", `${Math.min(n, 5) * 60}ms`);
      el.classList.add("rv");
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
