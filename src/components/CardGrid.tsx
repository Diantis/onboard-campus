// CardGrid.tsx
// src/components/CardGrid.tsx
"use client";
import { Card } from "./Card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CardGrid() {
  return (
    <section className="px-4 flex flex-col gap-4">
      <Card color="yellow" size="md" />
      <div className="relative flex items-center gap-2">
        <ChevronLeft className="absolute left-0 z-10" />
        <Card color="rose" size="md" />
        <ChevronRight className="absolute right-0 z-10" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Card color="blue" size="sm" />
        <Card color="green" size="sm" />
        <Card color="rose" size="sm" />
      </div>
    </section>
  );
}
