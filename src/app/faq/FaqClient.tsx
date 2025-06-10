// src/app/faq/FaqClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import FaqAdminManager from "@/components/FaqAdminManager";
import FaqItem from "@/components/FaqItem";
import AskQuestionForm from "@/components/AskQuestionForm";

interface Faq {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

export default function FaqClient() {
  const user = useUser();
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadFaqs = async () => {
    try {
      const res = await fetch("/api/faqs");
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Erreur serveur");
      }
      setFaqs(await res.json());
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erreur connexion serveur");
      setFaqs([]);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  // Si user === undefined, on est en chargement du hook
  if (user === undefined) {
    return (
      <div className="rounded-xl border-2 bg-white dark:bg-zinc-900 min-h-screen flex items-center justify-center bg-white">
        <p className="text-black">Chargement…</p>
      </div>
    );
  }

  // Si admin, afficher le gestionnaire
  if (user && user.role === "ADMIN") {
    return (
      <div className="rounded-xl border-2 bg-white dark:bg-zinc-900 min-h-screen bg-white p-6">
        <h2 className="text-black text-3xl font-bold mb-4">Gestion FAQ</h2>
        <FaqAdminManager />
      </div>
    );
  }

  // Étudiant ou non connecté : afficher la FAQ publique
  const filtered = faqs.filter((f) =>
    f.question.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="rounded-xl border-2 bg-white dark:bg-zinc-900 min-h-screen bg-white p-6">
      <input
        type="text"
        placeholder="Rechercher une question…"
        className="w-full p-3 mb-6 border rounded text-black"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="space-y-4 mb-8">
        {filtered.length > 0 ? (
          filtered.map((f) => (
            <FaqItem key={f.id} question={f.question} answer={f.answer!} />
          ))
        ) : (
          <p className="text-gray-500">Aucune question trouvée.</p>
        )}
      </div>

      <AskQuestionForm onSuccess={loadFaqs} />
    </div>
  );
}
