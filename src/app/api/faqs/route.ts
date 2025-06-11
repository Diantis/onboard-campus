// src/app/api/faqs/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const faqs = await prisma.faqQuestion.findMany({
      where: { answer: { not: null } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("GET /api/faqs error:", error);
    return NextResponse.json(
      { error: "Erreur de récupération" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    if (typeof question !== "string" || !question.trim()) {
      return NextResponse.json({ error: "Question invalide" }, { status: 400 });
    }
    const created = await prisma.faqQuestion.create({
      data: { question: question.trim() },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/faqs error:", error);
    return NextResponse.json(
      { error: "Impossible de créer la question." },
      { status: 500 },
    );
  }
}
