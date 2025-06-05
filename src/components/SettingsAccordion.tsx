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
import { Button } from "@/components/ui/button";

export default function SettingsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
      content: t("Settings.helpCenter"),
    },
  ];

  return (
    <div className="md:mx-50 m-5 space-y-2">
      {settingsItems.map((item, index) => (
        <div
          key={index}
          className="border border-border rounded-lg overflow-hidden"
        >
          {item.href ? (
            <Link
              href={item.href}
              className="w-full flex items-center gap-2 p-3 bg-muted hover:bg-muted-foreground/10 transition-all duration-200"
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ) : item.content ? (
            <>
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center text-left p-3 bg-muted hover:bg-muted-foreground/10 focus:outline-none transition-all duration-200"
              >
                {item.title}
                <ChevronDown
                  className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${openIndex === index ? "max-h-[500px]" : "max-h-0"}`}
              >
                <div className="p-3 bg-background border-t border-border">
                  {item.content}
                </div>
              </div>
            </>
          ) : (
            <div className="p-3 bg-muted">{item.title}</div>
          )}
        </div>
      ))}
      <Button
        className="w-full"
        onClick={() => {
          fetch("/api/logout", { method: "POST" }).then(() => {
            window.location.href = "/login";
          });
        }}
      >
        {t("Settings.Logout")}
      </Button>
    </div>
  );
}
