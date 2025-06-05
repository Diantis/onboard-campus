"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function LoginSignupCard() {
  const id = useId();
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [ine, setIne] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isSignUp ? "/api/register" : "/api/login";
    const payload = isSignUp
      ? { name, email, password, ine, year, course }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log(`[${endpoint}] Status:`, res.status);

      if (res.ok) {
        const data = await res.json();
        console.log("✅ Réponse API:", data);
        router.push("/profil");
      } else {
        const err = await res.json();
        console.warn("❌ Erreur API:", err);
        setError(err?.error || "Erreur inconnue");
      }
    } catch (err) {
      console.error("Erreur réseau:", err);
      setError("Erreur de connexion au serveur");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mt-16 mx-auto rounded-xl border p-6 shadow-md space-y-6 bg-white dark:bg-zinc-900">
      <div className="flex flex-col items-center gap-2">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full border">
          <Image
            src="/Logo_Campus.png"
            width={128}
            height={128}
            alt="Logo Campus"
            className="rounded-full object-cover border-4 border-background shadow-lg w-full h-full"
            priority
          />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            {isSignUp
              ? "Create your student account"
              : "Welcome to Onboarding Campus"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isSignUp
              ? "Enter your details to sign up."
              : "Enter your credentials to login to your account."}
          </p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-4">
          {isSignUp && (
            <>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-name`}>Full Name</Label>
                <Input
                  id={`${id}-name`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-ine`}>INE</Label>
                <Input
                  id={`${id}-ine`}
                  value={ine}
                  onChange={(e) => setIne(e.target.value)}
                />
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-year`}>Year</Label>
                <Input
                  id={`${id}-year`}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-course`}>Course</Label>
                <Input
                  id={`${id}-course`}
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input
              id={`${id}-email`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor={`${id}-password`}>Password</Label>
            <Input
              id={`${id}-password`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {!isSignUp && (
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id={`${id}-remember`} />
              <Label
                htmlFor={`${id}-remember`}
                className="text-muted-foreground font-normal"
              >
                Remember me
              </Label>
            </div>
            <a className="text-sm underline hover:no-underline" href="#">
              Forgot password?
            </a>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? isSignUp
              ? "Création..."
              : "Connexion..."
            : isSignUp
              ? "Sign up"
              : "Sign in"}
        </Button>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      </form>

      <div className="text-center text-sm mt-4">
        {isSignUp ? "Already have an account?" : "New here?"}{" "}
        <button
          type="button"
          className="underline text-primary"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </button>
      </div>
    </div>
  );
}
