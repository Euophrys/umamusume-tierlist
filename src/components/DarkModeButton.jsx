import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check browser preference on startup
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setDarkMode(prefersDark);

    // Apply the class to body and HTML (for Tailwind dark: variant)
    if (prefersDark) {
      document.body.classList.add("dark-mode");
      document.documentElement.classList.add("dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add("dark-mode");
        document.documentElement.classList.add("dark");
      } else {
        document.body.classList.remove("dark-mode");
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      className="fixed top-3 left-3 z-50 w-11 h-11 flex items-center justify-center rounded-full border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-lg hover:bg-slate-100 dark:hover:bg-zinc-800  focus:outline-none shadow-sm"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
