// src/app/api/logout/route.ts

import { NextResponse } from "next/server";
import { serialize } from "cookie";

// Handle logout by clearing the auth token cookie
export async function POST() {
  const response = new NextResponse("Logged out", { status: 200 });
  response.headers.set(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0), // Immediately expire the cookie
    }),
  );
  return response;
}
