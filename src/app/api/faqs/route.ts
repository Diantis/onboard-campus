// src/app/api/faqs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // ne renvoie que les FAQs qui ont une réponse
  const faqs = await prisma.faqQuestion.findMany({
    where: { answer: { not: null } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(faqs);
}

export async function POST(req: NextRequest) {
  // nouvelle question soumise sans réponse
  const { question } = await req.json();
  if (!question || typeof question !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const created = await prisma.faqQuestion.create({
    data: { question },
  });
  return NextResponse.json(created, { status: 201 });
}
