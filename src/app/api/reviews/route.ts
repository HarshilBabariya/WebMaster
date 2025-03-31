import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const [reviews] = await pool.query("SELECT * FROM reviews");
  return NextResponse.json({ reviews });
}
