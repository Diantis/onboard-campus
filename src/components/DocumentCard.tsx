// src/components/DocumentCard.tsx
import Link from "next/link";
import { Document } from "@/data/documents";

interface DocumentCardProps {
  doc: Document;
  onView?: (doc: Document) => void;
}

export default function DocumentCard({ doc, onView }: DocumentCardProps) {
  return (
    <div
      className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
      onClick={() => onView?.(doc)}
    >
      <div className="flex flex-col">
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {doc.name}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {doc.date}
        </span>
      </div>
      <Link
        href={doc.url ?? "#"}
        download
        onClick={(e) => e.stopPropagation()}
        className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        aria-label={`Télécharger ${doc.name}`}
      >
        📥
      </Link>
    </div>
  );
}
