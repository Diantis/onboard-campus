"use client";

import { useState, useEffect } from "react";

type Faq = { id: string; question: string; createdAt: string };
export default function FaqAdminManager() {
  const [pending, setPending] = useState<Faq[]>([]);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);

  // Charger les questions en attente
  const fetchPending = async () => {
    const res = await fetch("/api/faqs/pending");
    if (res.ok) setPending(await res.json());
  };

  useEffect(() => { fetchPending(); }, []);

  // Enregistrer une réponse
  const handleAnswer = async (id: string) => {
    const answer = answers[id]?.trim();
    if (!answer) return alert("Veuillez saisir une réponse.");
    setLoading(true);
    const res = await fetch(`/api/faqs/${id}/answer`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    });
    setLoading(false);
    if (res.ok) {
      setAnswers((a) => { const c = { ...a }; delete c[id]; return c; });
      fetchPending();
    } else {
      const err = await res.json();
      alert(err.error || "Erreur");
    }
  };

  if (pending.length === 0) {
    return <p className="text-gray-500">Aucune question en attente.</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Questions en attente</h2>
      {pending.map((q) => (
        <div key={q.id} className="p-4 bg-white rounded shadow">
          <div className="text-gray-800 mb-2">{q.question}</div>
          <textarea
            rows={3}
            className="w-full p-2 border rounded mb-2"
            placeholder="Votre réponse…"
            value={answers[q.id] ?? ""}
            onChange={(e) =>
              setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
            }
          />
          <button
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
            onClick={() => handleAnswer(q.id)}
          >
            {loading ? "Envoi…" : "Répondre"}
          </button>
        </div>
      ))}
    </div>
  );
}
