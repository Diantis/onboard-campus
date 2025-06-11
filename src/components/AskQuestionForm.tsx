// src/components/AskQuestionForm.tsx
"use client";
import { useState } from "react";

export default function AskQuestionForm({ onSuccess }: { onSuccess: () => void }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setStatus("sending");
    const res = await fetch("/api/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q.trim() }),
    });
    if (res.ok) {
      setStatus("sent");
      setQ("");
      onSuccess();
    } else {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 p-4 bg-white rounded shadow">
      <textarea
        rows={3}
        className="w-full p-2 border rounded mb-2"
        placeholder="Posez votre question…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button
        type="submit"
        disabled={status==="sending"}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {status === "sending" ? "Envoi…" : "Envoyer"}
      </button>
      {status==="sent" && <p className="mt-2 text-green-600">Merci !</p>}
      {status==="error" && <p className="mt-2 text-red-600">Erreur…</p>}
    </form>
  );
}
