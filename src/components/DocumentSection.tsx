// File: components/DocumentSection.tsx
import { ReactNode } from 'react';
import DocumentCard from './DocumentCard';
import { Document } from '../data/documents';

interface DocumentSectionProps {
  title: string;
  docs: Document[];
}

export default function DocumentSection({ title, docs }: DocumentSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
      <div className="space-y-2">
        {docs.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>
    </section>
  );
}