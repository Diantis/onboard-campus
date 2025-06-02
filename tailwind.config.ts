// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@originui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: "oklch(var(--primary))",
        muted: "oklch(var(--muted))",
      },
    },
  },
  plugins: [],
};
export default config;
