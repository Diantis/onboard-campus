// src/app/api/documents/[id]/sign/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = await verifyJWT(req);
  if (payload.role !== "STUDENT") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { signature } = await req.json();
  const studentId = Number(payload.sub);
  const documentId = params.id;

  const signed = await prisma.signedDocument.upsert({
    where: { documentId_studentId: { documentId, studentId } },
    create: { documentId, studentId, signature },
    update: { signature, signedAt: new Date() },
  });
  return NextResponse.json(signed);
}
