import SettingsAccordion from "@/components/SettingsAccordion";

// src/app/settings/page.tsx
export default function SettingsPage() {
  return (
    <div className="w-full max-w-xl mx-auto mt-5 space-y-2">
      <h1 className="p-4">Paramètres ⚙️</h1>
      <SettingsAccordion />
    </div>
  );
}
