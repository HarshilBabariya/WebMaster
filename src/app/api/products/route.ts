import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const [products]: any[] = await pool.query("SELECT * FROM products");
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    name,
    description,
    images,
    price,
    discount,
    weight,
    width,
    height,
    status,
    brand,
    category,
    sku,
    stock,
  } = body;

  const [result]: any = await pool.query(
    `INSERT INTO products 
        (name, description, images, price, discount, 
        weight, width, height, brand, status, 
        category, sku, stock)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      description,
      JSON.stringify(images),
      price,
      discount,
      weight,
      width,
      height,
      brand,
      status,
      category,
      sku,
      stock,
    ]
  );

  if (result.affectedRows > 0) {
    return NextResponse.json({
      message: "Product added successfully",
      product_id: result.insertId,
    });
  } else {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
