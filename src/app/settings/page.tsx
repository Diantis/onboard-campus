// src/app/settings/page.tsx
import SettingsAccordion from "@/components/SettingsAccordion";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="relative min-h-screen bg-background pb-28 flex flex-col">
		<h1 className="md:mx-50 m-5 text-2xl font-bold mb-4 flex items-center gap-2">
		<Settings className="w-6 h-6" />
		Paramètres
		</h1>
		<SettingsAccordion />
    </div>
  );
}
