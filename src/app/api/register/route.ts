//src/app/api/register/route.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Handle user registration
export async function POST(req: Request) {
  try {
    const { name, email, password, ine, year, course } = await req.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if email already exists
    const existing = await prisma.student.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student record
    const student = await prisma.student.create({
      data: { name, email, password: hashedPassword, ine, year, course },
    });

    // Return minimal student info for confirmation
    return NextResponse.json(
      { success: true, student: { id: student.id, email: student.email } },
      { status: 201 },
    );
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
