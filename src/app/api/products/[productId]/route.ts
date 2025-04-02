import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  // If id is there, then fetch one product
  const productId = params.productId;
  const [products]: any[] = await pool.query(
    "SELECT * FROM products WHERE product_id = ?",
    productId
  );
  if (!products && products.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ product: products[0] });
}

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId;
  const body = await req.json();
  const {
    key,
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

  const [products]: any[] = await pool.query(
    "SELECT * FROM products WHERE product_id = ?",
    [productId]
  );

  if (!products || products.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  let result: any;
  if (key === "update") {
    [result] = await pool.query(
      `UPDATE products 
        SET name = ?, description = ?, images = ?, price = ?, discount = ?, 
        weight = ?, width = ?, height = ?, brand = ?, status = ?, 
        category = ?, sku = ?, stock = ? 
        WHERE product_id = ?`,
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
        productId,
      ]
    );
  } else if (key === "status") {
    [result] = await pool.query(
      "UPDATE products SET status = ? WHERE product_id = ?",
      [status, productId]
    );
  }

  if (result.affectedRows > 0) {
    return NextResponse.json({
      message:
        key === "update"
          ? "Product updated successfully"
          : "Status updated successfully",
      product_id: productId,
    });
  } else {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId;
  const [products]: any = await pool.query(
    "SELECT * FROM products WHERE product_id = ?",
    [productId]
  );

  if (!products || products.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const [result]: any = await pool.query(
    "DELETE FROM products WHERE product_id = ?",
    [productId]
  );

  if (result.affectedRows > 0) {
    return NextResponse.json({
      message: "Product deleted successfully",
      product_id: productId,
    });
  } else {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
