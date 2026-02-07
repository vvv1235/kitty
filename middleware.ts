// middleware.ts (substitua todo o conteúdo)
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { CookieOptions } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Força refresh e pega user (mais confiável em middleware)
  const { data: { user } } = await supabase.auth.getUser()

  const pathname = req.nextUrl.pathname

  const isPublicPath =
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup')

  const isProtectedPath = pathname.startsWith('/dashboard')

  // Logado em rota pública → vai pro dashboard
  if (user && isPublicPath) {
    console.log('Redirecting logged user from public to dashboard')
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Não logado em rota protegida → vai pro login
  if (!user && isProtectedPath) {
    console.log('Redirecting unauthenticated to login from:', pathname)
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}