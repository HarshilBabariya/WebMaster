import pool from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // If id is there, then fetch one user
  const userId = searchParams.get("id");
  const [rows] = await pool.query("SELECT * FROM users");
  const [user] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
    userId,
  ]);
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
  const hashedPassword = await bcrypt.hash(body.password, 10);
  if (!body.name) {
    const [user]: any[] = await pool.query(
      "SELECT * FROM users WHERE email= ?",
      body.email
    );
    if (user && user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const isPasswordValid = await bcrypt.compare(
      body.password,
      user[0].password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    return NextResponse.json({ user: user[0], message: "Login successful" });
  } else {
    const [user]: any[] = await pool.query(
      "SELECT * FROM users WHERE email= ?",
      body.email
    );
    const [result]: any = await pool.query(
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
      [body.email, hashedPassword, body.name]
    );
    if (user && user.length > 0) {
      return NextResponse.json(
        { error: "User already exist." },
        { status: 400 }
      );
    }
    if (result.affectedRows > 0) {
      return NextResponse.json({
        message: "User registered successfully",
        user_id: result.insertId,
      });
    }
    return NextResponse.json(
      { error: "Registration failed, please try again." },
      { status: 500 }
    );
  }
}
