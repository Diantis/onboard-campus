// src/app/api/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "@/lib/auth";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password, rememberMe } = await req.json();

    // Look up user by email
    const user = await prisma.student.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { error: "Unknown email address" },
        { status: 401 },
      );

    // Compare plaintext password with hashed password
    const isValid = await compare(password, user.password);
    if (!isValid)
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 },
      );

    // Set token duration based on "remember me"
    const expiration = rememberMe ? "30d" : "1d";
    const cookieMaxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;

    // Generate JWT token
    const token = await generateToken(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      expiration,
    );

    // Set token as HTTP-only cookie
    const response = NextResponse.json({ success: true });
    response.headers.set(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: cookieMaxAge,
        sameSite: "lax",
      }),
    );

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
