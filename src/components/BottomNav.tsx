// src/components/BottomNav.tsx
"use client";
import { Home, Calendar, Map, User } from "lucide-react";
import Link from "next/link";
import { FloatingMenu } from "@/components/FloatingMenu";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around items-center z-20">
      <Link href="/">
        <Home className="w-6 h-6" />
      </Link>
      <Link href="/agenda">
        <Calendar className="w-6 h-6" />
      </Link>

      {/* Ici le FloatingMenu centré avec margin-top négative */}
      <FloatingMenu className="-mt-10 flex-shrink-0" />

      <Link href="/map">
        <Map className="w-6 h-6" />
      </Link>
      <Link href="/profil">
        <User className="w-6 h-6" />
      </Link>
    </nav>
  );
}
