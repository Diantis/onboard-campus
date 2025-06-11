// src/components/DocumentSection.tsx
import DocumentCard from "./DocumentCard";
import { Document } from "@/data/documents";

interface DocumentSectionProps {
  title: string;
  docs: Document[];
  onView?: (doc: Document) => void;
}

export default function DocumentSection({
  title,
  docs,
  onView,
}: DocumentSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
      <div className="space-y-2">
        {docs.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} onView={onView} />
        ))}
      </div>
    </section>
  );
}
