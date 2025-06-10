//src/app/api/forgot-password/route.ts

import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function generateResetToken(email: string) {
  return await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  const user = await prisma.student.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur introuvable" },
      { status: 404 },
    );
  }

  const token = await generateResetToken(email);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const resetLink = `${siteUrl}/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: "support@onboarding-campus.resend.dev",
      to: email,
      subject: "Réinitialisation de mot de passe",
      html: `<p>Bonjour ${user.name},</p><p><a href="${resetLink}">Cliquez ici pour réinitialiser votre mot de passe</a></p><p>Valable 15 minutes.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur email:", err);
    return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
  }
}
