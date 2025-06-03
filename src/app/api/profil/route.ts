// src/app/api/profil/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: récupère le profil
export async function GET() {
  try {
    const email = "truc.muche@example.com";
    const student = await prisma.student.findUnique({ where: { email } });

    if (!student) {
      return NextResponse.json(
        { error: "Aucun profil trouvé" },
        { status: 404 },
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du profil :",
      JSON.stringify(error, null, 2),
    );
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT: met à jour le profil
export async function PUT(req: Request) {
  try {
    const {
      phone,
      address,
      email: newEmail,
      password,
      avatarUrl,
    } = await req.json();
    const email = "truc.muche@example.com"; // Même email que pour le GET
    const updated = await prisma.student.update({
      where: { email },
      data: { phone, address, email: newEmail, password, avatarUrl },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
