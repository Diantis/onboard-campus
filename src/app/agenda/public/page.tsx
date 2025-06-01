import { BottomNav } from "@/components/BottomNav";
import CalendarUser from "@/components/CalendarUser";
import { FloatingMenu } from "@/components/FloatingMenu";
import { Header } from "@/components/Header";

export default function PublicAgendaPage() {
  return (
    <div className="p-6">
      <Header userName="Machin" />
      <h1 className="text-2xl font-bold mb-4">Agenda</h1>
      <CalendarUser />
      <FloatingMenu />
      <BottomNav />
    </div>
  );
}
