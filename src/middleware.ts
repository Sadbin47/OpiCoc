import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "opicoc_session";

// Routes requiring authentication
const PROTECTED_ROUTES = ["/profile", "/custom-base", "/cart/checkout"];

// Routes restricted to administrators
const ADMIN_ROUTES = ["/admin"];

// Routes reserved for unauthenticated users
const AUTH_ROUTES = ["/login", "/registration"];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;

  let user: { id?: string; role?: string; email?: string } | null = null;

  if (sessionCookie) {
    try {
      user = JSON.parse(decodeURIComponent(sessionCookie));
    } catch {
      user = null;
    }
  }

  const isAuthenticated = Boolean(user && user.email);
  const isAdmin = user?.role === "admin";

  // 1. Check Protected User Routes
  const isProtected = PROTECTED_ROUTES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected && !isAuthenticated) {
    const returnUrl = encodeURIComponent(`${pathname}${search}`);
    const loginUrl = new URL(`/login?redirectTo=${returnUrl}`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Check Admin Routes
  const isAdminRoute = ADMIN_ROUTES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isAdminRoute) {
    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(`${pathname}${search}`);
      return NextResponse.redirect(new URL(`/login?redirectTo=${returnUrl}`, request.url));
    }
    if (!isAdmin) {
      // Forbidden: redirect non-admin to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 3. Check Auth Pages (Login/Register) for already authenticated users
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthRoute && isAuthenticated) {
    // If user arrived with a target redirect, honor it
    const redirectTo = request.nextUrl.searchParams.get("redirectTo");
    if (redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (/assets/*)
     */
    "/((?!_next/static|_next/image|favicon.ico|assets/).*)",
  ],
};
