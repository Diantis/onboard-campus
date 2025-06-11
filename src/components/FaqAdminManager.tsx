// src/components/FaqAdminManager.tsx
"use client";
import { useState, useEffect } from "react";

type PendingFaq = { id: string; question: string };

export default function FaqAdminManager() {
  const [pending, setPending] = useState<PendingFaq[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  async function load() {
    const res = await fetch("/api/faqs/pending");
    if (res.ok) setPending(await res.json());
  }
  useEffect(() => {
    load();
  }, []);

  const answerOne = async (id: string) => {
    const ans = answers[id]?.trim();
    if (!ans) return alert("Réponse requise");
    await fetch(`/api/faqs/${id}/answer`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: ans }),
    });
    setAnswers((a) => {
      delete a[id];
      return { ...a };
    });
    load();
  };

  if (pending.length === 0) {
    return <p className="text-gray-500">Aucune question en attente.</p>;
  }
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Questions en attente</h2>
      {pending.map((q) => (
        <div key={q.id} className="p-4 bg-white rounded shadow">
          <p className="mb-2">{q.question}</p>
          <textarea
            rows={2}
            className="w-full p-2 border rounded mb-2"
            placeholder="Votre réponse…"
            value={answers[q.id] || ""}
            onChange={(e) =>
              setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
            }
          />
          <button
            onClick={() => answerOne(q.id)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Répondre
          </button>
        </div>
      ))}
    </div>
  );
}
