import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key'
);

type UserWithoutPassword = {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  address?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
    phone: string | null;
  };
};

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

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

  static async getUserById(id: string): Promise<UserWithoutPassword | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        address: {
          select: {
            street: true,
            city: true,
            zipCode: true,
            country: true,
            phone: true,
          },
        },
      },
    });
  }

  static async login(email: string, password: string): Promise<{ user: UserWithoutPassword; token: string }> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
        address: {
          select: {
            street: true,
            city: true,
            zipCode: true,
            country: true,
            phone: true,
          },
        },
      },
    });

    if (!user || !user.password) {
      throw new Error('Identifiants invalides');
    }

    const isValid = await this.verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error('Identifiants invalides');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = await this.generateToken(user.id);

    return {
      user: userWithoutPassword,
      token,
    };
  }

  static async register(email: string, password: string, name: string): Promise<UserWithoutPassword> {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'STUDENT',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return user;
  }
} 