// src/app/api/documents/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJWT } from "@/lib/auth";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const doc = await prisma.document.findUnique({ where: { id: params.id } });
  return doc ? NextResponse.json(doc) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = await verifyJWT(req);
  if (payload.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const data = await req.json();
  const updated = await prisma.document.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const payload = await verifyJWT(_);
  if (payload.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await prisma.document.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
