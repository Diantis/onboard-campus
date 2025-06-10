// src/app/login/page.tsx
"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import SwitchLanguage from "@/components/SwitchLanguage";
import { useTranslation } from "react-i18next";

export default function LoginCard() {
  const id = useId();
  const router = useRouter();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (res.ok) {
        router.push("/profil");
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
      <section className="w-full max-w-md mt-16 mx-auto rounded-xl border p-6 shadow-md space-y-6 bg-white dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-2">
          <div className="flex shrink-0 items-center justify-center rounded-full border-2 mb-2">
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
            <h2 className="text-lg font-semibold">{t("Login.Welcome")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("Login.Credentials")}
            </p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input
              id={`${id}-email`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${id}-password`}>{t("Login.Password")}</Label>
            <Input
              id={`${id}-password`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`${id}-remember`}
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
              />
              <Label
                htmlFor={`${id}-remember`}
                className="text-muted-foreground font-normal"
              >
                {t("Login.Remember")}
              </Label>
            </div>
            <a
              className="text-sm underline hover:no-underline"
              href="/forgot-password"
            >
              {t("Login.Forgot")}
            </a>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("Login.Connexion") : t("Login.In")}
          </Button>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </form>

        <div className="text-center text-sm mt-4">
          {t("Login.New")}{" "}
          <a href="/register" className="underline text-primary">
            {t("Login.Up")}
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
