// src/components/DocumentCard.tsx
import Link from 'next/link'
import { Document } from '../data/documents'

interface DocumentCardProps {
  doc: Document
}

export default function DocumentCard({ doc }: DocumentCardProps) {
  return (
    <Link
      href={doc.url ?? '#'}
      aria-label={`Ouvrir le document ${doc.name}`}
      className="
        flex justify-between items-center
        p-4 bg-white rounded-lg shadow
        hover:bg-gray-50 transition
      "
    >
      <span className="font-medium text-gray-800">{doc.name}</span>
      <span className="text-sm text-gray-500">{doc.date}</span>
    </Link>
  )
}
