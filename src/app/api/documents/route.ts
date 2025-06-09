// src/app/api/documents/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

export async function GET() {
  const docs = await prisma.document.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(docs);
}

export async function POST(req: NextRequest) {
  const payload = await verifyJWT(req);
  if (payload.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { name, fileUrl, category } = await req.json();
  const doc = await prisma.document.create({ data: { name, fileUrl, category } });
  return NextResponse.json(doc);
}
