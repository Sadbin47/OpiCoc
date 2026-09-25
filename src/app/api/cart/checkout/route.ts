import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/db/client";
import { emailService } from "@/services/emailService";

const SESSION_COOKIE = "opicoc_session";

const CheckoutItemSchema = z.object({
  baseId: z.string(),
  priceCents: z.number().int().positive(),
  title: z.string(),
});

const CheckoutPayloadSchema = z.object({
  items: z.array(CheckoutItemSchema).min(1, "Cart must contain at least one item."),
  paymentProvider: z.enum(["STRIPE", "PAYPAL", "SIMULATED"]).default("SIMULATED"),
  paymentId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate Session
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
    console.error("[api/cart/checkout] Error:", error);
    return NextResponse.json(
      { error: "Failed to process checkout order." },
      { status: 500 }
    );
  }
}
