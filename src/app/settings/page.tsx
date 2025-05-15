import SettingsAccordion from "@/components/SettingsAccordion";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { FloatingMenu } from "@/components/FloatingMenu";

// src/app/settings/page.tsx
export default function SettingsPage() {
  return (
    <div className="relative min-h-screen bg-white pb-28 flex flex-col">
      <Header userName="Machin" />
      <h1 className="m-5 text-2xl font-bold mb-4">Paramètres ⚙️</h1>
      <SettingsAccordion />
      <FloatingMenu />
      <BottomNav />
    </div>
  );
}
