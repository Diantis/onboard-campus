// src/app/api/faqs/pending/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    // Récupère le token JWT depuis le cookie "token"
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

    const pending = await prisma.faqQuestion.findMany({
      where: { answer: null },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(pending);
  } catch (error) {
    console.error("GET /api/faqs/pending error:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les questions en attente." },
      { status: 500 },
    );
  }
}
