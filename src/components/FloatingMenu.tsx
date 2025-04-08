// FloatingMenu.tsx
// src/components/FloatingMenu.tsx
"use client";
import { useState } from "react";
import { Plus, MessageCircle, Bell, Settings } from "lucide-react";
import Link from "next/link";

export function FloatingMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-16 right-4 z-30">
      {open && (
        <div className="flex flex-col items-end gap-2 mb-2 transition-all duration-300">
          <Link href="/chat">
            <button className="bg-blue-500 p-3 rounded-full text-white shadow hover:scale-105">
              <MessageCircle className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/notifications">
            <button className="bg-blue-500 p-3 rounded-full text-white shadow hover:scale-105">
              <Bell className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/settings">
            <button className="bg-blue-500 p-3 rounded-full text-white shadow hover:scale-105">
              <Settings className="w-4 h-4" />
            </button>
          </Link>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 bg-violet-600 text-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
