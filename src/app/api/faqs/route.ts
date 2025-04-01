import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const [faqs] = await pool.query("SELECT * FROM faqs");
  return NextResponse.json({ faqs });
}
