import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ContactFormSchema } from "@/models";
import { checkRateLimit, getClientIp, RATE_LIMIT_PROFILES } from "@/lib/rateLimit";
import { db } from "@/db/client";

/**
 * Contact Inquiry Controller
 * Orchestrates contact message submission, rate limiting, and persistence.
 */
export async function handleContactSubmission(request: NextRequest): Promise<NextResponse> {
  // 1. Enforce Defensive Rate Limiting (5 submissions / 60s per IP)
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = checkRateLimit(`contact:${clientIp}`, RATE_LIMIT_PROFILES.CONTACT);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: "Too many contact inquiries submitted. Please slow down and try again later.",
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
    const result = ContactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed.",
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // Save to database
    const saved = await db.createContactMessage({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. Our team will get back to you shortly.",
        messageId: saved.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[contactController] Error handling contact submission:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
