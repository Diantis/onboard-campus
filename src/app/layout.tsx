// src/app/layout.tsx
import "./globals.css";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { LayoutWrapper } from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Onboarding Campus",
  description: "Application mobile d’accueil des étudiants",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let studentName = "Étudiant";

  if (token) {
    try {
      const payload = await verifyToken(token);
      const email = payload.email as string;

      if (email) {
        const student = await prisma.student.findUnique({
          where: { email },
        });
        if (student?.name) {
          studentName = student.name;
        }
      }
    } catch (err) {
      console.error("Token invalide ou expiré :", err);
    }
  }
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>
          <LayoutWrapper userName={studentName}>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
