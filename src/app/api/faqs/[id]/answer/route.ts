// src/app/api/faqs/[id]/answer/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function PUT(request: Request) {
  try {
    // Extraction de l'ID depuis l'URL
    const url = new URL(request.url);
    const id = url.pathname.split("/")[3]; // /api/faqs/{id}/answer

    // Récupération du JWT depuis le cookie "token"
    const cookieHeader = request.headers.get("cookie") ?? "";
    const token = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { answer } = await request.json();
    if (typeof answer !== "string" || !answer.trim()) {
      return NextResponse.json({ error: "Réponse invalide" }, { status: 400 });
    }

    // Utilisation de prisma.faqQuestion (modèle Prisma)
    const updated = await prisma.faqQuestion.update({
      where: { id },
      data: { answer: answer.trim() },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/faqs/[id]/answer error:", error);
    return NextResponse.json(
      { error: "Impossible d’enregistrer la réponse." },
      { status: 500 }
    );
  }
}
