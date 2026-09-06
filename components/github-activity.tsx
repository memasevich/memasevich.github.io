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
        // Фаза 3: Демон со стуком нажимает на кнопку (700ms)
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
        }, 700);

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
    }, 700);

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
    <div
      className={`bento-card bento-github ${daemonState === 'pressing' ? 'gh-card-rumble' : ''}`}
      aria-label="GitHub Activity"
    >
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
          <div className={`gh-legend ${daemonState !== 'idle' ? 'is-hidden' : ''}`} aria-hidden="true">
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

          {/* Интерактивная векторная сцена: Аварийная кнопка + Демон с реалистичным ударом */}
          <div className="gh-daemon-scene">
            <svg
              viewBox="0 0 155 110"
              className={`daemon-svg-scene state-${daemonState}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Радиальный градиент красного купола */}
                <radialGradient id="gh-dome-grad" cx="35%" cy="25%" r="75%">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="30%" stopColor="#ef4444" />
                  <stop offset="75%" stopColor="#b91c1c" />
                  <stop offset="100%" stopColor="#7f1d1d" />
                </radialGradient>

                {/* Свечение кнопки */}
                <filter id="gh-glow-fx" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Паттерн полос аварийного постамента */}
                <pattern
                  id="gh-hazard-pattern"
                  width="8"
                  height="8"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <rect width="4" height="8" fill="#eab308" />
                  <rect x="4" width="4" height="8" fill="#090c0f" />
                </pattern>
              </defs>

              {/* Тень под демоном */}
              <ellipse cx="88" cy="103" rx="26" ry="6" className="daemon-shadow" />

              {/* Аварийная стойка с большой красной кнопкой */}
              {(daemonState === 'glaring' || daemonState === 'pressing' || daemonState === 'restoring') && (
                <g
                  className={`gh-svg-button-station ${
                    daemonState === 'pressing' || daemonState === 'restoring' ? 'is-pressed' : ''
                  }`}
                >
                  {/* Тень кнопки */}
                  <ellipse cx="28" cy="100" rx="19" ry="4" fill="rgba(0,0,0,0.5)" />

                  {/* Постамент со стробоскопическими полосами */}
                  <rect x="9" y="80" width="38" height="18" rx="3" fill="#090c0f" stroke="#854d0e" strokeWidth="1" />
                  <rect x="10" y="81" width="36" height="7" rx="1.5" fill="url(#gh-hazard-pattern)" />

                  {/* Табличка EMERGENCY GC */}
                  <rect x="11" y="89" width="34" height="8" rx="1.5" fill="#090c0f" stroke="rgba(234, 179, 8, 0.45)" strokeWidth="0.8" />
                  <text
                    x="28"
                    y="95"
                    textAnchor="middle"
                    fill="#fbbf24"
                    fontSize="5"
                    fontWeight="bold"
                    fontFamily="monospace"
                    letterSpacing="0.05em"
                  >
                    EMERGENCY GC
                  </text>

                  {/* Металлическое основание купола */}
                  <rect x="18" y="74.5" width="20" height="6" rx="1.5" fill="#27272a" stroke="#52525b" strokeWidth="0.8" />

                  {/* Красный купол кнопки: прижатый купол vs надутый купол */}
                  {daemonState === 'pressing' || daemonState === 'restoring' ? (
                    /* Сплющенный купол под ударом кулака: верх ровно на y=68 */
                    <path
                      d="M 15 75.5 C 15 68, 41 68, 41 75.5 Z"
                      fill="url(#gh-dome-grad)"
                      filter="url(#gh-glow-fx)"
                      className="gh-dome-squashed"
                    />
                  ) : (
                    /* Исходный упругий купол: верх на y=58 */
                    <path
                      d="M 18 75 C 18 58, 38 58, 38 75 Z"
                      fill="url(#gh-dome-grad)"
                      filter="url(#gh-glow-fx)"
                      className="gh-dome-ready"
                    />
                  )}

                  {/* Интерактивная зона клика по кнопке */}
                  <rect
                    x="7"
                    y="54"
                    width="42"
                    height="45"
                    fill="transparent"
                    cursor={daemonState === 'glaring' ? 'pointer' : 'default'}
                    onClick={handleManualPress}
                  >
                    <title>{ru ? 'Экстренная кнопка восстановления' : 'Emergency restore button'}</title>
                  </rect>
                </g>
              )}

              {/* Ударные волны и визуальный импакт от удара по кнопке */}
              {daemonState === 'pressing' && (
                <g className="gh-slam-fx">
                  {/* Концентрические кольца ударной волны из точки контакта (28, 68) */}
                  <ellipse cx="28" cy="70" rx="15" ry="7" className="gh-shockwave-ring ring-1" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                  <ellipse cx="28" cy="70" rx="24" ry="11" className="gh-shockwave-ring ring-2" fill="none" stroke="#fca5a5" strokeWidth="1.8" />

                  {/* Вспышка в точке удара кулака о купол */}
                  <path
                    d="M 28 60 L 30 66 L 36 68 L 30 70 L 28 76 L 26 70 L 20 68 L 26 66 Z"
                    fill="#ffffff"
                    className="gh-impact-star"
                  />

                  {/* Разлетающиеся искры от сокрушительного удара */}
                  <circle cx="16" cy="63" r="1.8" fill="#fbbf24" className="gh-spark sp-1" />
                  <circle cx="40" cy="62" r="1.8" fill="#fbbf24" className="gh-spark sp-2" />
                  <circle cx="21" cy="55" r="1.4" fill="#ef4444" className="gh-spark sp-3" />
                  <circle cx="35" cy="55" r="1.4" fill="#ef4444" className="gh-spark sp-4" />
                </g>
              )}

              {/* Корпус демона с динамической анимацией позы */}
              <g
                className={`daemon-character ${
                  daemonState === 'glaring'
                    ? 'posture-windup'
                    : daemonState === 'pressing'
                    ? 'posture-slam'
                    : ''
                }`}
              >
                {/* Частицы пыли при ходьбе */}
                {(daemonState === 'entering' || daemonState === 'exiting') && (
                  <g className="daemon-particles">
                    <circle cx="56" cy="98" r="3.5" className="daemon-particle p-1" />
                    <circle cx="49" cy="93" r="2.5" className="daemon-particle p-2" />
                    <circle cx="44" cy="100" r="2" className="daemon-particle p-3" />
                  </g>
                )}

                {/* Хвостик демона */}
                <path
                  d="M106 74 C117 77, 125 69, 127 57 C128 49, 123 43, 129 39"
                  className="daemon-tail"
                  stroke="var(--terminal)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <polygon
                  points="132,41 126,34 122,43"
                  className="daemon-tail-tip"
                  fill="var(--terminal)"
                />

                {/* Левая нога */}
                <g className={`daemon-leg daemon-leg-left ${daemonState === 'entering' || daemonState === 'exiting' ? 'is-walking' : ''}`}>
                  <rect x="74" y="80" width="8" height="18" rx="4" className="daemon-limb" />
                  <rect x="70" y="94" width="14" height="7" rx="3.5" className="daemon-boot" />
                </g>

                {/* Правая нога */}
                <g className={`daemon-leg daemon-leg-right ${daemonState === 'entering' || daemonState === 'exiting' ? 'is-walking' : ''}`}>
                  <rect x="94" y="80" width="8" height="18" rx="4" className="daemon-limb" />
                  <rect x="92" y="94" width="14" height="7" rx="3.5" className="daemon-boot" />
                </g>

                {/* Тело */}
                <rect
                  x="66"
                  y="45"
                  width="44"
                  height="42"
                  rx="14"
                  className="daemon-body-shell"
                />

                {/* Индикатор шелла '>_gc' */}
                <rect x="74" y="55" width="28" height="16" rx="4" className="daemon-chest-screen" />
                <text
                  x="79"
                  y="66"
                  className="daemon-chest-text"
                  fill="var(--terminal)"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  &gt;_gc
                </text>

                {/* Голова демона */}
                <g className={`daemon-head-group ${daemonState === 'glaring' || daemonState === 'pressing' ? 'is-swelling' : ''}`}>
                  <rect
                    x="63"
                    y="18"
                    width="50"
                    height="34"
                    rx="12"
                    className="daemon-head-shell"
                  />

                  {/* Рога */}
                  <path
                    d="M70 20 L62 6 Q67 5 74 17 Z"
                    className="daemon-horn"
                    fill="var(--terminal)"
                  />
                  <path
                    d="M106 20 L114 6 Q109 5 102 17 Z"
                    className="daemon-horn"
                    fill="var(--terminal)"
                  />

                  <rect x="69" y="27" width="38" height="15" rx="6" className="daemon-visor" />

                  {/* Выражение глаз: подозрительное vs умиротворенное vs обычное */}
                  {daemonState === 'glaring' || daemonState === 'pressing' ? (
                    <g className="daemon-eyes-suspicious">
                      {/* Нахмуренные грозные брови */}
                      <path d="M72 29 L86 33" stroke="#ef4444" strokeWidth="2.6" strokeLinecap="round" />
                      <path d="M104 29 L90 33" stroke="#ef4444" strokeWidth="2.6" strokeLinecap="round" />
                      {/* Суженные подозрительные зрачки */}
                      <ellipse cx="81" cy="35" rx="3.2" ry="1.8" fill="#ef4444" />
                      <ellipse cx="95" cy="35" rx="3.2" ry="1.8" fill="#ef4444" />
                      <circle cx="81" cy="35" r="0.9" fill="#ffffff" />
                      <circle cx="95" cy="35" r="0.9" fill="#ffffff" />
                    </g>
                  ) : daemonState === 'restoring' ? (
                    <g className="daemon-eyes-content">
                      {/* Довольные прищуренные глаза ^_^ */}
                      <path d="M77 36 Q81 30 85 36" stroke="var(--terminal)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                      <path d="M91 36 Q95 30 99 36" stroke="var(--terminal)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                    </g>
                  ) : (
                    <g className="daemon-eyes-normal">
                      <circle cx="80" cy="34" r="3.5" fill="var(--terminal)" />
                      <circle cx="96" cy="34" r="3.5" fill="var(--terminal)" />
                      <circle cx="82" cy="33" r="1.2" fill="#ffffff" />
                      <circle cx="98" cy="33" r="1.2" fill="#ffffff" />
                    </g>
                  )}
                </g>

                {/* Правая рука (сзади) */}
                <rect
                  x="106"
                  y="50"
                  width="8"
                  height="20"
                  rx="4"
                  className="daemon-limb"
                />

                {/* Левая рука: замах, сокрушительный удар и отдых */}
                <g className="daemon-arms">
                  {daemonState === 'pressing' ? (
                    /* Удар: мощный кулак обрушивается точно на центр купола (28, 68) */
                    <g className="daemon-slam-arm-group">
                      <path
                        d="M 70 52 C 54 54, 38 61, 28 68"
                        stroke="var(--terminal)"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                      {/* Сжатый механический кулак, вдавливающий купол кнопки */}
                      <circle cx="28" cy="68" r="7" fill="#15803d" stroke="#4ade80" strokeWidth="2.2" />
                      <line x1="24" y1="65" x2="32" y2="65" stroke="#86efac" strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="23" y1="68" x2="33" y2="68" stroke="#86efac" strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="24" y1="71" x2="32" y2="71" stroke="#86efac" strokeWidth="1.6" strokeLinecap="round" />
                    </g>
                  ) : daemonState === 'glaring' ? (
                    /* Замах: кулак занесён высоко над кнопкой (32, 22) и дрожит от ярости */
                    <g className="daemon-windup-arm-group">
                      <path
                        d="M 70 52 C 56 32, 44 18, 32 22"
                        stroke="var(--terminal)"
                        strokeWidth="6.5"
                        strokeLinecap="round"
                      />
                      {/* Сжатый дрожащий кулак строго над куполом кнопки */}
                      <g className="daemon-tremble-fist">
                        <circle cx="32" cy="22" r="7" fill="#15803d" stroke="#4ade80" strokeWidth="2" />
                        <line x1="28" y1="19" x2="36" y2="19" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="27" y1="22" x2="37" y2="22" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="28" y1="25" x2="36" y2="25" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" />
                      </g>
                    </g>
                  ) : daemonState === 'restoring' ? (
                    /* Расслабленная рука после нажатия */
                    <g className="daemon-rest-arm-group">
                      <path
                        d="M 70 52 Q 48 60 28 69"
                        stroke="var(--terminal)"
                        strokeWidth="5.5"
                        strokeLinecap="round"
                      />
                      <circle cx="28" cy="69" r="4.5" fill="var(--terminal)" />
                    </g>
                  ) : (
                    /* Рука при ходьбе */
                    <g className="daemon-walk-arm-group">
                      <path
                        d="M 70 52 Q 65 65 63 74"
                        stroke="var(--terminal)"
                        strokeWidth="5.5"
                        strokeLinecap="round"
                      />
                      <circle cx="63" cy="74" r="3.5" fill="var(--terminal)" />
                    </g>
                  )}
                </g>
              </g>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}