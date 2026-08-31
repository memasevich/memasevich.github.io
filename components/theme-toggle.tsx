"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("theme-light")
    ? "light"
    : "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "dark");

  useEffect(() => {
    if (
      !document.documentElement.classList.contains("theme-light") &&
      matchMedia("(prefers-color-scheme: light)").matches
    ) {
      document.documentElement.classList.add("theme-light");
    }
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle("theme-light");
  };

  return (
    <button
      onClick={toggle}
      className="locale-switch"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: "5px 8px",
        background: theme === "light" ? "var(--signal)" : "transparent",
        color: theme === "light" ? "#090c0f" : "var(--muted)",
        marginLeft: "12px"
      }}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  );
}
