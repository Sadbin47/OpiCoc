import type { NextRequest } from "next/server";
import { baseLinksController } from "@/controllers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return baseLinksController.handleGetBaseLinks(request, id);
}
