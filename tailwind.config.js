/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "rgb(var(--cream) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        inksoft: "rgb(var(--ink-soft) / <alpha-value>)",
        indigo: "rgb(var(--indigo) / <alpha-value>)",
        line: "rgb(var(--line) / 0.1)",
        card: "rgb(var(--card) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      borderRadius: {
        xl2: "16px"
      }
    }
  },
  plugins: []
};
