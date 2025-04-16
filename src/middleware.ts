import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { EdgeAuthService } from './lib/edge-auth';

export async function middleware(request: NextRequest) {
  // Liste des routes publiques
  const publicRoutes = ['/', '/auth/login'];
  
  // Vérifier si la route actuelle est publique
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    await EdgeAuthService.verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Configuration des routes à protéger
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 