// src/app/settings/page.tsx
"use client";

import SettingsAccordion from "@/components/SettingsAccordion";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { t } = useTranslation();
  return (
    <div className="relative min-h-screen bg-background pb-28 flex flex-col">
      <h1 className="md:mx-50 m-5 text-2xl font-bold mb-4 flex items-center gap-2">
        <Settings className="w-6 h-6" />
        {t("Settings.settings")}
      </h1>
      <SettingsAccordion />
      <Button
        onClick={() => {
          fetch("/api/logout", { method: "POST" }).then(() => {
            window.location.href = "/login";
          });
        }}
      >
        Logout
      </Button>
    </div>
  );
}
