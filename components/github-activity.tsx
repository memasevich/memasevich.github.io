'use client';

import React, { useState, useCallback, useRef } from 'react';
import { ExternalLink, RotateCcw, Sparkles } from 'lucide-react';

interface GithubActivityProps {
  locale: 'ru' | 'en';
}

export function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.8-1.7-2.6-.3-5.4-1.3-5.4-5.6 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3 0 0 1-.3 3.1 1.2a10.6 10.6 0 0 1 5.6 0C17.7 5 18.8 5.3 18.8 5.3c.6 1.5.2 2.7.1 3 .8.8 1.2 1.8 1.2 3 0 4.3-2.8 5.3-5.4 5.6.4.4.8 1.1.8 2.2v3.1c0 .3.2.7.8.6A11.3 11.3 0 0 0 12 .7Z"
      />
    </svg>
  );
}

function getContributionLevel(week: number, day: number): number {
  if (week < 10) return (week * 7 + day) % 5 === 0 ? 2 : (week + day) % 3 === 0 ? 1 : 0;
  if (week >= 10 && week < 18) return (week * 3 + day) % 4 === 0 ? 2 : (week + day) % 2 === 0 ? 1 : 0;
  if (week >= 18 && week < 24) return (week + day) % 6 === 0 ? 0 : (week * 2 + day) % 3 === 0 ? 3 : 2;
  if (week >= 24 && week < 38) return (week * 5 + day) % 7 === 0 ? 4 : (week + day) % 2 === 0 ? 3 : 2;
  if (week >= 38 && week < 48) return (week + day) % 5 === 0 ? 4 : (week * 3 + day) % 2 === 0 ? 3 : 2;
  return (week * 7 + day) % 3 === 0 ? 4 : 2;
}

const QUOTES_RU = [
  'Война... Война никогда не меняется. А вот коммиты кто-то потёр! ☢️',
  'Внимание: уровень радиации в кодовой базе зашкаливает! [RADS +45] ⚠️',
  'Осторожно, путник! Без контрибьюций в Столичной Пустоши не выжить. ⚡',
  'Pip-Boy 3000 зафиксировал потерю данных в секторе Vault 101! 💾',
];

const QUOTES_EN = [
  'War... War never changes. But someone wiped the commits! ☢️',
  'Warning: radiation levels in the codebase are critical! [RADS +45] ⚠️',
  "Careful, wanderer! You won't survive the Capital Wasteland without contributions. ⚡",
  'Pip-Boy 3000 detected data corruption in Vault 101 sector! 💾',
];

