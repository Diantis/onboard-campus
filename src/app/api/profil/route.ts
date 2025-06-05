import { PrismaClient } from "@prisma/client";
import type { Student } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const decoded = (await verifyToken(token)) as { id: number };
    const student = await prisma.student.findUnique({
      where: { id: decoded.id },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Aucun profil trouvé" },
        { status: 404 },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _unused, ...safeStudent } = student;
    return NextResponse.json(safeStudent);
  } catch (error) {
    console.error("Erreur GET profil :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const decoded = (await verifyToken(token)) as { id: number };
    const body = await req.json();
    const { phone, address, email: newEmail, password, avatarUrl } = body;

    const dataToUpdate: Partial<Student> = {
      phone,
      address,
      email: newEmail,
      avatarUrl,
    };

    if (password) {
      dataToUpdate.password = await hash(password, 10);
    }

    const updated = await prisma.student.update({
      where: { id: decoded.id },
      data: dataToUpdate,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _unused, ...safeUpdated } = updated;
    return NextResponse.json(safeUpdated);
  } catch (error) {
    console.error("Erreur PUT profil :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
