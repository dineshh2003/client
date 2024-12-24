import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware'

const PROTECTED_ROUTES = new Set(['/dashboard', '/storeorders', '/createorder', '/billing', '/forward-order', '/reverse-order', '/ndr', '/post-shipping', '/insights', '/weight-module', '/store-integration', '/addstore', '/settings'])
const AUTH_PAGES = new Set(['/login', '/register'])
const TOKEN_CACHE = new Map()
const CACHE_DURATION = 60000 // 1 minute

export const config = {
  matcher: Array.from(PROTECTED_ROUTES),
  experimental: { allowCrossOrigin: true }
}

const getTokenWithCache = async (req: NextRequestWithAuth) => {
  const now = Date.now()
  const cached = TOKEN_CACHE.get(req.url)
  if (cached && now - cached.timestamp < CACHE_DURATION) return cached.token
  
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  TOKEN_CACHE.set(req.url, { token, timestamp: now })
  return token
}

export default async function middleware(req: NextRequestWithAuth) {
  const path = req.nextUrl.pathname
  const token = await getTokenWithCache(req)

  if (!token) return path === '/' || PROTECTED_ROUTES.has(path) 
    ? NextResponse.redirect(new URL(`/login${path !== '/' ? `?callbackUrl=${path}` : ''}`, req.url))
    : NextResponse.next()

  return AUTH_PAGES.has(path)
    ? NextResponse.redirect(new URL('/dashboard', req.url))
    : NextResponse.next()
}