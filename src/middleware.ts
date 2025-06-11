// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

/**
 * Middleware to protect routes by verifying JWT token stored in cookies.
 * Redirects to login if token is missing or invalid.
 * Restricts access to certain routes based on user role.
 */
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // If no token is found, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify JWT validity
    const decoded = await verifyToken(token);

    // Only allow users with ADMIN role to access /agenda
    if (pathname === "/agenda" && decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/agenda/public", req.url));
    }

    // Proceed if everything is valid
    return NextResponse.next();
  } catch (err) {
    // Token invalid or expired, redirect to login
    console.warn("❌ Invalid JWT:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

/**
 * Paths that require middleware protection.
 * All paths listed here will be intercepted by the middleware.
 */
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
