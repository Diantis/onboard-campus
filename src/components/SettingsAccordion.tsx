// src/components/SettingsAccordion.tsx

"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  CircleHelp,
  ChevronDown,
  Globe,
  Lock,
  Monitor,
  Sun,
  Moon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import SwitchLanguage from "./SwitchLanguage";
import { ModeToggle } from "./ModeToggle";
import { useTheme } from "next-themes";

export default function SettingsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Toggle accordion open/close state
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Dynamically display the correct theme icon and label
  const themeTitle = (
    <div className="flex items-center gap-2">
      {isMounted && theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
      {isMounted && theme === "dark"
        ? t("Settings.darkMode")
        : t("Settings.lightMode")}
    </div>
  );

  const settingsItems = [
    {
      title: t("Settings.myProfile"),
      href: "/profil",
      icon: <Monitor size={18} />,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <Globe size={18} />
          {t("Settings.language")}
        </div>
      ),
      content: <SwitchLanguage />,
    },
    { title: themeTitle, content: <ModeToggle /> },
    {
      title: (
        <div className="flex items-center gap-2">
          <Bell size={18} />
          {t("Settings.notifications")}
        </div>
      ),
      content: t("Settings.notifications"),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <Lock size={18} />
          {t("Settings.securityPrivacy")}
        </div>
      ),
      content: t("Settings.securityPrivacy"),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <CircleHelp size={18} />
          {t("Settings.helpCenter")}
        </div>
      ),
      content: t("Settings.helpDescription"),
    },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 flex-1 flex flex-col justify-start space-y-3">
      {settingsItems.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden"
        >
          {item.href ? (
            <Link
              href={item.href}
              className="w-full flex items-center gap-3 p-4 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ) : item.content ? (
            <>
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center text-left p-4 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {item.title}
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  openIndex === index ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                  {item.content}
                </div>
              </div>
            </>
          ) : (
            <div className="p-4 text-gray-800 dark:text-gray-100">
              {item.title}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
