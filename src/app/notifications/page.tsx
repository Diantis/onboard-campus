// src/app/notifications/page.tsx
"use client";

import { useState } from "react";

type Notif = { id: number; message: string; time: string };

const INITIAL: Notif[] = [
  { id: 1, message: "Nouveau document à signer", time: "10:15" },
  { id: 2, message: "Votre question a reçu une réponse", time: "09:42" },
  { id: 3, message: "Nouvel événement ajouté à l'agenda", time: "Hier 16:20" },
];

export default function NotificationsPage() {
  const [list, setList] = useState<Notif[]>(INITIAL);

  const dismiss = (id: number) => {
    setList((l) => l.filter((n) => n.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Notifications</h1>

        {list.length > 0 ? (
          <ul className="space-y-4">
            {list.map((n) => (
              <li
                key={n.id}
                className="flex justify-between items-start bg-white p-4 rounded shadow"
              >
                <div>
                  <p className="text-gray-800">{n.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{n.time}</p>
                </div>
                <button
                  onClick={() => dismiss(n.id)}
                  aria-label="Supprimer notification"
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucune notification.</p>
        )}
      </div>
    </main>
  );
}
