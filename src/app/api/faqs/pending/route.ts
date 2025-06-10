// src/app/api/faqs/pending/route.ts
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

export async function GET(req: NextRequest) {
  // vérification JWT + rôle ADMIN
  const auth = await verifyJWT(req);
  if ((auth as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const pending = await prisma.faqQuestion.findMany({
    where: { answer: null },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(pending);
}
