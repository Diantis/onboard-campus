// src/app/settings/page.tsx
"use client";

import SettingsAccordion from "@/components/SettingsAccordion";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation();
  return (
    <div className="relative min-h-screen bg-background pb-28 flex flex-col">
      <h1 className="ml-5 sm:ml-10 mt-6 text-2xl font-bold">
        {t("Settings.settings")}
      </h1>
      <SettingsAccordion />
    </div>
  );
}
