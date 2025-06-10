// src/components/FaqItem.tsx
import React from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="mb-4 bg-white rounded-lg shadow">
      <summary className="cursor-pointer p-4 text-gray-800 font-medium hover:bg-gray-50">
        {question}
      </summary>
      <div className="p-4 border-t border-gray-200 text-gray-600">
        {answer}
      </div>
    </details>
  );
}
