"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (document.documentElement.classList.contains("theme-light")) {
      setTheme("light");
    } else if (matchMedia("(prefers-color-scheme: light)").matches) {
      document.documentElement.classList.add("theme-light");
      setTheme("light");
    }
  }, []);

  const toggle = () => {
    if (theme === "light") {
      document.documentElement.classList.remove("theme-light");
      setTheme("dark");
    } else {
      document.documentElement.classList.add("theme-light");
      setTheme("light");
    }
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
