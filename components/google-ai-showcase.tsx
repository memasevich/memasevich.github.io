'use client';

import React, { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Sparkles, ZoomIn, X, CheckCircle2 } from 'lucide-react';

const emptySubscribe = () => () => {};

export interface ShowcasePoint {
  title: string;
  desc: string;
}

export interface ShowcaseLink {
  label: string;
  href: string;
  badge?: string;
}

export interface ShowcaseData {
  eyebrow: string;
  badge: string;
  title: string;
  quote: string;
  image: string;
  imageAlt: string;
  desc: string;
  points: ShowcasePoint[];
  links: ShowcaseLink[];
}

interface GoogleAiShowcaseProps {
  data: ShowcaseData;
  locale: 'ru' | 'en';
}

export function GoogleAiShowcase({ data, locale }: GoogleAiShowcaseProps) {
  const ru = locale === 'ru';
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const openLightbox = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, closeLightbox]);

  return (
    <div className="google-showcase-card">
      <div className="google-showcase-grid">
        {/* Visual Media Column */}
        <div className="google-showcase-media-col">
          <button
            type="button"
            className="google-showcase-media-wrap"
            onClick={openLightbox}
            title={ru ? 'Нажмите, чтобы увеличить изображение' : 'Click to enlarge image'}
            aria-label={ru ? 'Увеличить Google AI Overview' : 'Enlarge Google AI Overview'}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={data.imageAlt}
              className="google-showcase-img"
              width={1000}
              height={860}
              loading="lazy"
              decoding="async"
            />
            <div className="google-showcase-overlay" aria-hidden="true">
              <span className="google-showcase-zoom-pill">
                <ZoomIn size={14} />
                <span>{ru ? 'УВЕЛИЧИТЬ' : 'EXPAND'}</span>
              </span>
            </div>
            <span className="google-showcase-tag">
              <Sparkles size={11} aria-hidden="true" />
              GOOGLE AI // VERIFIED
            </span>
          </button>
          <p className="google-showcase-caption">
            {ru
              ? 'Автоматический AI Overview от Google Search по запросу «Memasevich»'
              : 'Automated Google Search AI Overview result for "Memasevich" query'}
          </p>
        </div>

        {/* Informational Column */}
        <div className="google-showcase-info-col">
          <div className="google-showcase-head">
            <span className="google-showcase-eyebrow">
              <span className="showcase-dot" />
              {data.eyebrow}
            </span>
            <span className="google-showcase-badge">{data.badge}</span>
          </div>

          <h3 className="google-showcase-title">{data.title}</h3>

          <blockquote className="google-showcase-quote">
            <p>{data.quote}</p>
          </blockquote>

          <p className="google-showcase-desc">{data.desc}</p>

          <div className="google-showcase-points">
            {data.points.map((point, idx) => (
              <div className="showcase-point-item" key={idx}>
                <span className="showcase-point-icon" aria-hidden="true">
                  <CheckCircle2 size={14} />
                </span>
                <div>
                  <strong className="showcase-point-title">{point.title}:</strong>{' '}
                  <span className="showcase-point-desc">{point.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="google-showcase-actions">
            <button
              type="button"
              className="google-showcase-btn-primary"
              onClick={openLightbox}
            >
              <ZoomIn size={14} aria-hidden="true" />
              <span>{ru ? 'Смотреть оригинал (1000x860)' : 'View full size (1000x860)'}</span>
            </button>

            {data.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="google-showcase-btn-secondary"
              >
                <span>{link.label}</span>
                {link.badge && <span className="showcase-btn-badge">{link.badge}</span>}
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal via Portal */}
      {mounted && isOpen &&
        createPortal(
          <div
            className="slider-lightbox-backdrop google-dialog-backdrop"
            role="presentation"
          >
            <button
              type="button"
              className="slider-lightbox-scrim"
              onClick={closeLightbox}
              aria-label={ru ? 'Закрыть просмотр' : 'Close viewer'}
            />

            <div className="google-dialog-inner">
              <header className="google-dialog-header">
                <div className="google-dialog-title">
                  <Sparkles size={14} className="dialog-sparkle" aria-hidden="true" />
                  <span>GOOGLE SEARCH // AI OVERVIEW DOSSIER: MEMASEVICH</span>
                </div>
                <button
                  type="button"
                  className="google-dialog-close"
                  onClick={closeLightbox}
                  title={ru ? 'Закрыть (Esc)' : 'Close (Esc)'}
                  aria-label={ru ? 'Закрыть' : 'Close'}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </header>

              <figure className="google-dialog-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.image}
                  alt={data.imageAlt}
                  className="google-dialog-img"
                  width={1000}
                  height={860}
                />
                <figcaption className="google-dialog-caption">
                  {ru
                    ? 'Публичная карточка Google AI Overview: подтверждение роли ведущего разработчика локализации Caves of Qud, реверс-инжиниринга и присутствия в Steam / Boosty.'
                    : 'Public Google AI Overview dossier: verified independent developer of Caves of Qud localization, reverse engineering, and Steam/Boosty presence.'}
                </figcaption>
              </figure>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

