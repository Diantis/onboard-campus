// src/components/FloatingMenu.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { Plus, MessageCircle, Bell, Settings, FileText } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface FloatingMenuProps {
  className?: string;
}

const menuItems = [
  { href: "/documents", Icon: FileText, label: "Mes documents" },
  { href: "/faq", Icon: MessageCircle, label: "FAQ" },
  { href: "/notifications", Icon: Bell, label: "Notifications" },
  { href: "/settings", Icon: Settings, label: "Paramètres" },
] as const;

const angles = [210, 250, 290, 330];
const RADIUS = 100;

export function FloatingMenu({ className = "" }: FloatingMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the floating buttons by clicking outside or with ESC
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      {menuItems.map(({ href, Icon, label }, i) => {
        const angle = angles[i];
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={clsx(
              `
				absolute w-14 h-14 flex items-center justify-center
				bg-muted rounded-full text-foreground shadow-md border border-border
				transition-all duration-300 ease-out
				`,
              open
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0 pointer-events-none",
            )}
            style={{
              top: "50%",
              left: "50%",
              transform: `
					translate(-50%, -50%)
					rotate(${angle}deg)
					translateX(${RADIUS}px)
					rotate(-${angle}deg)
				`,
              transitionDelay: `${i * 50}ms`,
            }}
          >
            <Icon className="w-6 h-6" />
          </Link>
        );
      })}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className={clsx(
          `
			w-16 h-16 bg-primary text-white rounded-full
			flex items-center justify-center shadow-lg
			transform transition-transform duration-300 z-10
			`,
          open ? "rotate-45" : "rotate-0",
        )}
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
