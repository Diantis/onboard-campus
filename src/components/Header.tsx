// src/components/Header.tsx

"use client";

import { Search } from "lucide-react";
import Image from "next/image";

export function Header({ userName }: { userName: string }) {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-sm border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src="/Logo_Campus.png"
          width={72}
          height={72}
          alt="Logo Campus"
          className="rounded-full object-cover border-2 border-muted shadow"
          priority
        />
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Bienvenue</span>
          <span className="text-base font-semibold text-foreground">
            {userName}
          </span>
        </div>
      </div>
      <button
        className="p-2 rounded-full hover:bg-muted transition-colors"
        aria-label="Recherche"
      >
        <Search className="w-5 h-5 text-muted-foreground" />
      </button>
    </header>
  );
}
