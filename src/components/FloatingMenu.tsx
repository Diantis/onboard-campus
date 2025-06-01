// src/components/FloatingMenu.tsx
"use client";
import { useState } from "react";
import { Plus, MessageCircle, Bell, Settings, FileText } from "lucide-react";
import Link from "next/link";

interface FloatingMenuProps {
  className?: string;
}

const menuItems = [
  { href: "/documents",     Icon: FileText,      label: "Mes documents" },
  { href: "/chat",          Icon: MessageCircle, label: "Chat"          },
  { href: "/notifications", Icon: Bell,          label: "Notifications" },
  { href: "/settings",      Icon: Settings,      label: "Paramètres"    },
] as const;

// angles originaux [150, 110, 70, 30] + 180° => [330, 290, 250, 210]
// On les réordonne pour que l'extrémité gauche soit 210° et l'extrémité droite 330°
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
              className="
                absolute w-14 h-14 flex items-center justify-center
                bg-blue-500 rounded-full text-white shadow-lg
                hover:scale-105 transition-transform
              "
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
          w-16 h-16 bg-violet-600 text-white rounded-full
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
