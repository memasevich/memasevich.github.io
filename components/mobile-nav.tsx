"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

type NavItem = { href: string; index: string; label: string };

const emptySubscribe = () => () => {};

export function MobileNav({ items, langLabel, locale = 'ru' }: { items: NavItem[]; langLabel: string; locale?: 'ru' | 'en' }) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const burger = (
    <div className="mobile-nav">
      <button
        className="mobile-burger"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <i />
        <i />
        <i />
      </button>
    </div>
  );

  if (!mounted) return burger;

  return (
    <>
      {burger}
      {open &&
        createPortal(
          <div
            className="mobile-menu-backdrop"
            onClick={() => setOpen(false)}
            role="presentation"
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          >
            <nav id="mobile-menu" className="mobile-menu" aria-label={langLabel}>
              <div className="mobile-menu-head">
                <span>root@memasevich:~$ ./menu</span>
                <button className="mobile-menu-close" onClick={() => setOpen(false)} aria-label="Close">
                  [x]
                </button>
              </div>
              {items.map((item) => (
                <a key={item.href} href={item.href} className="mobile-menu-link" onClick={() => setOpen(false)}>
                  <span>{item.index}</span>
                  {item.label}
                  <i>↵</i>
                </a>
              ))}
              <div className="mobile-menu-footer">
                <span className="locale-switch">
                  <Link className={locale === 'ru' ? 'active' : ''} href="/">RU</Link>
                  <Link className={locale === 'en' ? 'active' : ''} href="/en">EN</Link>
                </span>
                <a className="mobile-menu-cv" href="/resume.pdf" download>
                  {locale === 'ru' ? 'Скачать CV (PDF)' : 'Download CV (PDF)'} ⤓
                </a>
              </div>
            </nav>
          </div>,
          document.body
        )}
    </>
  );
}