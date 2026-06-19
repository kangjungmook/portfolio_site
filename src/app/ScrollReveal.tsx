"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const timer = setTimeout(() => {
      const cards = Array.from(document.querySelectorAll<HTMLElement>(".card"));

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            const card = entry.target as HTMLElement;
            const rect = card.getBoundingClientRect();
            const delay = rect.top < window.innerHeight ? i * 75 : 0;
            setTimeout(() => card.classList.add("in-view"), delay);
            observer?.unobserve(card);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
      );

      cards.forEach((card) => observer!.observe(card));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
