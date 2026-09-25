import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CheckoutPayloadSchema } from "@/models";
import { checkRateLimit, getClientIp, RATE_LIMIT_PROFILES } from "@/lib/rateLimit";
import { db } from "@/db/client";
import { emailService } from "@/services/emailService";

const SESSION_COOKIE = "opicoc_session";

/**
 * Checkout & Order Processing Controller
 * Orchestrates cart checkout, user verification, order generation, and notification delivery.
 */
export async function handleCheckout(request: NextRequest): Promise<NextResponse> {
  // 1. Enforce Defensive Rate Limiting (10 checkouts / 60s per IP)
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = checkRateLimit(`checkout:${clientIp}`, RATE_LIMIT_PROFILES.CHECKOUT);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: "Too many checkout requests. Please wait a moment before trying again.",
        retryAfter: rateLimitResult.retryAfter,
      },
      {
        status: 429,
        headers: {
          "Retry-After": rateLimitResult.retryAfter.toString(),
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
        },
      }
    );
  }

  try {
    // 2. Authenticate Session
    const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;
    let user: { id?: string; email?: string; firstName?: string } | null = null;

    if (sessionCookie) {
      try {
        user = JSON.parse(decodeURIComponent(sessionCookie));
      } catch {
        user = null;
      }
    }

    if (!user || !user.email) {
      return NextResponse.json(
        { error: "Authentication required to complete checkout." },
        { status: 401 }
      );
    }

    // 2. Validate Payload
    const body = await request.json();
    const result = CheckoutPayloadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { items, paymentProvider, paymentId } = result.data;
    const userId = user.id || "usr-demo-01";

    // 3. Process Order & Register Delivered Layout Links
    const { order, deliveredLinks } = await db.createOrder({
      userId,
      items: items.map((i) => ({ baseId: i.baseId, priceCents: i.priceCents })),
      paymentProvider,
      paymentId,
    });

    // 4. Dispatch Transactional Confirmation Email
    await emailService.sendOrderConfirmationEmail(
      user.email,
      order.orderNumber,
      items.map((i) => ({ title: i.title, priceCents: i.priceCents })),
      order.totalCents
    );

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        totalCents: order.totalCents,
        deliveredLayouts: deliveredLinks,
        message: "Order placed successfully. Layout links unlocked in your profile.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[checkoutController] Error processing checkout order:", error);
    return NextResponse.json(
      { error: "Failed to process checkout order." },
      { status: 500 }
    );
  }
}
