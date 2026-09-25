import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPurchasedBaseLayoutLinks } from "@/services/baseService";

const SESSION_COOKIE = "opicoc_session";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
