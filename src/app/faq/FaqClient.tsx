// src/app/faq/FaqClient.tsx
"use client";
import { useState, useEffect } from "react";
import FaqItem from "@/components/FaqItem";
import AskQuestionForm from "@/components/AskQuestionForm";
import FaqAdminManager from "@/components/FaqAdminManager";
import { useUser } from "@/hooks/useUser";

type Faq = { id: string; question: string; answer: string };

export default function FaqClient() {
  const user = useUser();
  const [faqs, setFaqs] = useState<Faq[]>([]);

  const load = async () => {
    const res = await fetch("/api/faqs");
    if (res.ok) setFaqs(await res.json());
  };
  useEffect(() => { load(); }, []);

  if (user === undefined) {
    return <p className="text-black">Chargement…</p>;
  }
  if (user?.role === "ADMIN") {
    return <FaqAdminManager />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6">FAQ</h1>
      {faqs.map((f) => (
        <FaqItem key={f.id} question={f.question} answer={f.answer} />
      ))}
      <AskQuestionForm onSuccess={load} />
    </div>
  );
}
