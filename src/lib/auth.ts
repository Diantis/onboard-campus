// src/lib/auth.ts

import { SignJWT, jwtVerify, JWTPayload } from "jose";

// Encode the secret key from environment variable (required for signing and verifying tokens)
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

/**
 * Generates a signed JWT using the given payload and expiration time.
 *
 * @param payload - The data to embed in the JWT (user info, role, etc.)
 * @param expiration - Token validity duration (default: "7d")
 * @returns A signed JWT as a string
 */
export async function generateToken(
  payload: Record<string, unknown>,
  expiration: string = "7d",
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Define signing algorithm
    .setIssuedAt() // Add current timestamp to token
    .setExpirationTime(expiration) // Define token expiry
    .sign(secret); // Sign with server-side secret
}

/**
 * Verifies and decodes a JWT.
 *
 * @param token - The JWT string to verify
 * @returns The decoded payload if the token is valid
 * @throws If token is invalid or expired
 */
export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as JWTPayload;
}
