// src/app/reset-password/page.tsx
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setStatus("loading");

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      setStatus("success");
      router.push("/login");
    } else {
      setStatus("error");
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 mt-16 bg-white dark:bg-zinc-900 rounded shadow space-y-4">
      <h1 className="text-xl font-semibold">Nouveau mot de passe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "En cours..." : "Valider"}
        </Button>
      </form>
      {status === "error" && (
        <p className="text-red-500">Lien expiré ou invalide.</p>
      )}
    </main>
  );
}
