//src/app/api/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const email = payload.email as string;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.student.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Token invalide ou expiré" },
      { status: 400 },
    );
  }
}
