"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

interface Props {
  images: ProjectImage[];
  slug: string;
  title: string;
}

export default function ImageGallery({ images, slug, title }: Props) {
  // 비어 있는 탭(모바일 등)은 노출하지 않음
  const groups = images.filter(g => g.files.length > 0);
  const [tab, setTab] = useState(0);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const group = groups[tab];
  const src = (file: string) => `/projects/${slug}/${group.folder}/${file}`;
  const alt = (i: number) => `${title} ${group.label} 화면 ${i + 1}/${group.files.length}`;
  const prev = () => setIndex(i => (i - 1 + group.files.length) % group.files.length);
  const next = () => setIndex(i => (i + 1) % group.files.length);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowLeft") setIndex(i => (i - 1 + group.files.length) % group.files.length);
      if (e.key === "ArrowRight") setIndex(i => (i + 1) % group.files.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, group.files.length]);

  return (
    <div className="gallery">
      {groups.length > 1 && (
        <div className="gallery-tabs" role="tablist" aria-label="화면 종류">
          {groups.map((g, i) => (
            <button
              key={g.label}
              role="tab"
              aria-selected={i === tab}
              className="gallery-tab"
              onClick={() => { setTab(i); setIndex(0); }}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}

      <div className="gallery-stage">
        <button
          type="button"
          className="gallery-open"
          onClick={() => setZoom(true)}
          aria-label="현재 화면을 크게 보기"
        >
          <Image
            key={src(group.files[index])}
            src={src(group.files[index])}
            alt={alt(index)}
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="gallery-img"
            unoptimized
          />
        </button>
      </div>

      <div className="gallery-controls">
        <button type="button" className="btn" onClick={prev}>이전 화면</button>
        <span className="muted" aria-live="polite">{index + 1} / {group.files.length}</span>
        <button type="button" className="btn" onClick={next}>다음 화면</button>
      </div>

      {zoom && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt(index)} onClick={() => setZoom(false)}>
          <button type="button" className="btn lightbox-close" onClick={() => setZoom(false)}>
            크게 보기 닫기
          </button>
          <Image
            src={src(group.files[index])}
            alt={alt(index)}
            width={1600}
            height={1000}
            className="lightbox-img"
            unoptimized
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
