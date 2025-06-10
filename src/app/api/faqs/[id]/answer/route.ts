// src/app/api/faqs/[id]/answer/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyJWT(req);
  if ((auth as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { answer } = await req.json();
  if (typeof answer !== "string" || !answer.trim()) {
    return NextResponse.json({ error: "Answer is required" }, { status: 400 });
  }

  const updated = await prisma.faqQuestion.update({
    where: { id: params.id },
    data: { answer: answer.trim() },
  });
  return NextResponse.json(updated);
}
