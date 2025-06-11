// src/app/agenda/public/page.tsx

"use client";

import CalendarUser from "@/components/CalendarUser";

export default function PublicAgendaPage() {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6">
      <h1 className="text-2xl font-bold mb-4">Agenda</h1>
      <CalendarUser />
    </div>
  );
}
