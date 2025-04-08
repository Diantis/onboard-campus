// Card.tsx
// src/components/Card.tsx
"use client";
export function Card({
  color = "gray",
  size = "md",
}: {
  color: string;
  size?: "sm" | "md";
}) {
  const sizeClasses = {
    sm: "h-24 w-24",
    md: "h-36 w-full",
  };
  return (
    <div className={`rounded-xl bg-${color}-400 ${sizeClasses[size]} shadow`} />
  );
}
