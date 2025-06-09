// src/hooks/useUser.ts
"use client";

import { useState, useEffect } from "react";

export type User = {
  id: number;
  name: string;
  role: "STUDENT" | "ADMIN";
};

export function useUser(): User | null | undefined {
  // undefined = en cours de chargement, null = pas connecté, User = connecté
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data: User | null) => {
        setUser(data); // même valeur null si non loggé
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return user;
}
