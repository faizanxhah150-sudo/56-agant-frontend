/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Neutral base — deep near-black, not pure black
        bg: {
          DEFAULT: "#0a0b0d",
          panel: "#111318",
          raised: "#161922",
          border: "#22262f",
        },
        ink: {
          DEFAULT: "#e9eaee",
          muted: "#9aa0ac",
          faint: "#5c626e",
        },
        // Single disciplined accent family — electric teal
        accent: {
          DEFAULT: "#2dd4bf",
          hover: "#5eead4",
          dim: "#134e4a",
          text: "#0a0b0d",
        },
        status: {
          good: "#34d399",
          warn: "#fbbf24",
          bad: "#f87171",
        },
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
      fontFamily: {
        display: ["'Sora'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        h1: ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["22px", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["17px", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["15px", { lineHeight: "1.6", fontWeight: "400" }],
        caption: ["13px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
        panel: "0 1px 0 rgba(255,255,255,0.03) inset, 0 16px 40px -20px rgba(0,0,0,0.7)",
        glow: "0 0 0 3px rgba(45,212,191,0.25)",
      },
    },
  },
  plugins: [],
};
