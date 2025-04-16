import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const result = await AuthService.login(email, password);

    const response = NextResponse.json(result, { status: 200 });

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