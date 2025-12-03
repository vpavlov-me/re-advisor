import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/',
  '/families',
  '/consultations',
  '/messages',
  '/notifications',
  '/profile',
  '/settings',
  '/payments',
  '/subscription',
  '/services',
  '/knowledge',
  '/onboarding',
  '/family-onboarding',
]

// Routes that should redirect to dashboard if authenticated
const AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
]

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/auth/callback',
  '/auth/verify-email',
  '/auth/reset-password',
  '/api/',
  '/invite/',
  '/family-invitations/',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip public routes and API routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Create response to modify cookies
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Get user session
  const { data: { user } } = await supabase.auth.getUser()

  // Check if current route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route => {
    if (route === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(route)
  })

  // Check if current route is auth route
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/auth/login', request.url)
    // Save the original URL to redirect back after login
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && user) {
    // Check for redirect parameter
    const redirectTo = request.nextUrl.searchParams.get('redirect')
    // Ensure we don't redirect to another auth route (prevent loops)
    const isRedirectToAuthRoute = redirectTo && AUTH_ROUTES.some(route => redirectTo.startsWith(route))
    const destination = (redirectTo && !isRedirectToAuthRoute) ? redirectTo : '/'
    return NextResponse.redirect(new URL(destination, request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|icons|screenshots|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
