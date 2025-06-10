// src/app/faq/page.tsx
import { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ – Campus Onboarding",
  description: "Foire aux questions et posez la vôtre",
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">FAQ</h1>
      <FaqClient />
    </main>
  );
}
