// src/app/api/profil/route.ts

import { PrismaClient } from "@prisma/client";
import type { Student } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

// Get authenticated user's profile
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = (await verifyToken(token)) as { id: number };
    const student = await prisma.student.findUnique({
      where: { id: decoded.id },
    });

    if (!student) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _unused, ...safeStudent } = student;
    return NextResponse.json(safeStudent);
  } catch (error) {
    console.error("GET profile error :", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Update authenticated user's profile
export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      dataToUpdate.password = await hash(password, 10); // Hash new password before saving
    }

    const updated = await prisma.student.update({
      where: { id: decoded.id },
      data: dataToUpdate,
    });

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _unused, ...safeUpdated } = updated;
    return NextResponse.json(safeUpdated);
  } catch (error) {
    console.error("PUT profile error :", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
