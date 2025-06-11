// src/app/reset-password/page.tsx

"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  /**
   * Sends new password and token to the API.
   * If successful, redirects to login page.
   */
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
    <main className="max-w-md mx-auto p-6 mt-16 bg-slate-50 dark:bg-slate-900 rounded shadow space-y-4">
      <h1 className="text-xl font-semibold">{t("Reset.title")}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="password">{t("Reset.label")}</Label>
          <Input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? t("Reset.loading") : t("Reset.submit")}
        </Button>
      </form>

      {status === "error" && <p className="text-red-500">{t("Reset.error")}</p>}
    </main>
  );
}
