"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SettingsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const settingsItems = [
    { title: "🔧 Mon compte", content: "Ici tu peux accéder à ton profil." },
    {
      title: "🌐 Services",
      content:
        "Retrouve le détails de tous les services proposés par l'université.",
    },
    {
      title: "🔒 Sécurité & Confidentialité",
      content: "Modifie les paramètres de sécurité et de confidentialité.",
    },
    {
      title: "🖥️ Affichage & Thème",
      content: "Personnalise l'affichage et le thème de l'application.",
    },
    {
      title: "📅 Calendrier",
      content: "Gère tes événements et ton emploi du temps.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-5 space-y-2">
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
