// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";


export const metadata: Metadata = {
  title: "Onboarding Campus",
  description: "Application mobile d’accueil des étudiants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
			<body>
				<Header userName="Machin" />
				<Providers>{children}</Providers>
				<BottomNav/>
			</body>
    </html>
  );
}
