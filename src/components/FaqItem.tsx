// src/components/FaqItem.tsx
import React from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="mb-4 bg-white dark:bg-gray-800 rounded shadow">
      <summary className="px-4 py-2 cursor-pointer font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
        {question}
      </summary>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
        {answer}
      </div>
    </details>
  );
}
