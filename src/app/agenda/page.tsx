// src/app/agenda/page.tsx
import { BottomNav } from "@/components/BottomNav";
import CalendarAdmin from "@/components/CalendarAdmin";
import { FloatingMenu } from "@/components/FloatingMenu";
import { Header } from "@/components/Header";

export default function AdminPage() {
  return (
    <div className="p-6">
      <Header userName="Machin" />
      <h1 className="text-2xl font-bold mb-4">Agenda Administrateur</h1>
      <CalendarAdmin />
      <FloatingMenu />
      <BottomNav />
    </div>
  );
}
