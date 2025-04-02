"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Alert,
  Snackbar,
} from "@mui/material";
import GetAppRoundedIcon from "@mui/icons-material/GetAppRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import StatusChip from "@/components/StatusChip";
import CustomPopup from "@/components/CustomPopup";

export enum MsgType {
  Error,
  Success,
}

export interface IToastMsg {
  msg: string;
  type: MsgType;
}

export interface IProduct {
  product_id: number;
  name: string;
  price: number;
  description: string;
  status: string;
  discount: number;
  images: string[];
  brand: string;
  category: string | null;
  stock: number;
  weight: number;
  width: number;
  height: number;
  sku: string | null;
}

export default function Products() {
  const rowsPerPage = 10;
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof IProduct>("name");
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState(-1);
  const [toastMsg, setToastMsg] = useState<IToastMsg>({
    msg: "",
    type: MsgType.Error,
  });

  const handleSort = (property: keyof IProduct) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = products.sort((a: any, b: any) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchProducts = () => {
    fetch("/api/products", {
      method: "GET",
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data) => {
        const response: {
          products?: IProduct[];
        } = data;
        if (response.products) {
          setProducts(response.products);
        }
      });
  };

  const toggleStatus = (id: number, status: string) => {
    fetch(`/api/products/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status === "Active" ? "Inactive" : "Active",
        key: "status",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setToastMsg({ msg: data.message, type: MsgType.Success });
          fetchProducts();
        } else {
          setToastMsg({ msg: data.error, type: MsgType.Error });
        }
      });
  };

  const deleteProduct = () => {
    fetch(`/api/products/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const response: {
          message?: string;
          error?: string;
        } = data;
        if (response.message) {
          setToastMsg({ msg: response.message, type: MsgType.Success });
          setDeleteId(-1);
        } else if (response.error) {
          setToastMsg({ msg: response.error, type: MsgType.Error });
        }
      });
  };

  useEffect(() => fetchProducts(), []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={toastMsg.msg.length > 0}
        autoHideDuration={2000}
        onClose={() => setToastMsg({ msg: "", type: MsgType.Error })}
      >
        <Alert severity={toastMsg.type === MsgType.Error ? "error" : "success"}>
          {toastMsg.msg}
        </Alert>
      </Snackbar>
      <CustomPopup
        open={deleteId > 0}
        handleClose={() => setDeleteId(-1)}
        sx={{
          width: "350px",
          minHeight: "100%",
          padding: 4,
        }}
      >
        <Typography>Are you sure you want to delete this product?</Typography>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{ color: "black", borderColor: "black" }}
            onClick={() => setDeleteId(-1)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "black",
              borderRadius: "8px",
            }}
            onClick={deleteProduct}
          >
            Delete
          </Button>
        </Box>
      </CustomPopup>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Products List</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button sx={{ textDecoration: "underline" }}>Export CSV</Button>
          <Button
            variant="contained"
            sx={{ display: "flex", alignItems: "center", borderRadius: "8px" }}
          >
            <GetAppRoundedIcon /> Import CSV
          </Button>
          <Button
            variant="contained"
            sx={{ display: "flex", alignItems: "center", borderRadius: "8px" }}
            onClick={() => router.push("/products/new")}
          >
            <AddRoundedIcon /> Add Product
          </Button>
        </Box>
      </Box>

      <TextField
        variant="outlined"
        sx={{ width: "100%", margin: "20px 0" }}
        placeholder="Search here..."
        InputProps={{
          endAdornment: (
            <SearchRoundedIcon sx={{ color: "grey", marginRight: "10px" }} />
          ),
        }}
      />

      <TableContainer sx={{ border: "1px solid white", borderRadius: "4px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={order}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "description"}
                  direction={order}
                  onClick={() => handleSort("description")}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "brand"}
                  direction={order}
                  onClick={() => handleSort("brand")}
                >
                  Brand
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={order}
                  onClick={() => handleSort("category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "price"}
                  direction={order}
                  onClick={() => handleSort("price")}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "discount"}
                  direction={order}
                  onClick={() => handleSort("discount")}
                >
                  Discount
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "status"}
                  direction={order}
                  onClick={() => handleSort("status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "stock"}
                  direction={order}
                  onClick={() => handleSort("stock")}
                >
                  Stock
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "black",
                  fontWeight: 600,
                  "&:hover": { color: "black" },
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.length > 0 ? (
              paginatedData.map((product) => (
                <TableRow key={product.product_id}>
                  <TableCell
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <img
                      src={product.images?.[0]}
                      width={50}
                      height={50}
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                    />
                    <span
                      style={{
                        cursor: "pointer",
                        color: "#7cafbf",
                        fontWeight: 600,
                      }}
                      onClick={() =>
                        router.push(`/products/${product.product_id}`)
                      }
                    >
                      {product.name}
                    </span>
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "300px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.description?.length > 100
                      ? `${product.description.slice(0, 100)}...`
                      : product.description}
                  </TableCell>

                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.discount}%</TableCell>
                  <TableCell>
                    <StatusChip
                      status={product.status}
                      onToggle={() =>
                        toggleStatus(product.product_id, product.status)
                      }
                    />
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell align="center">
                    <DeleteOutlineRoundedIcon
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => setDeleteId(product.product_id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} sx={{ textAlign: "center" }}>
                  No Products Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {products?.length ? (
          <TablePagination
            component={Box}
            sx={{ color: "white" }}
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPageOptions={[10]}
          />
        ) : null}
      </TableContainer>
    </>
  );
}
