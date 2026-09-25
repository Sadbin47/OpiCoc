import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { BaseProduct, BaseLayoutLink, TownHallLevel } from "@/types";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "db", "data", "bases.json");

function readBasesFromFile(): (BaseProduct & { links: BaseLayoutLink[] })[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("[api/bases] Failed to read bases from file", error);
  }
  return [];
}

function writeBasesToFile(bases: (BaseProduct & { links: BaseLayoutLink[] })[]): boolean {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(bases, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("[api/bases] Failed to write bases to file", error);
    return false;
  }
}

export async function GET(req: NextRequest) {
  const bases = readBasesFromFile();
  const searchParams = req.nextUrl.searchParams;
  const includeLinks = searchParams.get("includeLinks") === "true";

  if (includeLinks) {
    return NextResponse.json({ success: true, count: bases.length, bases });
  }

  // Public sanitized version without sensitive Supercell layout links
  const sanitized = bases.map((base) => ({
    id: base.id,
    title: base.title,
    price: base.price,
    badge: base.badge,
    description: base.description,
    townHall: base.townHall,
    townHallLevel: base.townHallLevel,
    productImage: base.productImage,
    createdBy: base.createdBy,
    maxSell: base.maxSell,
    seasonStartDate: base.seasonStartDate,
    seasonEndDate: base.seasonEndDate,
    validityDays: base.validityDays,
  }));
  return NextResponse.json({ success: true, count: sanitized.length, bases: sanitized });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || !body.title) {
      return NextResponse.json({ success: false, message: "Invalid base data" }, { status: 400 });
    }

    const currentBases = readBasesFromFile();
    let saved: BaseProduct & { links: BaseLayoutLink[] };

    const baseIndex = body.id ? currentBases.findIndex((b) => b.id === body.id) : -1;

    if (baseIndex !== -1) {
      // Update existing
      const existing = currentBases[baseIndex];
      saved = {
        ...existing,
        ...body,
        links: body.links || existing.links || [],
      };
      currentBases[baseIndex] = saved;
    } else {
      // Create new
      const newId = body.id || `base_${Date.now()}`;
      saved = {
        id: newId,
        title: body.title,
        price: Number(body.price) || 35,
        badge: body.badge || "1x1",
        description: body.description || "Pro tested layout.",
        townHall: body.townHall || "Town Hall 18",
        townHallLevel: (Number(body.townHallLevel) || 18) as TownHallLevel,
        productImage: body.productImage || "https://iili.io/q6Fiihu.md.png",
        createdBy: body.createdBy || "OPICOC Pro Builders",
        maxSell: Number(body.maxSell) || 100,
        seasonStartDate: body.seasonStartDate || new Date().toISOString(),
        seasonEndDate: body.seasonEndDate || new Date(Date.now() + 60 * 86400000).toISOString(),
        validityDays: Number(body.validityDays) || 60,
        links: body.links || [
          {
            id: `link-${Date.now()}-1`,
            label: "Layout 1 (Main Base)",
            url: "https://link.clashofclans.com/en/?action=OpenLayout&id=OPICOC-DEFAULT",
          },
        ],
      };
      currentBases.unshift(saved);
    }

    writeBasesToFile(currentBases);

    return NextResponse.json({
      success: true,
      message: `Successfully saved "${saved.title}".`,
      base: saved,
      totalCount: currentBases.length,
    });
  } catch (error) {
    console.error("[api/bases] Error saving base", error);
    return NextResponse.json({ success: false, message: "Server error saving base" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Base ID required" }, { status: 400 });
    }

    const currentBases = readBasesFromFile();
    const updated = currentBases.filter((b) => b.id !== id);

    writeBasesToFile(updated);

    return NextResponse.json({
      success: true,
      message: "Base deleted successfully.",
      totalCount: updated.length,
    });
  } catch (error) {
    console.error("[api/bases] Error deleting base", error);
    return NextResponse.json({ success: false, message: "Server error deleting base" }, { status: 500 });
  }
}
