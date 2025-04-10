import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';

interface RegisterResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, mot de passe et nom requis' },
        { status: 400 }
      );
    }

    const result: RegisterResponse = await AuthService.register(email, password, name);

    const response = NextResponse.json(result, { status: 201 });

    response.cookies.set('auth-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 heures
    });

    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
} 