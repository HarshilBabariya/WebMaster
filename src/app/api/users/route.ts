import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // If id is there, then fetch one user
  const userId = searchParams.get("id");
  const [rows] = await pool.query("SELECT * FROM users");
  const [user] = await pool.query("SELECT * FROM users WHERE user_id = ?", [userId]);
  if (userId) {
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user: user });
  } else {
    return NextResponse.json({ users: rows });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.email || !body.password) {
    return NextResponse.json(
      { error: "User details are required" },
      { status: 400 }
    );
  }
  const [user]: any[] = await pool.query("SELECT * FROM users WHERE email= ? and password= ?", [body.email, body.password]);
  if (user && user.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user: user[0], message: "Login successfully" });
}