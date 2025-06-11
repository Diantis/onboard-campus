// src/app/documents/page.tsx

import { ReactNode } from "react";

// On sépare la logique interactive dans un Client Component
import DocumentListClient from "./DocumentListClient";

export const metadata = {
  title: "Mes Documents",
  description: "Gestion de vos documents étudiants",
};

// **Ceci est un Server Component**, sans hooks ni `use client`.
export default function DocumentsPage(): ReactNode {
  return (
    <>
      <main className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Mes Documents
        </h1>
        {/* Le vrai affichage, avec hooks, modals, fetch… */}
        <DocumentListClient />
      </main>
    </>
  );
}
