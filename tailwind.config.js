/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        tier: {
          s: "#ef4444",
          a: "#f97316",
          b: "#eab308",
          c: "#22c55e",
          d: "#06b6d4",
          e: "#3b82f6",
          f: "#a855f7",
        },
      },
    },
  },
  plugins: [],
}
