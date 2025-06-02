// src/app/agenda/page.tsx
import CalendarAdmin from "@/components/CalendarAdmin";

export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agenda Administrateur</h1>
      <CalendarAdmin />
    </div>
  );
}
