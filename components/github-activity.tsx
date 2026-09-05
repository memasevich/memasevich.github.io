'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

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

type DaemonEventState =
  | 'idle'
  | 'entering'
  | 'glaring'
  | 'pressing'
  | 'restoring'
  | 'exiting';

export function GithubActivity({ locale }: GithubActivityProps) {
  const ru = locale === 'ru';
  const [erasedCells, setErasedCells] = useState<Record<string, { dx: number; dy: number; rot: number }>>({});
  const [isRestoring, setIsRestoring] = useState(false);
  const [daemonState, setDaemonState] = useState<DaemonEventState>('idle');

  const touchTimerRef = useRef<number | null>(null);
  const arrivalTimerRef = useRef<number | null>(null);
  const seqTimersRef = useRef<number[]>([]);

  const erasedCount = Object.keys(erasedCells).length;

  const clearSeqTimers = useCallback(() => {
    seqTimersRef.current.forEach((id) => window.clearTimeout(id));
    seqTimersRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearSeqTimers();
      if (arrivalTimerRef.current) {
        window.clearTimeout(arrivalTimerRef.current);
      }
    };
  }, [clearSeqTimers]);

  // Восстановление сетки контрибьюций
  const executeRestore = useCallback(() => {
    setIsRestoring(true);

    window.setTimeout(() => {
      setErasedCells({});
      setIsRestoring(false);
    }, 900);
  }, []);

  // Сценарий появления и вмешательства демона с красной кнопкой
  const startDaemonSequence = useCallback(() => {
    clearSeqTimers();
    setDaemonState('entering');

    // Фаза 1: Демон заходит справа (650ms)
    const t1 = window.setTimeout(() => {
      // Фаза 2: Подозрительный взгляд, голова увеличивается, спич-бабл и большая красная кнопка (2400ms)
      setDaemonState('glaring');

      const t2 = window.setTimeout(() => {
        // Фаза 3: Демон со стуком нажимает на кнопку (450ms)
        setDaemonState('pressing');
        executeRestore();

        const t3 = window.setTimeout(() => {
          // Фаза 4: Сетка восстановилась, голова уменьшилась, реплика ухода (1200ms)
          setDaemonState('restoring');

          const t4 = window.setTimeout(() => {
            // Фаза 5: Демон уходит в бок в даль (900ms)
            setDaemonState('exiting');

            const t5 = window.setTimeout(() => {
              setDaemonState('idle');
            }, 900);

            seqTimersRef.current.push(t5);
          }, 1200);

          seqTimersRef.current.push(t4);
        }, 450);

        seqTimersRef.current.push(t3);
      }, 2400);

      seqTimersRef.current.push(t2);
    }, 650);

    seqTimersRef.current.push(t1);
  }, [clearSeqTimers, executeRestore]);

  // Ручное нажатие на красную кнопку пользователем (если успел кликнуть)
  const handleManualPress = useCallback(() => {
    if (daemonState !== 'glaring') return;
    clearSeqTimers();
    setDaemonState('pressing');
    executeRestore();

    const t1 = window.setTimeout(() => {
      setDaemonState('restoring');
      const t2 = window.setTimeout(() => {
        setDaemonState('exiting');
        const t3 = window.setTimeout(() => {
          setDaemonState('idle');
        }, 900);
        seqTimersRef.current.push(t3);
      }, 1200);
      seqTimersRef.current.push(t2);
    }, 450);

    seqTimersRef.current.push(t1);
  }, [daemonState, clearSeqTimers, executeRestore]);

  // Стирание ячейки при наведении
  const eraseCell = useCallback((key: string) => {
    setErasedCells((prev) => {
      if (prev[key] || isRestoring) return prev;
      const [w, d] = key.split('-').map(Number);
      const dx = ((w * 13 + d * 7) % 11) - 5;
      const dy = 10 + ((w * 7 + d * 3) % 10);
      const rot = ((w * 17 + d * 11) % 40) - 20;
      return { ...prev, [key]: { dx, dy, rot } };
    });

    // Запуск таймера прихода демона через 2.2 секунды после стирания ячеек
    if (!arrivalTimerRef.current && daemonState === 'idle') {
      arrivalTimerRef.current = window.setTimeout(() => {
        arrivalTimerRef.current = null;
        startDaemonSequence();
      }, 2200);
    }
  }, [isRestoring, daemonState, startDaemonSequence]);

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

      {/* Интерактивная сцена: Терминальный Демон с большой красной кнопкой */}
      {daemonState !== 'idle' && (
        <div
          className={`gh-daemon-overlay state-${daemonState}`}
          aria-live="polite"
        >
          {/* Спич-бабл демона */}
          {(daemonState === 'glaring' || daemonState === 'pressing' || daemonState === 'restoring') && (
            <div className={`gh-speech-bubble daemon-bubble-${daemonState}`}>
              <div className="gh-bubble-header">
                <span className="gh-bubble-user">
                  <span className="gh-bubble-dot" />
                  daemon:gc_worker // SYS_ADMIN
                </span>
                <span className="gh-bubble-badge">
                  {daemonState === 'restoring' ? 'GIT_RESTORE' : 'ERR_USER_CHAOS'}
                </span>
              </div>
              <p className="gh-bubble-text">
                {daemonState === 'restoring'
                  ? ru
                    ? '✨ Откатил всё в master. Не трогайте прод руками! 🚶💨'
                    : "✨ Rolled back to master. Don't touch prod! 🚶💨"
                  : ru
                  ? 'Всё вы только ломать-то можете... А чинить кто будет?! 😤'
                  : "All you ever do is break things... Who's gonna fix it?! 😤"}
              </p>
            </div>
          )}

          {/* Большая красная аварийная кнопка */}
          {(daemonState === 'glaring' || daemonState === 'pressing' || daemonState === 'restoring') && (
            <div
              className={`gh-red-button-station ${
                daemonState === 'pressing' || daemonState === 'restoring' ? 'is-pressed' : ''
              }`}
            >
              <div className="gh-hazard-pedestal">
                <div className="gh-hazard-stripes" />
                <span className="gh-pedestal-text">EMERGENCY GC</span>
              </div>
              <button
                type="button"
                className="gh-big-red-btn"
                onClick={handleManualPress}
                title={ru ? 'Экстренная кнопка восстановления' : 'Emergency restore button'}
                aria-label={ru ? 'Нажать кнопку восстановления' : 'Press restore button'}
              >
                <div className="gh-red-dome" />
              </button>
              {(daemonState === 'pressing' || daemonState === 'restoring') && (
                <div className="gh-button-shockwave" />
              )}
            </div>
          )}

          {/* Векторный Терминальный Демон с раздувающейся головой */}
          <div className="gh-daemon-sprite">
            <svg
              viewBox="0 0 100 110"
              className="daemon-svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="50" cy="103" rx="28" ry="6" className="daemon-shadow" />

              {/* Частицы пыли при ходьбе */}
              {(daemonState === 'entering' || daemonState === 'exiting') && (
                <g className="daemon-particles">
                  <circle cx="16" cy="98" r="3.5" className="daemon-particle p-1" />
                  <circle cx="9" cy="93" r="2.5" className="daemon-particle p-2" />
                  <circle cx="4" cy="100" r="2" className="daemon-particle p-3" />
                </g>
              )}

              {/* Хвостик демона */}
              <path
                d="M32 75 C20 78, 12 70, 10 58 C9 50, 14 44, 8 40"
                className="daemon-tail"
                stroke="var(--terminal)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <polygon
                points="5,42 11,35 15,44"
                className="daemon-tail-tip"
                fill="var(--terminal)"
              />

              {/* Левая нога */}
              <g className={`daemon-leg daemon-leg-left ${daemonState === 'entering' || daemonState === 'exiting' ? 'is-walking' : ''}`}>
                <rect x="36" y="80" width="8" height="18" rx="4" className="daemon-limb" />
                <rect x="32" y="94" width="14" height="7" rx="3.5" className="daemon-boot" />
              </g>

              {/* Правая нога */}
              <g className={`daemon-leg daemon-leg-right ${daemonState === 'entering' || daemonState === 'exiting' ? 'is-walking' : ''}`}>
                <rect x="56" y="80" width="8" height="18" rx="4" className="daemon-limb" />
                <rect x="54" y="94" width="14" height="7" rx="3.5" className="daemon-boot" />
              </g>

              {/* Тело */}
              <rect
                x="28"
                y="45"
                width="44"
                height="42"
                rx="14"
                className="daemon-body-shell"
              />

              {/* Индикатор шелла '>_gc' */}
              <rect x="36" y="55" width="28" height="16" rx="4" className="daemon-chest-screen" />
              <text
                x="41"
                y="66"
                className="daemon-chest-text"
                fill="var(--terminal)"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
              >
                &gt;_gc
              </text>

              {/* Анимированная голова с раздуванием (голова увеличивается) */}
              <g className={`daemon-head-group ${daemonState === 'glaring' || daemonState === 'pressing' ? 'is-swelling' : ''}`}>
                <rect
                  x="25"
                  y="18"
                  width="50"
                  height="34"
                  rx="12"
                  className="daemon-head-shell"
                />

                <path
                  d="M32 20 L24 6 Q29 5 36 17 Z"
                  className="daemon-horn"
                  fill="var(--terminal)"
                />
                <path
                  d="M68 20 L76 6 Q71 5 64 17 Z"
                  className="daemon-horn"
                  fill="var(--terminal)"
                />

                <rect x="31" y="27" width="38" height="15" rx="6" className="daemon-visor" />

                {/* Подозрительный суровый взгляд с нахмуренными бровями */}
                {daemonState === 'glaring' || daemonState === 'pressing' ? (
                  <g className="daemon-eyes-suspicious">
                    {/* Нахмуренные брови */}
                    <path d="M34 29 L48 33" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M66 29 L52 33" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Суженные подозрительные зрачки */}
                    <ellipse cx="43" cy="35" rx="3.2" ry="1.8" fill="#ef4444" />
                    <ellipse cx="57" cy="35" rx="3.2" ry="1.8" fill="#ef4444" />
                    <circle cx="43" cy="35" r="0.9" fill="#ffffff" />
                    <circle cx="57" cy="35" r="0.9" fill="#ffffff" />
                  </g>
                ) : (
                  <g className="daemon-eyes-normal">
                    <circle cx="42" cy="34" r="3.5" fill="var(--terminal)" />
                    <circle cx="58" cy="34" r="3.5" fill="var(--terminal)" />
                    <circle cx="44" cy="33" r="1.2" fill="#ffffff" />
                    <circle cx="60" cy="33" r="1.2" fill="#ffffff" />
                  </g>
                )}
              </g>

              {/* Руки */}
              <g className="daemon-arms">
                {daemonState === 'pressing' ? (
                  /* Рука давит сверху на большую красную кнопку */
                  <path
                    d="M32 55 Q16 68 6 88"
                    stroke="var(--terminal)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                ) : daemonState === 'glaring' ? (
                  /* Рука занесена над кнопкой */
                  <path
                    d="M32 55 Q18 42 12 30"
                    stroke="var(--terminal)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                ) : (
                  <rect
                    x="22"
                    y="50"
                    width="8"
                    height="20"
                    rx="4"
                    className="daemon-limb"
                  />
                )}
              </g>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}