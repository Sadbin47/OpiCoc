import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPurchasedBaseLayoutLinks } from "@/services/baseService";
import { checkRateLimit, getClientIp, RATE_LIMIT_PROFILES } from "@/lib/rateLimit";

const SESSION_COOKIE = "opicoc_session";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Enforce Rate Limiting
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = checkRateLimit(`links:${clientIp}`, RATE_LIMIT_PROFILES.API_DEFAULT);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: "Too many requests. Please slow down.",
        code: "RATE_LIMITED",
      },
      {
        status: 429,
        headers: {
          "Retry-After": rateLimitResult.retryAfter.toString(),
        },
      }
    );
  }

  const { id: baseId } = await params;

  // 1. Verify User Authentication
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;
  let user: { id?: string; email?: string; role?: string } | null = null;

  if (sessionCookie) {
    try {
      user = JSON.parse(decodeURIComponent(sessionCookie));
    } catch {
      user = null;
    }
  }

  if (!user || !user.email) {
    return NextResponse.json(
      {
        error: "Authentication required to access protected layout links.",
        code: "UNAUTHENTICATED",
      },
      { status: 401 }
    );
  }

  // 2. Query Protected Digital Goods Delivery
  const userId = user.id || "usr-demo-01";
  const layoutLinks = await getPurchasedBaseLayoutLinks(baseId, userId);

  if (!layoutLinks) {
    return NextResponse.json(
      {
        error: "Active purchase verification required to unlock this base layout.",
        code: "PURCHASE_REQUIRED",
      },
      { status: 403 }
    );
  }

  return NextResponse.json({
    success: true,
    baseId,
    links: layoutLinks,
  });
}
