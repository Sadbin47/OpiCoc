import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NewsletterSubscribeSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp, RATE_LIMIT_PROFILES } from "@/lib/rateLimit";
import { db } from "@/db/client";

export async function POST(request: NextRequest) {
  // 1. Enforce Defensive Rate Limiting (5 subscriptions / 60s per IP)
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = checkRateLimit(`newsletter:${clientIp}`, RATE_LIMIT_PROFILES.CONTACT);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: "Too many subscription attempts. Please try again later.",
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
    const body = await request.json();
    const result = NewsletterSubscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid email address format.",
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const { subscriber, isNew } = await db.addSubscriber(email);

    return NextResponse.json({
      success: true,
      message: isNew
        ? "Subscribed successfully! You will receive new meta layout releases and updates."
        : "You are already subscribed to OPICOC updates.",
      subscriberId: subscriber.id,
      isNew,
    });
  } catch (error) {
    console.error("[api/newsletter/subscribe] Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
