// Page d'accueil - Next.js (App Router)
// Fichier : src/app/page.tsx

import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { FloatingMenu } from "@/components/FloatingMenu";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white pb-28 flex flex-col">
      <Header userName="Machin" />
      <section className="px-4 pt-4 space-y-4 flex-grow">
        <div className="h-28 w-full rounded-xl bg-yellow-400 shadow" />
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0 z-10 bg-white p-2 rounded-full shadow">
            ◀
          </button>
          <div className="h-40 w-full max-w-xs rounded-xl bg-rose-400 shadow" />
          <button className="absolute right-0 z-10 bg-white p-2 rounded-full shadow">
            ▶
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          <div className="min-w-[6rem] h-24 rounded-xl bg-blue-400 shadow" />
          <div className="min-w-[6rem] h-24 rounded-xl bg-green-400 shadow" />
          <div className="min-w-[6rem] h-24 rounded-xl bg-rose-400 shadow" />
        </div>
      </section>
      <BottomNav />
    </main>
  );
}
