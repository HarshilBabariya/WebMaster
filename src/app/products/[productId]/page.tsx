"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { IProduct, IToastMsg, MsgType } from "../page";

const validationSchema = yup.object({
  name: yup.string().required("* Product name is required"),
  description: yup.string().required("* Description is required"),
  brand: yup.string().required("* Brand is required"),
  category: yup.string(),
  stock: yup
    .number()
    .min(1, "* Quantity must be at least 1")
    .required("* Quantity is required"),
  price: yup
    .number()
    .min(0.1, "* Price must be greater than 0")
    .required("* Price is required"),
  discount: yup.number(),
  weight: yup
    .number()
    .min(0.01, "* Weight must be greater than 0")
    .required("* Weight is required"),
  width: yup
    .number()
    .min(1, "* Width must be greater than 0")
    .required("* Width is required"),
  height: yup
    .number()
    .min(1, "* Height must be greater than 0")
    .required("* Height is required"),
});

const AddProductPage = () => {
  const router = useRouter();
  const [productId, setProductId] = useState(-1);
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]);
  const [productDetails, setProductDetails] = useState<IProduct>();
  const [toastMsg, setToastMsg] = useState<IToastMsg>({
    msg: "",
    type: MsgType.Error,
  });

  const formik = useFormik({
    initialValues: {
      name: productDetails?.name,
      description: productDetails?.description,
      brand: productDetails?.brand,
      category: productDetails?.category,
      stock: productDetails?.stock,
      sku: productDetails?.sku,
      price: productDetails?.price,
      discount: productDetails?.discount,
      status: "Inactive",
      images: productDetails?.images || [],
      weight: productDetails?.weight,
      width: productDetails?.width,
      height: productDetails?.height,
    },
    validationSchema,
    onSubmit: (values) => {
      productId ? updateProduct(values) : addProduct(values);
    },
  });

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        formik.setFieldValue("images", [
          ...formik.values.images,
          reader.result,
        ]);
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = reader.result;
          return newImages;
        });
      };
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue("images", newImages);
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = null;
      return newImages;
    });
  };

  const fetchProductDetails = (productId: number) => {
    fetch(`/api/products/${productId}`, {
      method: "GET",
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data) => {
        const response: {
          product?: IProduct;
        } = data;
        if (response.product) {
          setProductDetails(response.product);
        }
      });
  };

  const addProduct = (values: any) => {
    fetch(`/api/products`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const response: {
          message?: string;
          error?: string;
        } = data;
        if (response.message) {
          setToastMsg({ msg: response.message, type: MsgType.Success });
          setTimeout(() => {
            router.push("/products");
          }, 2000);
        } else if (response.error) {
          setToastMsg({ msg: response.error, type: MsgType.Error });
        }
      });
  };

  const updateProduct = (values: any) => {
    fetch(`/api/products/${productId}`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        key: "update",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const response: {
          message?: string;
          error?: string;
        } = data;
        if (response.message) {
          setToastMsg({ msg: response.message, type: MsgType.Success });
          setTimeout(() => {
            router.push("/products");
          }, 2000);
        } else if (response.error) {
          setToastMsg({ msg: response.error, type: MsgType.Error });
        }
      });
  };

  useEffect(() => {
    const productId = Number(location.pathname.split("/").reverse()[0]);
    setProductId(productId);
    !isNaN(productId) && fetchProductDetails(productId);
  }, []);

  useEffect(() => {
    if (productDetails) {
      formik.setValues({
        name: productDetails.name || "",
        description: productDetails.description || "",
        brand: productDetails.brand || "",
        category: productDetails.category || "",
        stock: productDetails.stock || 1,
        sku: productDetails.sku || "",
        price: productDetails.price || 1,
        discount: productDetails.discount || 0,
        status: productDetails.status || "Inactive",
        images: productDetails.images || [],
        weight: productDetails.weight || 1,
        width: productDetails.width || 1,
        height: productDetails.height || 1,
      });
      setImages(productDetails.images || []);
    }
  }, [productDetails]);

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
      <Box sx={{ p: 4, pt: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}>
          <ArrowBackIcon
            sx={{
              padding: "8px",
              border: "1px solid white",
              borderRadius: "4px",
              width: 40,
              height: 40,
              cursor: "pointer",
            }}
            onClick={() => router.push("/products")}
          />
          <Box>
            <Typography variant="caption">Back to product list</Typography>
            <Typography variant="h5">
              {productId ? "Update Product" : "Add New Product"}
            </Typography>
          </Box>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Left Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Description</Typography>
              <Box
                sx={{
                  border: "1px solid white",
                  borderRadius: "4px",
                  padding: "20px",
                  marginTop: "4px",
                  marginBottom: "20px",
                }}
              >
                <InputLabel>Product Name</InputLabel>
                <TextField
                  fullWidth
                  name="name"
                  placeholder="Product name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  sx={{ mb: 2 }}
                />
                <InputLabel>Business Description</InputLabel>
                <TextField
                  fullWidth
                  name="description"
                  placeholder="Description..."
                  multiline
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Box>

              <Typography variant="h6">Brand and Category</Typography>
              <Box
                sx={{
                  border: "1px solid white",
                  borderRadius: "4px",
                  padding: "20px",
                  marginTop: "4px",
                  marginBottom: "20px",
                }}
              >
                <InputLabel>Product Brand</InputLabel>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    key={formik.values.brand}
                    name="brand"
                    value={formik.values.brand}
                    onChange={formik.handleChange}
                    error={formik.touched.brand && Boolean(formik.errors.brand)}
                    IconComponent={ExpandMoreRoundedIcon}
                  >
                    <MenuItem value="Puma">Puma</MenuItem>
                    <MenuItem value="Nike">Nike</MenuItem>
                    <MenuItem value="Adidas">Adidas</MenuItem>
                    <MenuItem value="Lakmē">Lakmē</MenuItem>
                    <MenuItem value="Tommy Hilfiger">Tommy Hilfiger</MenuItem>
                    <MenuItem value="Peter England">Peter England</MenuItem>
                    <MenuItem value="Roadster">Roadster</MenuItem>
                  </Select>
                </FormControl>
                <InputLabel>Product Category</InputLabel>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    key={formik.values.category}
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                    IconComponent={ExpandMoreRoundedIcon}
                  >
                    <MenuItem value="Men">Men</MenuItem>
                    <MenuItem value="Women">Women</MenuItem>
                    <MenuItem value="Beauty">Beauty</MenuItem>
                    <MenuItem value="T-shirts">T-shirts</MenuItem>
                    <MenuItem value="Shirts">Shirts</MenuItem>
                    <MenuItem value="Footwear">Footwear</MenuItem>
                    <MenuItem value="Jackets">Jackets</MenuItem>
                    <MenuItem value="Home decor">Home decor</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Typography variant="h6">Inventory</Typography>
              <Box
                sx={{
                  border: "1px solid white",
                  borderRadius: "4px",
                  padding: "20px",
                  marginTop: "4px",
                  marginBottom: "20px",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <InputLabel>Quantity</InputLabel>
                    <TextField
                      fullWidth
                      name="stock"
                      type="number"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.stock && Boolean(formik.errors.stock)
                      }
                      helperText={formik.touched.stock && formik.errors.stock}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel>SKU (Optional)</InputLabel>
                    <TextField
                      fullWidth
                      name="sku"
                      value={formik.values.sku}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Typography variant="h6" sx={{ mt: 2 }}>
                Pricing
              </Typography>
              <Box
                sx={{
                  border: "1px solid white",
                  borderRadius: "4px",
                  padding: "20px",
                  marginTop: "4px",
                  marginBottom: "20px",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <InputLabel>Price</InputLabel>
                    <TextField
                      fullWidth
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel>Discount</InputLabel>
                    <TextField
                      fullWidth
                      name="discount"
                      value={formik.values.discount}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.discount &&
                        Boolean(formik.errors.discount)
                      }
                      helperText={
                        formik.touched.discount && formik.errors.discount
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Right Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Status</Typography>
              <Box
                sx={{
                  border: "1px solid white",
                  borderRadius: "4px",
                  padding: "20px",
                  paddingLeft: "30px",
                  marginTop: "4px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.status === "Active"}
                      onChange={(event) => {
                        const newStatus = event.target.checked
                          ? "Active"
                          : "Inactive";
                        formik.setFieldValue("status", newStatus);
                      }}
                      name="status"
                      sx={{
                        width: 50,
                        height: 24,
                        padding: 0,
                        "& .MuiSwitch-switchBase": {
                          padding: 0,
                          margin: "3.5px",
                          transitionDuration: "300ms",
                          "&.Mui-checked": {
                            transform: "translateX(24px)",
                            color: "#fff",
                            "& + .MuiSwitch-track": {
                              backgroundColor: "#4caf50",
                              opacity: 1,
                            },
                          },
                        },
                        "& .MuiSwitch-thumb": {
                          width: 16,
                          height: 16,
                          backgroundColor: "#fff",
                        },
                        "& .MuiSwitch-track": {
                          borderRadius: 13,
                          backgroundColor: "#ccc",
                          opacity: 1,
                        },
                      }}
                    />
                  }
                  label=""
                />
                <Typography
                  sx={{
                    color: formik.values.status === "Active" ? "white" : "red",
                    fontWeight: 600,
                  }}
                >
                  {formik.values.status || "Inactive"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6">Product Images</Typography>
                <Tooltip title="Add upto 4 images">
                  <HelpOutlineRoundedIcon
                    sx={{ fontSize: "16px", cursor: "pointer" }}
                  />
                </Tooltip>
              </Box>
              <Box
                sx={{
                  border: "1px solid white",
                  borderRadius: "8px",
                  padding: "20px",
                  marginTop: "4px",
                  marginBottom: "20px",
                }}
              >
                <Grid container spacing={2}>
                  {[...Array(4)].map((_, index) => (
                    <Grid item xs={3} key={index}>
                      <label htmlFor={`upload-image-${index}`}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "100px",
                            border: "2px dashed grey",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            overflow: "hidden",
                            backgroundColor: "#f9f9f9",
                            position: "relative",
                          }}
                        >
                          {images[index] ? (
                            <>
                              <img
                                src={images[index] as string}
                                alt={`upload-${index}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                              />
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleRemoveImage(index);
                                }}
                                sx={{
                                  position: "absolute",
                                  top: 4,
                                  right: 4,
                                  backgroundColor: "rgba(255,255,255,0.7)",
                                  "&:hover": {
                                    backgroundColor: "rgba(255,0,0,0.8)",
                                    color: "white",
                                  },
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </>
                          ) : (
                            <Typography variant="h4" color="grey">
                              +
                            </Typography>
                          )}
                        </Box>
                        <input
                          type="file"
                          id={`upload-image-${index}`}
                          hidden
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index)}
                        />
                      </label>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Typography variant="h6">Shopping and Delivery</Typography>
              <Box
                sx={{
                  border: "1px solid white",
                  borderRadius: "4px",
                  padding: "20px",
                  marginTop: "4px",
                  marginBottom: "20px",
                }}
              >
                <InputLabel>Item weight</InputLabel>
                <TextField
                  fullWidth
                  name="weight"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  error={formik.touched.weight && Boolean(formik.errors.weight)}
                  helperText={formik.touched.weight && formik.errors.weight}
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <Typography
                        sx={{ color: "#AAAAAA", paddingRight: "10px" }}
                      >
                        kg
                      </Typography>
                    ),
                  }}
                />
                <Typography sx={{ mb: 2 }}>
                  Package Size(The package you use to ship your product)
                </Typography>
                <Grid
                  container
                  md={12}
                  spacing={3}
                  sx={{ maxWidth: "initial !important" }}
                >
                  <Grid item md={6} sm={12}>
                    <InputLabel>Width</InputLabel>
                    <TextField
                      fullWidth
                      name="width"
                      value={formik.values.width}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.width && Boolean(formik.errors.width)
                      }
                      helperText={formik.touched.width && formik.errors.width}
                      sx={{ mb: 2 }}
                      InputProps={{
                        endAdornment: (
                          <Typography
                            sx={{ color: "#AAAAAA", paddingRight: "10px" }}
                          >
                            in
                          </Typography>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12}>
                    <InputLabel>Height</InputLabel>
                    <TextField
                      fullWidth
                      name="height"
                      value={formik.values.height}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.height && Boolean(formik.errors.height)
                      }
                      helperText={formik.touched.height && formik.errors.height}
                      sx={{ mb: 2 }}
                      InputProps={{
                        endAdornment: (
                          <Typography
                            sx={{ color: "#AAAAAA", paddingRight: "10px" }}
                          >
                            in
                          </Typography>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  gap: 2,
                  mt: 5,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ color: "red" }}
                  onClick={() => {
                    router.push("/products");
                  }}
                >
                  Discard
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: "8px" }}
                >
                  {productId ? "Update Product" : "Add Product"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default AddProductPage;
