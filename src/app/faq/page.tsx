// src/app/faq/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Campus Onboarding",
  description: "Foire aux questions et posez la vôtre",
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-background p-6">
      <h2 className="text-3xl font-bold mb-8">FAQ</h2>
    </main>
  );
}
