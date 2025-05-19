"use client";

import { useState } from "react";
import { ChevronDown, Monitor, Globe, Lock, SunIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import SwitchLanguage from "./SwitchLanguage";
import SwitchMode from "./SwitchMode";

export default function SettingsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const settingsItems = [
    {
      title: (
        <div className="flex items-center gap-2">
          <Monitor size={18} />
          {t("Settings.myAccount")}
        </div>
      ),
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
    {
      title: (
        <div className="flex items-center gap-2">
          <SunIcon size={18} />
          {t("Settings.lightMode")}
        </div>
      ),
      content: <SwitchMode />,
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
  ];

  return (
    <div className="m-5 space-y-2">
      {settingsItems.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg overflow-hidden"
        >
          {item.content ? (
            <>
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center text-left p-3 bg-gray-100 hover:bg-gray-200 focus:outline-none transition-all duration-200"
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
                <div className="p-3 bg-gray-50 border-gray-300">
                  {item.content}
                </div>
              </div>
            </>
          ) : (
            <div className="p-3 bg-gray-100">{item.title}</div>
          )}
        </div>
      ))}
    </div>
  );
}
