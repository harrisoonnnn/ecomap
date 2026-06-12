import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
          muted: "rgb(var(--ink-muted) / <alpha-value>)",
        },
        brand: {
          blue: "#6aa8ff",
          purple: "#a78bfa",
          cyan: "#67e8f9",
          deep: "#4f7cff",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: { xl: "1rem", "2xl": "1.5rem", "3xl": "2rem" },
      boxShadow: {
        glow: "0 0 0 1px rgba(167,139,250,0.25), 0 12px 40px rgba(103,232,249,0.25)",
      },
      keyframes: {
        "float-slow": {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-18px) translateX(10px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        dash: { to: { strokeDashoffset: "-1000" } },
      },
      animation: {
        "float-slow": "float-slow 12s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        dash: "dash 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
