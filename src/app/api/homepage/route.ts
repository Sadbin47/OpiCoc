import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { DEFAULT_HOMEPAGE_CONFIG } from "@/services/homepageService";
import { HomepageConfig } from "@/types";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "db", "data", "homepage-config.json");

function readConfigFromFile(): HomepageConfig {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      return {
        hero: { ...DEFAULT_HOMEPAGE_CONFIG.hero, ...(parsed.hero || {}) },
        video: { ...DEFAULT_HOMEPAGE_CONFIG.video, ...(parsed.video || {}) },
        showdown: { ...DEFAULT_HOMEPAGE_CONFIG.showdown, ...(parsed.showdown || {}) },
      };
    }
  } catch (error) {
    console.error("[api/homepage] Failed to read config from file", error);
  }
  return DEFAULT_HOMEPAGE_CONFIG;
}

function writeConfigToFile(config: HomepageConfig): boolean {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(config, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("[api/homepage] Failed to write config to file", error);
    return false;
  }
}

export async function GET() {
  const config = readConfigFromFile();
  return NextResponse.json({ success: true, config });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    const current = readConfigFromFile();
    const updated: HomepageConfig = {
      hero: { ...current.hero, ...(body.hero || {}) },
      video: { ...current.video, ...(body.video || {}) },
      showdown: { ...current.showdown, ...(body.showdown || {}) },
    };

    const written = writeConfigToFile(updated);
    if (!written) {
      return NextResponse.json({ success: false, message: "Failed to persist configuration" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Homepage configuration published successfully.",
      config: updated,
    });
  } catch (error) {
    console.error("[api/homepage] Error saving config", error);
    return NextResponse.json({ success: false, message: "Server error updating homepage" }, { status: 500 });
  }
}
