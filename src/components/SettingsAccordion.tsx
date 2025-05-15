"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SettingsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t, i18n } = useTranslation();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleLocale = () => {
    i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr");
  };

  const settingsItems = [
    {
      title: "🖥️" + t("displayTheme"),
      content: t("displayTheme"),
    },
    {
      title: "🌐" + t("language"),
      content: (
        <button
          onClick={toggleLocale}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {i18n.language === "fr" ? t("switchToEnglish") : t("switchToFrench")}
        </button>
      ),
    },
    {
      title: "🔒" + t("securityPrivacy"),
      content: t("securityPrivacy"),
    },
  ];

  return (
    <div className="m-5 space-y-2">
      {settingsItems.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg overflow-hidden"
        >
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
            <div className="p-3 bg-gray-50 border-gray-300">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
