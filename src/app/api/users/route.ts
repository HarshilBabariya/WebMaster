import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
}
