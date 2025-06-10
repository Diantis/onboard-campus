// src/components/AskQuestionForm.tsx
"use client";
import { useState } from "react";

export default function AskQuestionForm() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q.trim() }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setQ("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Posez votre question</h2>
      <textarea
        className="w-full p-2 border rounded resize-none"
        rows={3}
        placeholder="Votre question…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="mt-2 flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {status === "sending" ? "Envoi…" : "Envoyer"}
        </button>
        {status === "sent" && <span className="text-green-600">Merci !</span>}
        {status === "error" && <span className="text-red-600">Erreur…</span>}
      </div>
    </form>
  );
}
