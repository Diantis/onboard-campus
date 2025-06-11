// src/app/providers.tsx
"use client";

import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";
import { ThemeProvider } from "@/components/ThemeProvider";

/**
 * Global providers wrapper for the entire application.
 * Includes:
 * - i18next internationalization support
 * - ThemeProvider for dark/light/system mode via Tailwind & next-themes
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    // Makes translation functions (t, i18n) available throughout the app
    <I18nextProvider i18n={i18n}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </I18nextProvider>
  );
}
