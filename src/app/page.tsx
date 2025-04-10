// Page d'accueil - Next.js (App Router)
// Fichier : src/app/page.tsx

'use client';

import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { FloatingMenu } from "@/components/FloatingMenu";
import { CardGrid } from "@/components/CardGrid";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white pb-28">
      <Header userName={user?.name || "Visiteur"} />
      
      {/* Section Principale */}
      <section className="px-4 pt-4 space-y-6">
        {/* Bannière d'accueil */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Bienvenue sur Campus</h2>
          <p className="text-violet-100">Découvrez tous les services disponibles</p>
        </div>

        {/* Section des services rapides */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Services Rapides</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-violet-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-violet-600 text-xl">📚</span>
              </div>
              <h4 className="font-medium">Bibliothèque</h4>
              <p className="text-sm text-gray-500">Accès aux ressources</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-blue-600 text-xl">📅</span>
              </div>
              <h4 className="font-medium">Emploi du temps</h4>
              <p className="text-sm text-gray-500">Voir votre planning</p>
            </div>
          </div>
        </div>

        {/* Section des actualités */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Actualités</h3>
          <CardGrid />
        </div>

        {/* Section des événements à venir */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Événements à venir</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="min-w-[280px] bg-white p-4 rounded-xl shadow-sm">
              <div className="h-32 bg-violet-100 rounded-lg mb-3"></div>
              <h4 className="font-medium">Conférence Tech</h4>
              <p className="text-sm text-gray-500">15 Mars 2024</p>
            </div>
            <div className="min-w-[280px] bg-white p-4 rounded-xl shadow-sm">
              <div className="h-32 bg-blue-100 rounded-lg mb-3"></div>
              <h4 className="font-medium">Workshop Design</h4>
              <p className="text-sm text-gray-500">20 Mars 2024</p>
            </div>
          </div>
        </div>
      </section>

      <FloatingMenu />
      <BottomNav />
    </main>
  );
}
