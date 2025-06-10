// src/hooks/useSignedDocs.ts
"use client";

import { useState, useEffect } from "react";

export function useSignedDocs() {
  const [signedIds, setSignedIds] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/signed-documents")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du fetch");
        return res.json();
      })
      .then((data: { documentId: string }[]) =>
        setSignedIds(data.map((item) => item.documentId))
      )
      .catch(() => setSignedIds([]));
  }, []);

  return { signedIds };
}
