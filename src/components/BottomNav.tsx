// src/components/BottomNav.tsx
"use client";
import { Home, Calendar, Map, User } from "lucide-react";
import Link from "next/link";
import { FloatingMenu } from "@/components/FloatingMenu";

export function BottomNav() {
return (
	<nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border text-foreground p-2 flex justify-around items-center z-20">
	<Link href="/" className="group">
		<Home className="w-6 h-6 transition-colors text-foreground group-hover:text-sky-400" />
	</Link>
	<Link href="/agenda" className="group">
		<Calendar className="w-6 h-6 transition-colors text-foreground group-hover:text-rose-400" />
	</Link>

	{/* Ici le FloatingMenu centré avec margin-top négative */}
	<FloatingMenu className="-mt-10 flex-shrink-0" />

	<Link href="/map" className="hover:text-primary transition-colors stroke-current">
		<Map className="w-6 h-6 transition-colors text-foreground group-hover:text-emerald-400" />
	</Link>
	<Link href="/profil" className="group">
		<User className="w-6 h-6 transition-colors text-foreground group-hover:text-amber-400" />
	</Link>
	</nav>
);
}
