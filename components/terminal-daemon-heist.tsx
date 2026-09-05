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

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // Сценарий возврата ника демоном
  const triggerReturn = useCallback(() => {
    if (state !== 'stolen') return;

    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    setState('returning');

    // Фаза доставки и возврата на место
    const t1 = window.setTimeout(() => {
      setState('restoring');
      const t2 = window.setTimeout(() => {
        setState('idle');
      }, 700);
      timersRef.current.push(t2);
    }, 1800);

    timersRef.current.push(t1);
  }, [state]);

  // Запуск сценария похищения ника
  const startHeist = useCallback(() => {
    if (state !== 'idle') return;

    clearAllTimers();
    setHasTriggeredOnce(true);
    setState('arriving');

    // Фаза 1: Демон подбегает к нику (600ms)
    const t1 = window.setTimeout(() => {
      setState('stealing');

      // Фаза 2: Демон показывает спич-бабл и цепляет буквы (1700ms)
      const t2 = window.setTimeout(() => {
        setState('escaping');

        // Фаза 3: Демон уносит буквы за экран (1100ms)
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
        }, 1100);

        timersRef.current.push(t3);
      }, 1700);

      timersRef.current.push(t2);
    }, 600);

    timersRef.current.push(t1);
  }, [state, clearAllTimers, triggerReturn]);


  const isStolenOrReturning = state === 'stolen' || state === 'returning';
  const isEscapingOrStolen = state === 'escaping' || isStolenOrReturning;

  return (
    <div
      className="daemon-heist-container"
      onMouseEnter={state === 'idle' ? startHeist : undefined}
    >
      {/* Слот ника: заголовок h1 или терминальный плейсхолдер */}
      <div className="daemon-heist-slot">
        <h1
          className={`bento-name daemon-target-title ${
            state === 'stealing' ? 'is-hooked' : ''
          } ${isEscapingOrStolen ? 'is-stolen-hidden' : ''} ${
            state === 'restoring' ? 'is-restored-bounce' : ''
          }`}
        >
          <button
            type="button"
            className="daemon-title-btn"
            onClick={state === 'idle' ? startHeist : undefined}
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
                <Zap size={12} />
                <span>{ru ? 'hover me' : 'hover me'}</span>
              </span>
            )}
          </button>
        </h1>

        {/* Плейсхолдер, пока ник похищен демоном */}
        {isStolenOrReturning && (
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
                onClick={(e) => {
                  e.stopPropagation();
                  triggerReturn();
                }}
                title={ru ? 'Вернуть ник немедленно' : 'Restore nickname now'}
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>{ru ? 'Вернуть сейчас' : 'Restore now'}</span>
              </button>
            </div>
          </output>
        )}
      </div>

      {/* Анимированный персонаж: Терминальный Демон (DevOps GC Daemon) */}
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
                {state === 'stealing' || state === 'escaping'
                  ? ru
                    ? 'Опа! А зачем оно тут лежит? Я пока заберу, потом принесу! 🏃💨'
                    : 'Whoa! Why is this uncollected in RAM? Taking it, brb! 🏃💨'
                  : ru
                  ? 'Фух, тяжёлый какой! Забирай свой memasevich обратно! 😮‍💨'
                  : 'Phew, heap overflow! Take your memasevich back! 😮‍💨'}
              </p>
            </div>
          )}

          {/* Уносимый ник при побеге и возврате */}
          {(state === 'escaping' || state === 'returning') && (
            <div className="daemon-carried-payload">
              <div className="daemon-payload-rope" />
              <span className="daemon-payload-letters">{heroName}</span>
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
              {/* Тень под персонажем */}
              <ellipse cx="50" cy="103" rx="28" ry="6" className="daemon-shadow" />

              {/* Частицы пыли/энергии при беге */}
              <g className="daemon-particles">
                <circle cx="20" cy="98" r="3.5" className="daemon-particle p-1" />
                <circle cx="12" cy="93" r="2.5" className="daemon-particle p-2" />
                <circle cx="6" cy="100" r="2" className="daemon-particle p-3" />
              </g>

              {/* Хвостик демона с терминальным штекером / молнией */}
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

              {/* Тело демона — чёрный кибер-панцирь */}
              <rect
                x="28"
                y="45"
                width="44"
                height="42"
                rx="14"
                className="daemon-body-shell"
              />

              {/* Индикатор на груди: терминальный шелл '>_' */}
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

              {/* Голова демона */}
              <rect
                x="25"
                y="18"
                width="50"
                height="34"
                rx="12"
                className="daemon-head-shell"
              />

              {/* Рожки-антенны демона (светящиеся) */}
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

              {/* Консольный визор / Глаза демона */}
              <rect x="31" y="27" width="38" height="15" rx="6" className="daemon-visor" />
              {state === 'returning' ? (
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
                    d="M74 25 C75 22, 79 23, 79 26 C79 28, 76 30, 74 30 C72 30, 71 28, 72 26 Z"
                    fill="#38bdf8"
                    className="daemon-sweat-drop"
                  />
                </g>
              ) : (
                <g className="daemon-eyes-mischievous">
                  <circle cx="42" cy="34" r="3.5" fill="var(--terminal)" />
                  <circle cx="58" cy="34" r="3.5" fill="var(--terminal)" />
                  <circle cx="44" cy="33" r="1.2" fill="#ffffff" />
                  <circle cx="60" cy="33" r="1.2" fill="#ffffff" />
                </g>
              )}

              {/* Руки демона с кибер-захватом */}
              <g className="daemon-arms">
                {state === 'stealing' || state === 'escaping' ? (
                  <path
                    d="M30 55 Q18 52 14 62 Q18 68 28 62"
                    className="daemon-arm-extended"
                    fill="#0f172a"
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
  );
}