export function GithubActivity({ locale }: GithubActivityProps) {
  const ru = locale === 'ru';
  const [erasedCells, setErasedCells] = useState<Record<string, { dx: number; dy: number; rot: number }>>({});
  const [isRestoring, setIsRestoring] = useState(false);
  const [mascotWiggle, setMascotWiggle] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [restoreNotice, setRestoreNotice] = useState<string | null>(null);
  const touchTimerRef = useRef<number | null>(null);

  const erasedCount = Object.keys(erasedCells).length;
  const isMascotVisible = erasedCount >= 8 && !restoreNotice;

  const eraseCell = useCallback((key: string) => {
    setErasedCells((prev) => {
      if (prev[key] || isRestoring) return prev;
      // Deterministic slight jitter based on cell key
      const [w, d] = key.split('-').map(Number);
      const dx = ((w * 13 + d * 7) % 11) - 5;
      const dy = 10 + ((w * 7 + d * 3) % 10);
      const rot = ((w * 17 + d * 11) % 40) - 20;
      return { ...prev, [key]: { dx, dy, rot } };
    });
  }, [isRestoring]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (touchTimerRef.current) return;
    touchTimerRef.current = window.setTimeout(() => {
      touchTimerRef.current = null;
    }, 25);

    const touch = e.touches[0];
    if (!touch) return;
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (el instanceof HTMLElement && el.dataset.cellKey) {
      eraseCell(el.dataset.cellKey);
    }
  }, [eraseCell]);

  const handleRestore = useCallback(() => {
    setIsRestoring(true);
    setRestoreNotice(
      ru
        ? '✨ [RADS 0] Pip-Boy откатил изменения! Все контрибьюции в норме.'
        : '✨ [RADS 0] Pip-Boy rolled back changes! All contributions restored.'
    );

    window.setTimeout(() => {
      setErasedCells({});
      setIsRestoring(false);
      window.setTimeout(() => {
        setRestoreNotice(null);
      }, 1400);
    }, 900);
  }, [ru]);

  const handleMascotClick = useCallback(() => {
    setMascotWiggle(true);
    setQuoteIdx((prev) => (prev + 1) % (ru ? QUOTES_RU.length : QUOTES_EN.length));
    window.setTimeout(() => setMascotWiggle(false), 500);
  }, [ru]);

  const activeQuote = (ru ? QUOTES_RU : QUOTES_EN)[quoteIdx];

  return (
    <div className="bento-card bento-github" aria-label="GitHub Activity">
      <div className="gh-header">
        <div className="gh-id">
          <div className="gh-avatar">
            <GithubMark />
          </div>
          <div>
            <div className="gh-title-row">
              <h3>GitHub Activity</h3>
              <a
                href="https://github.com/memasevich"
                target="_blank"
                rel="noopener noreferrer"
                className="gh-user-link"
              >
                @memasevich <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>
            <span className="gh-subhead">
              {erasedCount > 0 ? (
                <span className="gh-subhead-interactive">
                  <span className="erased-metric-strike">1,809</span>{' '}
                  <strong className="erased-metric-current">{Math.max(0, 1809 - erasedCount * 4)}</strong>{' '}
                  {ru ? 'контрибьюций' : 'contributions'}{' '}
                  <span className="erased-pill">(-{erasedCount * 4} {ru ? 'стёрто' : 'wiped'})</span>
                </span>
              ) : (
                ru ? '1,809+ контрибьюций за последний год' : '1,809+ contributions in the last year'
              )}
            </span>
          </div>
        </div>

        <div className="gh-metrics">
          <div className="gh-metric-box">
            <span className="metric-val">{erasedCount > 0 ? Math.max(0, 1809 - erasedCount * 4) : '1,809+'}</span>
            <span className="metric-lbl">{ru ? 'контрибьюций' : 'contributions'}</span>
          </div>
          <div className="gh-metric-box">
            <span className="metric-val">27+</span>
            <span className="metric-lbl">{ru ? 'репозиториев' : 'repos'}</span>
          </div>
          <div className="gh-metric-box">
            <span className="metric-val">100%</span>
            <span className="metric-lbl">{ru ? 'коммиты' : 'commits'}</span>
          </div>
        </div>
      </div>

      <div
        className="gh-heatmap-container"
        onTouchMove={handleTouchMove}
      >
        <div className="gh-months" aria-hidden="true">
          {(ru
            ? ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          ).map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

        <div className="gh-grid-body">
          <div className="gh-days" aria-hidden="true">
            <span>{ru ? 'Пн' : 'Mon'}</span>
            <span>{ru ? 'Ср' : 'Wed'}</span>
            <span>{ru ? 'Пт' : 'Fri'}</span>
          </div>

          <div className="gh-cells-grid">
            {Array.from({ length: 52 }, (_, week) => (
              <div className="gh-col" key={week}>
                {Array.from({ length: 7 }, (_, day) => {
                  const key = `${week}-${day}`;
                  const isErased = Boolean(erasedCells[key]);
                  const lvl = getContributionLevel(week, day);
                  const jitter = erasedCells[key];

                  return (
                    <div
                      key={day}
                      data-cell-key={key}
                      onMouseEnter={() => eraseCell(key)}
                      style={
                        isErased && jitter
                          ? ({
                              '--dx': `${jitter.dx}px`,
                              '--dy': `${jitter.dy}px`,
                              '--rot': `${jitter.rot}deg`,
                            } as React.CSSProperties)
                          : isRestoring
                          ? ({
                              '--col-delay': `${week * 14}ms`,
                            } as React.CSSProperties)
                          : undefined
                      }
                      className={`gh-cell lvl-${lvl}${isErased ? ' is-erased' : ''}${isRestoring ? ' is-restoring' : ''}`}
                      title={`Week ${week + 1}, Day ${day + 1}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="gh-footer">
          <div className="gh-tags">
            <span className="gh-repo-tag">CoQ-ru-translate</span>
            <span className="gh-repo-tag">obsidian-hesh</span>
            <span className="gh-repo-tag">repo-russianlocalization</span>
            <span className="gh-repo-tag">Gnomoria-Russian-Translation</span>
          </div>
          <div className="gh-legend" aria-hidden="true">
            <span>{ru ? 'Меньше' : 'Less'}</span>
            <span className="gh-cell lvl-0" />
            <span className="gh-cell lvl-1" />
            <span className="gh-cell lvl-2" />
            <span className="gh-cell lvl-3" />
            <span className="gh-cell lvl-4" />
            <span>{ru ? 'Больше' : 'More'}</span>
          </div>
        </div>
      </div>

      {/* Vault Boy (Fallout 3) Mascot Overlay */}
      <div
        className={`gh-mascot-wrapper${isMascotVisible || restoreNotice ? ' is-visible' : ''}`}
        aria-live="polite"
      >
        {/* Speech Bubble */}
        <div className="gh-speech-bubble">
          <div className="gh-bubble-header">
            <span className="gh-bubble-user">
              <span className="gh-bubble-dot" />
              VAULT BOY // VAULT 101
            </span>
            <span className="gh-bubble-badge">PIP-BOY 3000</span>
          </div>
          <p className="gh-bubble-text">
            {restoreNotice ? (
              <span className="restore-success-text">
                <Sparkles size={13} aria-hidden="true" />
                {restoreNotice}
              </span>
            ) : (
              activeQuote
            )}
          </p>
          {!restoreNotice && (
            <div className="gh-bubble-actions">
              <button
                type="button"
                className="gh-reset-btn"
                onClick={handleRestore}
                disabled={isRestoring}
              >
                <RotateCcw size={12} className={isRestoring ? 'spin-restore' : ''} aria-hidden="true" />
                <span>{ru ? 'git restore --all' : 'git restore --all'}</span>
              </button>
              <span className="gh-bubble-tip">
                {ru ? 'или нажми на Волт-Боя 👍' : 'or click Vault Boy 👍'}
              </span>
            </div>
          )}
        </div>

        {/* Peeking Mascot Image */}
        <button
          type="button"
          className={`gh-mascot-btn${mascotWiggle ? ' is-wiggling' : ''}`}
          onClick={handleMascotClick}
          title={ru ? 'Волт-Бой (Убежище 101) 👍' : 'Vault Boy (Vault 101) 👍'}
          aria-label={ru ? 'Волт-Бой маскот Fallout 3' : 'Vault Boy Fallout 3 Mascot'}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mascot/vaultboy.png"
            alt="Vault Boy (Fallout 3) Vault 101 Mascot"
            className="gh-mascot-img"
            width={220}
            height={275}
            loading="lazy"
          />
        </button>
      </div>
    </div>
  );
}
