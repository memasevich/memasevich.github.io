'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Terminal, Zap } from 'lucide-react';

interface TerminalDaemonHeistProps {
  heroName: string;
  locale: 'ru' | 'en';
}

type HeistState =
  | 'idle'
  | 'arriving'
  | 'stealing'
  | 'escaping'
  | 'stolen'
  | 'returning'
  | 'restoring';

export function TerminalDaemonHeist({ heroName, locale }: TerminalDaemonHeistProps) {
  const ru = locale === 'ru';
  const [state, setState] = useState<HeistState>('idle');
  const [countdown, setCountdown] = useState<number>(6);
  const [hasTriggeredOnce, setHasTriggeredOnce] = useState<boolean>(false);

  const timersRef = useRef<number[]>([]);
  const countdownIntervalRef = useRef<number | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const cooldownRef = useRef<boolean>(false);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // Запуск сценария возврата ника демоном
  const triggerReturn = useCallback(() => {
    if (state !== 'stolen') return;

    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    setState('returning');

    // Фаза доставки: демон тащит ник обратно (1400ms)
    const t1 = window.setTimeout(() => {
      setState('restoring');

      // Фаза возврата на место: пружинящий bounce (650ms)
      const t2 = window.setTimeout(() => {
        setState('idle');
        cooldownRef.current = true;
        // Кулдаун 2 секунды, чтобы курсор над словом не запускал анимацию повторно
        const t3 = window.setTimeout(() => {
          cooldownRef.current = false;
        }, 2000);
        timersRef.current.push(t3);
      }, 650);

      timersRef.current.push(t2);
    }, 1400);

    timersRef.current.push(t1);
  }, [state]);

  // Запуск сценария похищения ника
  const startHeist = useCallback(() => {
    if (state !== 'idle' || cooldownRef.current) return;

    clearAllTimers();
    setHasTriggeredOnce(true);
    setState('arriving');

    // Фаза 1: Демон подбегает к нику (550ms)
    const t1 = window.setTimeout(() => {
      setState('stealing');

      // Фаза 2: Демон показывает спич-бабл и цепляет буквы (1800ms)
      const t2 = window.setTimeout(() => {
        setState('escaping');

        // Фаза 3: Демон уносит буквы за экран (1000ms)
        const t3 = window.setTimeout(() => {
          setState('stolen');
          setCountdown(6);

          // Таймер обратного отсчёта до автовозврата
          let currentCount = 6;
          countdownIntervalRef.current = window.setInterval(() => {
            currentCount -= 1;
            setCountdown(currentCount);
            if (currentCount <= 0) {
              if (countdownIntervalRef.current) {
                window.clearInterval(countdownIntervalRef.current);
                countdownIntervalRef.current = null;
              }
              triggerReturn();
            }
          }, 1000);
        }, 1000);

        timersRef.current.push(t3);
      }, 1800);

      timersRef.current.push(t2);
    }, 550);

    timersRef.current.push(t1);
  }, [state, clearAllTimers, triggerReturn]);

  const handleHoverStart = () => {
    if (state !== 'idle' || cooldownRef.current) return;
    // Дебаунс намеренного наведения (180ms)
    hoverTimerRef.current = window.setTimeout(() => {
      startHeist();
    }, 180);
  };

  const handleHoverEnd = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleClick = () => {
    if (state === 'idle' && !cooldownRef.current) {
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      startHeist();
    }
  };

  return (
    <div className="daemon-heist-container">
      {/* Слот с зарезервированной высотой (предотвращает CLS) */}
      <div className="daemon-heist-slot">
        {/* Анимированный узел ника (перемещается целиком вместе с демоном) */}
        {state !== 'stolen' && (
          <div className={`daemon-interactive-track state-${state}`}>
            <h1
              className={`bento-name daemon-target-title ${
                state === 'stealing' ? 'is-hooked' : ''
              } ${state === 'restoring' ? 'is-restored-bounce' : ''}`}
            >
              <button
                type="button"
                className="daemon-title-btn"
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                onClick={handleClick}
                disabled={state !== 'idle'}
                aria-label={
                  state === 'idle'
                    ? ru
                      ? 'MEMASEVICH — наведите курсор для интерактивной пасхалки'
                      : 'MEMASEVICH — hover for easter egg'
                    : undefined
                }
              >
                {heroName}
                {state === 'idle' && !hasTriggeredOnce && (
                  <span className="daemon-idle-hint" aria-hidden="true">
                    <Zap size={11} />
                    <span>{ru ? 'наведи' : 'hover'}</span>
                  </span>
                )}
              </button>
            </h1>

            {/* Персонаж: Терминальный Демон — привязан к тексту ника */}
            {state !== 'idle' && (
              <div
                className={`daemon-actor-stage state-${state}`}
                aria-hidden="true"
              >
                {/* Спич-бабл с репликами демона */}
                {(state === 'stealing' || state === 'escaping' || state === 'returning') && (
                  <div className={`daemon-speech-bubble bubble-${state}`}>
                    <div className="daemon-bubble-tag">
                      <span className="daemon-bubble-dot" />
                      <span>daemon:gc_worker</span>
                    </div>
                    <p className="daemon-bubble-msg">
                      {state === 'returning'
                        ? ru
                          ? 'Фух, тяжёлый какой! Забирай свой memasevich обратно! 😮‍💨'
                          : 'Phew, heap overflow! Take your memasevich back! 😮‍💨'
                        : ru
                        ? 'Опа! А зачем оно тут лежит? Я пока заберу, потом принесу! 🏃💨'
                        : 'Whoa! Why is this uncollected in RAM? Taking it, brb! 🏃💨'}
                    </p>
                  </div>
                )}

                {/* Векторный анимированный Терминальный Демон */}
                <div className="daemon-sprite-box">
                  <svg
                    viewBox="0 0 100 110"
                    className="daemon-svg"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Тень */}
                    <ellipse cx="50" cy="103" rx="28" ry="6" className="daemon-shadow" />

                    {/* Частицы пыли/энергии */}
                    <g className="daemon-particles">
                      <circle cx="16" cy="98" r="3.5" className="daemon-particle p-1" />
                      <circle cx="9" cy="93" r="2.5" className="daemon-particle p-2" />
                      <circle cx="4" cy="100" r="2" className="daemon-particle p-3" />
                    </g>

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
                    <g className="daemon-leg daemon-leg-left">
                      <rect x="36" y="80" width="8" height="18" rx="4" className="daemon-limb" />
                      <rect x="32" y="94" width="14" height="7" rx="3.5" className="daemon-boot" />
                    </g>

                    {/* Правая нога */}
                    <g className="daemon-leg daemon-leg-right">
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

                    {/* Индикатор на груди: '>_gc' */}
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

                    {/* Голова */}
                    <rect
                      x="25"
                      y="18"
                      width="50"
                      height="34"
                      rx="12"
                      className="daemon-head-shell"
                    />

                    {/* Рожки-антенны */}
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

                    {/* Визор / глаза */}
                    <rect x="31" y="27" width="38" height="15" rx="6" className="daemon-visor" />
                    {state === 'returning' ? (
                      /* Уставший вид при возврате */
                      <g className="daemon-eyes-tired">
                        <path
                          d="M37 36 Q42 32 47 36"
                          stroke="var(--terminal)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M53 36 Q58 32 63 36"
                          stroke="var(--terminal)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M74 24 C75 21, 79 22, 79 25 C79 27, 76 29, 74 29 C72 29, 71 27, 72 25 Z"
                          fill="#38bdf8"
                          className="daemon-sweat-drop"
                        />
                      </g>
                    ) : (
                      /* Озорной прищур */
                      <g className="daemon-eyes-mischievous">
                        <circle cx="42" cy="34" r="3.5" fill="var(--terminal)" />
                        <circle cx="58" cy="34" r="3.5" fill="var(--terminal)" />
                        <circle cx="44" cy="33" r="1.2" fill="#ffffff" />
                        <circle cx="60" cy="33" r="1.2" fill="#ffffff" />
                      </g>
                    )}

                    {/* Руки */}
                    <g className="daemon-arms">
                      {state === 'stealing' || state === 'escaping' ? (
                        <path
                          d="M30 55 Q16 52 10 62 Q16 68 28 62"
                          className="daemon-arm-extended"
                          fill="#090c0f"
                          stroke="var(--line-hard)"
                          strokeWidth="1.5"
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
        )}

        {/* Плейсхолдер при похищении (виден ТОЛЬКО в состоянии stolen) */}
        {state === 'stolen' && (
          <output className="daemon-stolen-box">
            <div className="daemon-stolen-header">
              <Terminal size={13} className="daemon-term-icon" aria-hidden="true" />
              <span className="daemon-stolen-title">
                {ru ? 'ERR_404_POINTER_DEREFERENCED' : 'ERR_404_POINTER_DEREFERENCED'}
              </span>
              <span className="daemon-stolen-badge">PID #1337 / GC</span>
            </div>

            <p className="daemon-stolen-desc">
              {ru
                ? `Дежурный демон gc_worker временно унёс «${heroName}» в /tmp.`
                : `Daemon gc_worker temporarily moved "${heroName}" to /tmp.`}
            </p>

            <div className="daemon-stolen-footer">
              <span className="daemon-countdown-badge">
                {ru ? `Автовозврат: ${countdown}с` : `Auto-restore: ${countdown}s`}
              </span>
              <button
                type="button"
                className="daemon-restore-btn"
                onClick={triggerReturn}
                title={ru ? 'Вернуть ник немедленно' : 'Restore nickname now'}
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>{ru ? 'Вернуть сейчас' : 'Restore now'}</span>
              </button>
            </div>
          </output>
        )}
      </div>
    </div>
  );
}