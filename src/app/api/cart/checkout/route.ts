import type { NextRequest } from "next/server";
import { checkoutController } from "@/controllers";

export async function POST(request: NextRequest) {
  return checkoutController.handleCheckout(request);
}
