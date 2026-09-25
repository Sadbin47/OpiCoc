import type { NextRequest } from "next/server";
import { newsletterController } from "@/controllers";

export async function POST(request: NextRequest) {
  return newsletterController.handleNewsletterSubscription(request);
}
