import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const [result]: any = await pool.query(
    "INSERT INTO work_requests (name, email, reason) VALUES (?, ?, ?)",
    [body.name, body.email, body.reason]
  );

  if (result.affectedRows > 0) {
    return NextResponse.json({
      message: "Work request sent successfully",
    });
  }
}
