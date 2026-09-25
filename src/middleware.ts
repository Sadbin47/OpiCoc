import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSecurityHeaders } from "@/lib/security";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const SESSION_COOKIE = "opicoc_session";

// Routes requiring authentication
const PROTECTED_ROUTES = ["/profile", "/custom-base", "/cart/checkout"];

// Routes restricted to administrators
const ADMIN_ROUTES = ["/admin"];

// Routes reserved for unauthenticated users
const AUTH_ROUTES = ["/login", "/registration", "/reset-password", "/verify-otp"];

function applySecurityHeaders(response: NextResponse): NextResponse {
  const secHeaders = getSecurityHeaders();
  for (const [key, value] of Object.entries(secHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;

  // 1. Enforce Rate Limiting on Non-GET Authentication Submissions (Brute-force protection)
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const clientIp = getClientIp(request.headers);
  const host = request.headers.get("host") || "";
  const isLocalhost =
    clientIp === "127.0.0.1" ||
    clientIp === "::1" ||
    clientIp === "localhost" ||
    host.includes("localhost") ||
    host.includes("127.0.0.1");

  // Only apply rate limiting to mutating auth submissions (e.g. POST), never to GET page views or local development
  if (isAuthRoute && !isLocalhost && request.method !== "GET" && request.method !== "HEAD") {
    const rateLimit = checkRateLimit(`auth:${clientIp}`, { limit: 20, windowMs: 60 * 1000 });

    if (!rateLimit.success) {
      return applySecurityHeaders(
        new NextResponse(
          "Too many authentication attempts. Please wait before retrying.",
          {
            status: 429,
            headers: {
              "Retry-After": rateLimit.retryAfter.toString(),
              "X-RateLimit-Limit": rateLimit.limit.toString(),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": rateLimit.reset.toString(),
            },
          }
        )
      );
    }
  }

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

  // 2. Check Protected User Routes
  const isProtected = PROTECTED_ROUTES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected && !isAuthenticated) {
    const returnUrl = encodeURIComponent(`${pathname}${search}`);
    const loginUrl = new URL(`/login?redirectTo=${returnUrl}`, request.url);
    return applySecurityHeaders(NextResponse.redirect(loginUrl));
  }

  // 3. Check Admin Routes
  const isAdminRoute = ADMIN_ROUTES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isAdminRoute) {
    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(`${pathname}${search}`);
      return applySecurityHeaders(
        NextResponse.redirect(new URL(`/login?redirectTo=${returnUrl}`, request.url))
      );
    }
    if (!isAdmin) {
      // Forbidden: redirect non-admin to home
      return applySecurityHeaders(NextResponse.redirect(new URL("/", request.url)));
    }
  }

  // 4. Check Auth Pages for already authenticated users
  if (isAuthRoute && isAuthenticated && (pathname === "/login" || pathname === "/registration")) {
    const redirectTo = request.nextUrl.searchParams.get("redirectTo");
    if (redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
      return applySecurityHeaders(NextResponse.redirect(new URL(redirectTo, request.url)));
    }
    return applySecurityHeaders(NextResponse.redirect(new URL("/", request.url)));
  }

  return applySecurityHeaders(NextResponse.next());
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
