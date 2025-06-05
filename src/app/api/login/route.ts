import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "@/lib/auth";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.student.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json({ error: "Email inconnu" }, { status: 401 });

    const isValid = await compare(password, user.password);
    if (!isValid)
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 },
      );

    const token = await generateToken({
      id: user.id,
      role: user.role,
      email: user.email,
    });

    const response = NextResponse.json({ success: true });
    response.headers.set(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      }),
    );

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
