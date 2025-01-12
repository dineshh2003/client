// import { NextResponse } from 'next/server'
// import { getToken } from 'next-auth/jwt'
// import { NextRequestWithAuth } from 'next-auth/middleware'

// const PROTECTED_ROUTES = new Set(['/dashboard', '/storeorders', '/createorder', '/billing', '/forward-order', '/reverse-order', '/ndr', '/post-shipping', '/insights', '/weight-module', '/store-integration', '/addstore', '/settings'])
// const AUTH_PAGES = new Set(['/login', '/register'])
// const TOKEN_CACHE = new Map()
// const CACHE_DURATION = 60000 // 1 minute

// export const config = {
//   matcher: Array.from(PROTECTED_ROUTES),
//   experimental: { allowCrossOrigin: true }
// }

// const getTokenWithCache = async (req: NextRequestWithAuth) => {
//   const now = Date.now()
//   const cached = TOKEN_CACHE.get(req.url)
//   if (cached && now - cached.timestamp < CACHE_DURATION) return cached.token
  
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
//   TOKEN_CACHE.set(req.url, { token, timestamp: now })
//   return token
// }

// export default async function middleware(req: NextRequestWithAuth) {
//   const path = req.nextUrl.pathname
//   const token = await getTokenWithCache(req)

//   if (!token) return path === '/' || PROTECTED_ROUTES.has(path) 
//     ? NextResponse.redirect(new URL(`/login${path !== '/' ? `?callbackUrl=${path}` : ''}`, req.url))
//     : NextResponse.next()

//   return AUTH_PAGES.has(path)
//     ? NextResponse.redirect(new URL('/dashboard', req.url))
//     : NextResponse.next()
// }


import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware'

// Define protected routes that require authentication
const PROTECTED_ROUTES = new Set([
  '/dashboard', 
  '/storeorders', 
  '/createorder', 
  '/billing', 
  '/forward-order', 
  '/reverse-order', 
  '/ndr', 
  '/post-shipping', 
  '/insights', 
  '/weight-module', 
  '/store-integration', 
  '/addstore', 
  '/settings'
])

// Define authentication pages
const AUTH_PAGES = new Set(['/login', '/register'])

// Token caching configuration
const TOKEN_CACHE = new Map()
const CACHE_DURATION = 60000 // 1 minute

export const config = {
  matcher: Array.from(PROTECTED_ROUTES),
  experimental: { allowCrossOrigin: true }
}

// Helper function to get cached token
const getTokenWithCache = async (req: NextRequestWithAuth) => {
  const now = Date.now()
  const cached = TOKEN_CACHE.get(req.url)
  
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.token
  }
  
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  })
  
  TOKEN_CACHE.set(req.url, { 
    token, 
    timestamp: now 
  })
  
  return token
}

export default async function middleware(req: NextRequestWithAuth) {
  const path = req.nextUrl.pathname
  const token = await getTokenWithCache(req)

  // Handle unauthenticated users
  if (!token) {
    // If accessing protected routes, redirect to home page
    if (PROTECTED_ROUTES.has(path)) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    // Allow access to public routes
    return NextResponse.next()
  }

  // Handle authenticated users
  if (AUTH_PAGES.has(path)) {
    // Redirect to dashboard if trying to access auth pages while logged in
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Allow access to all other routes for authenticated users
  return NextResponse.next()
}