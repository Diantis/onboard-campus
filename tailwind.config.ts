// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",  // Scanne tous tes fichiers TypeScript dans src
    "./node_modules/@originui/**/*.{js,ts,jsx,tsx}", // Au cas où OriginUI y est installé
  ],
  theme: {
    extend: {
      colors: {
        // Exemples de tokens shadcn/origin
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        muted: "hsl(var(--muted))",
      },
    },
  },
  plugins: [],
};
export default config;
