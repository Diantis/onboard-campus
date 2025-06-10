//src/app/api/reset-password/route.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

// Handle password reset using a token
export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  // Basic input validation
  if (!token || !password) {
    return NextResponse.json(
      { error: "Missing required data" },
      { status: 400 },
    );
  }

  try {
    // Verify and decode JWT token
    const { payload } = await jwtVerify(token, secret);
    const email = payload.email as string;

    // Hash the new password and update the user
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.student.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 },
    );
  }
}
