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
  useEffect(() => {
    load();
  }, []);

  if (user === undefined) {
    return <p className="text-black">Chargement…</p>;
  }
  if (user?.role === "ADMIN") {
    return <FaqAdminManager />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <h1 className="ml-5 sm:ml-10 mt-6 text-2xl font-bold">FAQ</h1>
      <main className="px-4 sm:px-6 md:px-10 py-6 flex-1 flex flex-col justify-start space-y-8">
        {faqs.map((f) => (
          <FaqItem key={f.id} question={f.question} answer={f.answer} />
        ))}
        <AskQuestionForm onSuccess={load} />
      </main>
    </div>
  );
}
