// src/app/api/documents/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const docs = await prisma.document.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(docs);
  } catch (error) {
    console.error("GET /api/documents error:", error);
    return NextResponse.json(
      { error: "Erreur de récupération des documents." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, fileUrl, category } = await req.json();
    const created = await prisma.document.create({
      data: { name, fileUrl, category },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/documents error:", error);
    return NextResponse.json(
      { error: "Impossible de créer le document." },
      { status: 500 }
    );
  }
}
