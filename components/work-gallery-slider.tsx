"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export type GallerySlide = {
  src: string;
  alt: string;
  label: string;
  desc?: string;
};

const emptySubscribe = () => () => {};

export function WorkGallerySlider({
  items,
  locale = 'ru',
}: {
  items: GallerySlide[];
  locale?: 'ru' | 'en';
}) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const ru = locale === 'ru';
  const total = items.length;
  const activeSlide = items[current];

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, goPrev, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 45) {
      goPrev();
    } else if (diff < -45) {
      goNext();
    }
    setTouchStart(null);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="slider-container" aria-label={ru ? 'Интерактивная галерея скриншотов проекта' : 'Interactive project screenshot gallery'}>
      <div className="slider-showcase">
        {/* Phone Frame Viewport with Animated Track */}
        <div
          className="slider-phone-wrap"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="slider-phone-bezel">
            <div className="slider-phone-speaker" aria-hidden="true" />
            <button
              type="button"
              className="slider-phone-screen"
              onClick={() => setLightboxOpen(true)}
              title={ru ? 'Нажмите для полноэкранного просмотра' : 'Click to view fullscreen'}
              aria-label={ru ? 'Открыть скриншот во весь экран' : 'Open fullscreen screenshot'}
            >
              {/* Smooth Animated Horizontal Track */}
              <div
                className="slider-track"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                  transition: "transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {items.map((item, idx) => (
                  <div className="slider-slide" key={item.src}>
                    {/* oxlint-disable-next-line next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      width="472"
                      height="1024"
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="slider-img"
                    />
                  </div>
                ))}
              </div>

              {/* Cyber Scanline Overlay */}
              <div className="slider-scanline" aria-hidden="true" />

              {/* Zoom Action Badge */}
              <div className="slider-zoom-hint">
                <Maximize2 size={13} aria-hidden="true" />
                <span>{ru ? 'Во весь экран' : 'Zoom'}</span>
              </div>
            </button>
          </div>

          {/* Quick Nav Arrows on Phone Frame */}
          <button
            type="button"
            className="slider-nav-arrow slider-arrow-prev"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label={ru ? 'Предыдущий скриншот' : 'Previous screenshot'}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="slider-nav-arrow slider-arrow-next"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label={ru ? 'Следующий скриншот' : 'Next screenshot'}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>

        {/* Sidebar Info & Controls with Smooth Transitions */}
        <div className="slider-info-panel">
          <div className="slider-info-head">
            <div className="slider-counter-wrap">
              <span className="slider-counter">
                SLIDE 0{current + 1} / 0{total}
              </span>
              {/* Animated Progress Bar */}
              <div className="slider-progress-bar" aria-hidden="true">
                <div
                  className="slider-progress-fill"
                  style={{
                    width: `${((current + 1) / total) * 100}%`,
                    transition: "width 0.42s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>
            </div>
            <span className="slider-badge">
              {ru ? 'ИНТЕРФЕЙС ПРИЛОЖЕНИЯ' : 'APP INTERFACE'}
            </span>
          </div>

          {/* Animated Text Content on Slide Change */}
          <div key={current} className="slider-content-anim">
            <h4 className="slider-slide-title">{activeSlide.label}</h4>
            {activeSlide.desc && (
              <p className="slider-slide-desc">{activeSlide.desc}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="slider-actions-row">
            <div className="slider-btn-group">
              <button
                type="button"
                className="slider-ctrl-btn"
                onClick={goPrev}
                aria-label={ru ? 'Предыдущий экран' : 'Previous screen'}
              >
                <ChevronLeft size={16} aria-hidden="true" />
                <span>{ru ? 'Назад' : 'Prev'}</span>
              </button>
              <button
                type="button"
                className="slider-ctrl-btn"
                onClick={goNext}
                aria-label={ru ? 'Следующий экран' : 'Next screen'}
              >
                <span>{ru ? 'Вперёд' : 'Next'}</span>
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              className="slider-expand-btn"
              onClick={() => setLightboxOpen(true)}
              aria-label={ru ? 'Открыть скриншот во весь экран' : 'Open fullscreen screenshot'}
            >
              <Maximize2 size={13} aria-hidden="true" />
              <span>{ru ? 'Во весь экран' : 'Fullscreen'}</span>
            </button>
          </div>

          {/* Thumbnail Strip / Interactive Switcher */}
          <div className="slider-thumbnails" role="tablist" aria-label={ru ? 'Список экранов' : 'Screens list'}>
            {items.map((item, idx) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={idx === current}
                className={`slider-thumb-btn ${idx === current ? 'slider-thumb-active' : ''}`}
                onClick={() => setCurrent(idx)}
              >
                <div className="slider-thumb-preview">
                  {/* oxlint-disable-next-line next/no-img-element */}
                  <img src={item.src} alt="" width="60" height="130" loading="lazy" />
                </div>
                <div className="slider-thumb-meta">
                  <span className="slider-thumb-idx">0{idx + 1}</span>
                  <span className="slider-thumb-label">{item.label.replace(/^SCREEN_\d+\s*\/\/\s*/, '')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Centered Lightbox Modal */}
      {mounted && lightboxOpen &&
        createPortal(
          <div
            className="slider-lightbox-backdrop"
            role="presentation"
            onKeyDown={(e) => {
              if (e.key === "Escape") setLightboxOpen(false);
            }}
          >
            {/* Scrim click-away button */}
            <button
              type="button"
              className="slider-lightbox-scrim"
              onClick={() => setLightboxOpen(false)}
              aria-label={ru ? 'Закрыть полноэкранный режим' : 'Close fullscreen mode'}
            />

            {/* Backdrop Navigation Arrows */}
            <button
              type="button"
              className="slider-lb-nav slider-lb-prev"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label={ru ? 'Предыдущий скриншот' : 'Previous screenshot'}
            >
              <ChevronLeft size={26} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="slider-lb-nav slider-lb-next"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label={ru ? 'Следующий скриншот' : 'Next screenshot'}
            >
              <ChevronRight size={26} aria-hidden="true" />
            </button>

            {/* Strictly Centered Lightbox Dialog */}
            <div
              className="slider-lightbox-dialog"
              aria-label={activeSlide.alt}
            >
              <header className="slider-lightbox-head">
                <div className="slider-lightbox-title">
                  <span>MOD_01 // SCREEN_0{current + 1} / 0{total}</span>
                  <b>{activeSlide.label}</b>
                </div>
                <button
                  type="button"
                  className="slider-lightbox-close"
                  onClick={() => setLightboxOpen(false)}
                  aria-label={ru ? 'Закрыть' : 'Close'}
                >
                  <X size={16} aria-hidden="true" />
                  <span>[ESC]</span>
                </button>
              </header>

              <div className="slider-lightbox-body">
                <div className="slider-lightbox-img-wrap">
                  {/* oxlint-disable-next-line next/no-img-element */}
                  <img
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    className="slider-lightbox-img"
                  />
                </div>
              </div>

              {activeSlide.desc && (
                <footer className="slider-lightbox-foot">
                  <p>{activeSlide.desc}</p>
                </footer>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
