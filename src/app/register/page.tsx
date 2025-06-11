// components/RegisterCard.tsx
"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import SwitchLanguage from "@/components/SwitchLanguage";
import { useTranslation } from "react-i18next";

export default function RegisterCard() {
  const id = useId();
  const router = useRouter();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [ine, setIne] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, ine, year, course }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const err = await res.json();
        setError(err?.error || "Erreur inconnue");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur");
    }

    setLoading(false);
  };

  return (
    <main className="px-5">
      <section className="w-full max-w-md mt-8 mx-auto rounded-xl border p-6 shadow-md space-y-6 bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-2 mb-1">
          <div className="flex shrink-0 items-center justify-center rounded-full border-2">
            <Image
              src="/Logo_Campus.svg"
              width={72}
              height={72}
              alt="Logo Campus"
              className="rounded-full object-cover border-4 border-background shadow-lg"
              priority
            />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold">{t("Login.Create")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("Login.Details")}
            </p>
          </div>
        </div>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <Label htmlFor={`${id}-name`}>{t("Login.name")}</Label>
          <Input
            id={`${id}-name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Label htmlFor={`${id}-email`}>Email</Label>
          <Input
            id={`${id}-email`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Label htmlFor={`${id}-password`}>{t("Login.Password")}</Label>
          <Input
            id={`${id}-password`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Label htmlFor={`${id}-ine`}>INE</Label>
          <Input
            id={`${id}-ine`}
            value={ine}
            onChange={(e) => setIne(e.target.value)}
          />

          <Label htmlFor={`${id}-year`}>{t("Login.Year")}</Label>
          <Input
            id={`${id}-year`}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <Label htmlFor={`${id}-course`}>{t("Login.Course")}</Label>
          <Input
            id={`${id}-course`}
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("Login.Creation") : t("Login.Up")}
          </Button>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </form>

        <div className="text-center text-sm mt-4">
          {t("Login.Account")}{" "}
          <a href="/login" className="underline text-primary">
            {t("Login.In")}
          </a>
        </div>

        <div className="flex justify-around">
          <ModeToggle />
          <SwitchLanguage />
        </div>
      </section>
    </main>
  );
}
