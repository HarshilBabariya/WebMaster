"use client";
import React, { useState } from "react";
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
  Chip,
} from "@mui/material";
import GetAppRoundedIcon from "@mui/icons-material/GetAppRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useRouter } from "next/navigation";
import StatusChip from "@/components/StatusChip";

const sampleProducts = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  image: `https://picsum.photos/200/300?random=${index + 1}`,
  name: `Product ${index + 1}`,
  description: `This is a description This is a descriptionThis is a descriptionThis is a descriptionThis is a descriptionThis is a descriptionThis is a descriptionThis is a descriptionThis is a description of product ${
    index + 1
  }`,
  brand: `Brand ${(index % 5) + 1}`,
  category: `Category ${(index % 5) + 1}`,
  price: (Math.random() * 100).toFixed(2),
  stock: Math.floor(Math.random() * 100),
  tax: (Math.random() * 10).toFixed(2),
  status: index % 2 === 0 ? "Active" : "Inactive",
}));

export default function Products() {
  const rowsPerPage = 10;
  const router = useRouter();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] =
    useState<keyof (typeof sampleProducts)[0]>("name");
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState("");

  const toggleStatus = () => {
    setStatus((prev) => (prev === "Active" ? "Inactive" : "Active"));
  };

  const handleSort = (property: keyof (typeof sampleProducts)[0]) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...sampleProducts].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Products List</Typography>
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
          endAdornment: <SearchRoundedIcon sx={{ color: "grey" }} />,
        }}
      />

      <TableContainer sx={{ border: "1px solid white", borderRadius: "8px" }}>
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
                  active={orderBy === "tax"}
                  direction={order}
                  onClick={() => handleSort("tax")}
                >
                  Tax
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
            {paginatedData.map((product) => (
              <TableRow key={product.id}>
                <TableCell
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <img
                    src={product.image}
                    width={50}
                    height={50}
                    style={{ borderRadius: "8px" }}
                  />
                  <span
                    style={{
                      cursor: "pointer",
                      color: "#7cafbf",
                      fontWeight: 600,
                    }}
                    onClick={() => router.push(`/products/${product.id}`)}
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
                  {product.description.length > 100
                    ? `${product.description.slice(0, 100)}...`
                    : product.description}
                </TableCell>

                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.tax}%</TableCell>
                <TableCell>
                  <StatusChip initialStatus={product.status} />
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell align="center">
                  <DeleteOutlineRoundedIcon
                    sx={{ color: "red", cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component={Box}
          sx={{ color: "white" }}
          count={sampleProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPageOptions={[10]}
        />
      </TableContainer>
    </>
  );
}
