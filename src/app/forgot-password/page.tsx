// src/app/forgot-password/page.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 mt-16 bg-slate-50 dark:bg-slate-900 rounded shadow space-y-4">
      <h1 className="text-xl font-semibold">{t("ForgotPassword.title")}</h1>
      <p className="text-sm text-muted-foreground">
        {t("ForgotPassword.description")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-8 items-center">
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading"
              ? t("ForgotPassword.sending")
              : t("ForgotPassword.sendLink")}
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/login">{t("ForgotPassword.cancel")}</Link>
          </Button>
        </div>
      </form>

      {status === "sent" && (
        <p className="text-green-600">{t("ForgotPassword.link")}</p>
      )}
      {status === "error" && (
        <p className="text-red-500">{t("ForgotPassword.error")}</p>
      )}
    </main>
  );
}
