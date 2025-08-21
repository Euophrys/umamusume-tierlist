import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check browser preference on startup
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);

    // Apply the class to body
    if (prefersDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      return newMode;
    });
  };

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        position: "fixed",
        top: "10px",
        left: "10px",
        fontSize: "24px",
        background: "none",
        border: "none",
        cursor: "pointer"
      }}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
