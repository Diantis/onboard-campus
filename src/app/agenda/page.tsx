// src/app/agenda/page.tsx
"use client";

import CalendarAdmin from "@/components/CalendarAdmin";

export default function AdminPage() {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6">
      <h1 className="text-2xl font-bold mb-4">Agenda Administrateur</h1>
      <CalendarAdmin />
    </div>
  );
}
