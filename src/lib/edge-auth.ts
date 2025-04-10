import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key'
);

export class EdgeAuthService {
  static async generateToken(userId: string): Promise<string> {
    return new SignJWT({ userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(JWT_SECRET);
  }

  static async verifyToken(token: string): Promise<{ userId: string }> {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string };
  }
} 