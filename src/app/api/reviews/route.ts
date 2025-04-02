import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  const [reviews] = await pool.query("SELECT * FROM reviews");
  return NextResponse.json({ reviews });
}
