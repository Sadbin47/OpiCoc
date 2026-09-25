import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/db/client";

const ContactRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address format."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = ContactRequestSchema.safeParse(body);

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

    // Save to relational database
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
    console.error("[api/contact] Error processing submission:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
