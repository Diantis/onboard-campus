// src/components/SidebarNav.tsx
"use client";
import {
  Home,
  Calendar,
  Map,
  User,
  Handshake,
  FileText,
  MessageCircle,
  Bell,
  Settings,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  {
    href: "/",
    Icon: Home,
    label: "Accueil",
    hoverColor: "hover:text-indigo-400",
  },
  {
    href: "/profil",
    Icon: User,
    label: "Profil",
    hoverColor: "hover:text-amber-400",
  },
  {
    href: "/agenda",
    Icon: Calendar,
    label: "Agenda",
    hoverColor: "hover:text-violet-400",
  },
  {
    href: "/map",
    Icon: Map,
    label: "Plan",
    hoverColor: "hover:text-emerald-400",
  },
  {
    href: "/services",
    Icon: Handshake,
    label: "Services",
    hoverColor: "hover:text-pink-400",
  },
  {
    href: "/documents",
    Icon: FileText,
    label: "Documents",
    hoverColor: "hover:text-sky-400",
  },
  {
    href: "/chat",
    Icon: MessageCircle,
    label: "Chat",
    hoverColor: "hover:text-orange-400",
  },
  {
    href: "/notifications",
    Icon: Bell,
    label: "Notifications",
    hoverColor: "hover:text-red-500",
  },
  {
    href: "/settings",
    Icon: Settings,
    label: "Paramètres",
    hoverColor: "hover:text-lime-400",
  },
];

export function SidebarNav() {
  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-full w-20 flex-col items-center mt-10 bg-background border-r border-border p-4 gap-y-10 z-30">
      {navItems.map(({ href, Icon, label, hoverColor }) => (
        <Link href={href} key={href} className="group" aria-label={label}>
          <Icon
            className={`w-6 h-6 text-foreground transition-colors group-hover:scale-110 ${hoverColor}`}
          />
        </Link>
      ))}
    </aside>
  );
}
