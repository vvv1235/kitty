import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  
  // Rotas públicas que não precisam de autenticação
  const publicPaths = ['/', '/login', '/signup']
  
  // Rotas protegidas que exigem autenticação
  const protectedPaths = [
    '/dashboard',
    '/dashboard/',
    '/dashboard/announce-pet',
    '/dashboard/settings'
  ]

  // Se for uma rota pública, permite acesso
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    // Permitir acesso à página inicial
    if (request.nextUrl.pathname === '/' && !request.cookies.get('kitty-auth-token')) {
      return NextResponse.next()
    }
    return NextResponse.next()
  }

  // Se for uma rota protegida, verifica autenticação
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    const token = request.cookies.get('kitty-auth-token') 
    if (!token) {
      // Redireciona para login se não estiver autenticado
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
}