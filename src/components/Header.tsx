// Header.tsx
// src/components/Header.tsx
"use client";
import { Search, User } from "lucide-react";

export function Header({ userName }: { userName: string }) {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <User className="w-5 h-5" />
        <span className="text-sm font-medium">Bonjour, {userName}</span>
      </div>
      <Search className="w-5 h-5" />
    </header>
  );
}
