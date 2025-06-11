// src/app/documents/DocumentListClient.tsx
"use client";

import { useState, useEffect } from "react";
import DocumentSection from "@/components/DocumentSection";
import DocumentModal from "@/components/DocumentModal";

type Doc = {
  id: string;
  name: string;
  fileUrl: string;
  category: "TO_SIGN" | "GENERAL" | "RESOURCE";
  createdAt: string;
};

export default function DocumentListClient() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [modalDoc, setModalDoc] = useState<Doc | null>(null);

  // Chargement des documents depuis l'API
  useEffect(() => {
    fetch("/api/documents")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de récupération");
        return res.json();
      })
      .then((data: Doc[]) => setDocs(data))
      .catch(console.error);
  }, []);

  // Filtrage par catégorie
  const toSign = docs.filter((d) => d.category === "TO_SIGN");
  const general = docs.filter((d) => d.category === "GENERAL");
  const resources = docs.filter((d) => d.category === "RESOURCE");

  return (
    <>
      <DocumentSection
        title="Documents à signer"
        docs={toSign.map((d) => ({
          id: d.id,
          name: d.name,
          date: new Date(d.createdAt).toLocaleDateString(),
          url: d.fileUrl,
        }))}
        onView={(doc) => {
          // Remappez au format Doc complet pour le modal
          const full = docs.find((x) => x.id === doc.id)!;
          setModalDoc(full);
        }}
      />
      <DocumentSection
        title="Documents généraux"
        docs={general.map((d) => ({
          id: d.id,
          name: d.name,
          date: new Date(d.createdAt).toLocaleDateString(),
          url: d.fileUrl,
        }))}
        onView={(doc) => {
          const full = docs.find((x) => x.id === doc.id)!;
          setModalDoc(full);
        }}
      />
      <DocumentSection
        title="Ressources"
        docs={resources.map((d) => ({
          id: d.id,
          name: d.name,
          date: new Date(d.createdAt).toLocaleDateString(),
          url: d.fileUrl,
        }))}
        onView={(doc) => {
          const full = docs.find((x) => x.id === doc.id)!;
          setModalDoc(full);
        }}
      />

      {modalDoc && (
        <DocumentModal
          doc={modalDoc}
          open={!!modalDoc}
          onClose={() => setModalDoc(null)}
        />
      )}
    </>
  );
}
