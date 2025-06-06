// src/components/FloatingMenu.tsx
"use client";
import { useState } from "react";
import { Plus, MessageCircle, Bell, Settings, FileText } from "lucide-react";
import Link from "next/link";

interface FloatingMenuProps {
  className?: string;
}

const menuItems = [
  { href: "/documents", Icon: FileText, label: "Mes documents" },
  { href: "/chat", Icon: MessageCircle, label: "Chat" },
  { href: "/notifications", Icon: Bell, label: "Notifications" },
  { href: "/settings", Icon: Settings, label: "Paramètres" },
] as const;

const angles = [210, 250, 290, 330];
const RADIUS = 100;

export function FloatingMenu({ className = "" }: FloatingMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {open &&
        menuItems.map(({ href, Icon, label }, i) => {
          const angle = angles[i];
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={`
                absolute w-14 h-14 flex items-center justify-center
                bg-muted rounded-full text-foreground shadow-md border border-border
                hover:scale-105 hover:bg-accent transition-all duration-200
              `}
              style={{
                top: "50%",
                left: "50%",
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translateX(${RADIUS}px)
                  rotate(-${angle}deg)
                `,
              }}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className={`
          w-16 h-16 bg-primary text-white rounded-full
          flex items-center justify-center shadow-lg
          transform transition-transform duration-300
          ${open ? "rotate-45" : "rotate-0"}
        `}
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
