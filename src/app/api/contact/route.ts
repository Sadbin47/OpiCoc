import type { NextRequest } from "next/server";
import { contactController } from "@/controllers";

export async function POST(request: NextRequest) {
  return contactController.handleContactSubmission(request);
}
