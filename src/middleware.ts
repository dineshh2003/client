// src/middleware.ts
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware'

// Define which routes to protect
export const config = {
  matcher: [
      '/dashboard',
      '/storeorders'
  ]
}

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req })
  const isAuthenticated = !!token

  // Get the pathname of the request
  const path = req.nextUrl.pathname

  // Protect routes
  if (!isAuthenticated && config.matcher.includes(path)) {
    const loginUrl = new URL('/login', req.url)
    // Add the current path as a "callbackUrl" parameter
    loginUrl.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(loginUrl)
  }

  // If user is authenticated and tries to access login/register pages
  if (isAuthenticated && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // If user is not authenticated and tries to access protected routes
  if (!isAuthenticated && path === '/') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}