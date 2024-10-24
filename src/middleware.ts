import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Clerk's default middleware
export default clerkMiddleware();

// Custom middleware to handle route protection
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = [
    "/actionorders",
    "/storeIntegration",
    "/storeorders",
  ].some(route => pathname.startsWith(route));

  const userId = req.headers.get("x-clerk-user-id");

  // Redirect if the user is not authenticated and trying to access protected routes
  if (!userId && isProtectedRoute) {
    return NextResponse.redirect(new URL("/error404", req.url));
  }

  // Proceed to the next response if authenticated or not accessing a protected route
  return NextResponse.next();
}


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};