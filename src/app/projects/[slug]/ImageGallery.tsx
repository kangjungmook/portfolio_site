"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

interface Props {
  images: ProjectImage[];
  slug: string;
}

export default function ImageGallery({ images, slug }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox]   = useState(false);

  const group  = images[activeTab];
  const imgSrc = (file: string) => `/projects/${slug}/${group.folder}/${file}`;
  const prev   = () => setActiveImg(i => (i - 1 + group.files.length) % group.files.length);
  const next   = () => setActiveImg(i => (i + 1) % group.files.length);

  const handleTab = (i: number) => {
    setActiveTab(i);
    setActiveImg(0);
  };

  return (
    <div className="gallery">

      {/* 탭 */}
      {images.length > 1 && (
        <div className="gallery-tabs">
          {images.map((g, i) => (
            <button
              key={g.label}
              className={`gallery-tab ${i === activeTab ? "gallery-tab-active" : ""}`}
              onClick={() => handleTab(i)}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}

      {/* 이미지 없을 때 */}
      {group.files.length === 0 ? (
        <div className="gallery-empty">
          <span>📷</span>
          <p>스크린샷 준비 중입니다</p>
        </div>
      ) : (
        <>
          {/* 메인 이미지 */}
          <div className="gallery-main">
            <div className="gallery-main-img-wrap">
              <Image
                key={imgSrc(group.files[activeImg])}
                src={imgSrc(group.files[activeImg])}
                alt=""
                fill
                className="gallery-main-img"
                unoptimized
              />
            </div>
            <button className="gallery-nav gallery-nav-prev" onClick={prev} aria-label="이전">‹</button>
            <button className="gallery-nav gallery-nav-next" onClick={next} aria-label="다음">›</button>
            <div className="gallery-count">{activeImg + 1} / {group.files.length}</div>
            <button className="gallery-zoom-btn" onClick={() => setLightbox(true)} aria-label="크게 보기">
              🔍
            </button>
          </div>

          {/* 썸네일 */}
          <div className="gallery-thumbs">
            {group.files.map((file, i) => (
              <button
                key={file}
                className={`gallery-thumb ${i === activeImg ? "gallery-thumb-active" : ""}`}
                onClick={() => setActiveImg(i)}
                aria-label={`이미지 ${i + 1}`}
              >
                <Image
                  src={imgSrc(file)}
                  alt=""
                  width={120}
                  height={75}
                  className="gallery-thumb-img"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </>
      )}

      {/* 라이트박스 */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <button className="lightbox-close" onClick={() => setLightbox(false)} aria-label="닫기">✕</button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="이전">‹</button>
          <Image
            src={imgSrc(group.files[activeImg])}
            alt=""
            width={1600}
            height={1000}
            className="lightbox-img"
            unoptimized
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="다음">›</button>
        </div>
      )}

    </div>
  );
}
