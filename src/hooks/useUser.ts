// src/hooks/useUser.ts
"use client";
import { useState, useEffect } from "react";

export type User = { id: number; name: string; role: "STUDENT" | "ADMIN" };

export function useUser(): User | null | undefined {
  const [u, setU] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setU(data))
      .catch(() => setU(null));
  }, []);
  return u;
}
