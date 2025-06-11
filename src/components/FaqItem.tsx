// src/components/FaqItem.tsx
import React from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}
export default function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="mb-4 bg-white rounded shadow">
      <summary className="px-4 py-2 cursor-pointer font-medium text-gray-800 hover:bg-gray-50">
        {question}
      </summary>
      <div className="p-4 border-t text-gray-600">{answer}</div>
    </details>
  );
}
