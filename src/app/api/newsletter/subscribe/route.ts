import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/db/client";

const SubscribeSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = SubscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid email address.",
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
