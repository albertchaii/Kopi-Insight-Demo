import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#0F0E0D", alt: "#161412" },
        surface: "#1A1816",
        placeholder: "#1D1A17",
        line: { DEFAULT: "#2A2622", strong: "#2E2A26", input: "#3A352F" },
        ink: { DEFAULT: "#F5F1EB", soft: "#C9C1B6", muted: "#B5ADA3" },
        accent: { DEFAULT: "#F2A33A", hover: "#FFC170", on: "#1A1208", badge: "#2A2219" },
        open: "#5BC27A",
      },
      fontFamily: {
        display: ["Anton", "Arial Narrow", "sans-serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["84px", { lineHeight: "0.98", letterSpacing: "0.5px" }],
        "display-xl-sm": ["46px", { lineHeight: "1", letterSpacing: "0.5px" }],
        "display-l": ["52px", { lineHeight: "1.02" }],
        "display-l-sm": ["32px", { lineHeight: "1.02" }],
        "display-promo": ["72px", { lineHeight: "1" }],
        "display-promo-sm": ["48px", { lineHeight: "1" }],
      },
      borderRadius: { xl: "24px", lg: "18px", md: "10px" },
      maxWidth: { container: "1200px" },
    },
  },
} satisfies Config;
