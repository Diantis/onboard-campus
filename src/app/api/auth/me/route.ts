// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(null, { status: 200 });
  }
  try {
    const payload = await verifyToken(token);
    // on renvoie juste ce qui nous intéresse côté client
    const user = { id: Number(payload.sub), role: payload.role, name: payload.name as string };
    return NextResponse.json(user);
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
