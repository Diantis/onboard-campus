// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = await verifyToken(token);

    if (pathname === "/agenda" && decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/agenda/public", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.warn("❌ JWT invalide:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/profil",
    "/agenda",
    "/map",
    "/services",
    "/documents",
    "/faq",
    "/notifications",
    "/settings",
  ],
};
