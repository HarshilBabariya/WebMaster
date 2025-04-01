"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Divider,
  MenuItem,
  Drawer,
  Stack,
  Typography,
  FormControl,
  TextField,
  Alert,
  Menu,
} from "@mui/material";
import CustomPopup from "./CustomPopup";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

enum Popup {
  SignIn = "sign-in",
  SignUp = "sign-up",
}

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  profile_url: string;
  phone: string;
}

const StyledToolbar = styled(Toolbar)(() => ({
  padding: "20px 16px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  width: "350px",
  minHeight: "100%",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

const headerButtons = [
  { label: "Dashboard", route: "/dashboard" },
  { label: "Products", route: "/products" },
  { label: "Orders", route: "/orders" },
  { label: "Branding", route: "/branding" },
];

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("* Email is required"),
  password: Yup.string()
    .min(6, "* Password must be at least 6 characters")
    .required("* Password is required"),
  name: Yup.string().when("isSignUp", {
    is: Popup.SignUp,
    then: (schema) => schema.required("* Name is required"),
  }),
});

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState<Popup | null>(null);
  const [error, setError] = React.useState("");
  const userDetails = JSON.parse(localStorage.getItem("userData") || "{}");

  const handleSubmit = (values: {
    email: string;
    name: string;
    password: string;
  }) => {
    if (isPopupOpen === Popup.SignIn) {
      fetch("/api/users", {
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          const response: {
            error?: string;
            user?: IUser;
            message?: string;
          } = data;
          if (response.error) {
            setError(response.error);
            return;
          }
          if (response.message && response.user) {
            localStorage.setItem(
              "userData",
              JSON.stringify({
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                profile_url: response.user.profile_url,
                role: response.user.role,
                phone: response.user.phone,
              })
            );
            setIsPopupOpen(null);
          }
        })
        .catch((_error) => {
          setError("Something went wrong");
        });
    } else {
      fetch("/api/users", {
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          const response: {
            error?: string;
            user?: IUser;
            message?: string;
          } = data;
          if (response.error) {
            setError(response.error);
            return;
          }
          if (response.message && response.user) {
            localStorage.setItem(
              "userData",
              JSON.stringify({
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                profile_url: response.user.profile_url,
                role: response.user.role,
                phone: response.user.phone,
              })
            );
            setIsPopupOpen(null);
          }
        })
        .catch((_error) => {
          setError("Something went wrong");
        });
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <CustomPopup
        open={isPopupOpen !== null}
        handleClose={() => {
          setIsPopupOpen(null);
          setError("");
        }}
        actions
      >
        <SignInContainer>
          <Image
            src={"/assets/webmaster-gif.gif"}
            alt="WebMaster"
            width={100}
            height={100}
            style={{ borderRadius: "8px", alignSelf: "center" }}
          />
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              fontWeight: 600,
              mb: 2,
              textAlign: "center",
            }}
          >
            {isPopupOpen === Popup.SignIn ? "Hello there!" : "Welcome!"}
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
              name: "",
              isSignUp: isPopupOpen,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 15,
                  width: "100%",
                }}
              >
                {isPopupOpen === Popup.SignUp && (
                  <FormControl sx={{ width: "100%" }}>
                    <Field
                      as={TextField}
                      variant="standard"
                      name="name"
                      placeholder="Name"
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      fullWidth
                    />
                  </FormControl>
                )}
                <FormControl sx={{ width: "100%" }}>
                  <Field
                    as={TextField}
                    variant="standard"
                    name="email"
                    placeholder="Email"
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    fullWidth
                  />
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <Field
                    as={TextField}
                    variant="standard"
                    name="password"
                    type="password"
                    placeholder="Password"
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    fullWidth
                  />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ background: "#000", color: "#FFF", fontWeight: 500 }}
                >
                  {isPopupOpen === Popup.SignIn ? "Login" : "Register"}
                </Button>
                {error.length > 0 && <Alert severity="error">{error}</Alert>}
              </Form>
            )}
          </Formik>
          <Box>
            <Typography
              sx={{
                mt: 3,
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {isPopupOpen === Popup.SignIn
                ? "New to Webmaster?"
                : "Already have account?"}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "red",
                cursor: "pointer",
              }}
              onClick={() =>
                setIsPopupOpen(
                  isPopupOpen === Popup.SignIn ? Popup.SignUp : Popup.SignIn
                )
              }
            >
              {isPopupOpen === Popup.SignIn ? "JOIN NOW" : "LOG IN"}
            </Typography>
          </Box>
        </SignInContainer>
      </CustomPopup>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: "black",
        }}
      >
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Image
              src="/assets/webmaster-logo.png"
              alt="WebMaster"
              style={{ filter: "invert(1)", cursor: "pointer" }}
              width={80}
              height={50}
              onClick={() => router.push("/")}
            />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {headerButtons.map((button) => {
                return (
                  <Button
                    key={button.route}
                    variant="text"
                    sx={{
                      textTransform: "capitalize",
                      color: "#ffffff",
                      fontWeight: 500,
                      "&:hover": {
                        color: "#AAAAAA",
                      },
                    }}
                    onClick={() => router.push(button.route)}
                  >
                    {button.label}
                  </Button>
                );
              })}
            </Box>
          </Box>
          {Object.keys(userDetails).length > 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                padding: "0 0.5rem",
              }}
              onClick={() => router.push("/profile")}
            >
              <img
                src={userDetails.profile_url}
                alt={userDetails.name}
                style={{
                  width: 35,
                  height: "auto",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Box>
                <Typography sx={{ color: "white", fontSize: "14px" }}>
                  {userDetails.name}
                </Typography>
                <Typography
                  sx={{ fontSize: "10px", fontWeight: 600, color: "red" }}
                >
                  {userDetails.role}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <Button
                variant="text"
                sx={{
                  textTransform: "initial",
                  color: "#ffffff",
                  fontWeight: 500,
                  padding: "12px 20px",
                  "&:hover": {
                    color: "#AAAAAA",
                  },
                }}
                onClick={() => setIsPopupOpen(Popup.SignUp)}
              >
                Sign up
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "#ffffff",
                  textTransform: "initial",
                  color: "#000000",
                  fontWeight: 500,
                  borderRadius: "30px",
                  padding: "12px 20px",
                }}
                onClick={() => setIsPopupOpen(Popup.SignIn)}
              >
                Log in
              </Button>
            </Box>
          )}
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: "#FFFFFF" }} />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {headerButtons.map((button) => {
                  return (
                    <MenuItem
                      key={button.route}
                      sx={{
                        textTransform: "capitalize",
                        color: "#000000",
                        fontWeight: 500,
                      }}
                      onClick={() => router.push(button.route)}
                    >
                      {button.label}
                    </MenuItem>
                  );
                })}
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button
                    variant="text"
                    sx={{
                      textTransform: "initial",
                      color: "#000000",
                      fontWeight: 500,
                      padding: "12px 20px",
                    }}
                    fullWidth
                    onClick={() => setIsPopupOpen(Popup.SignUp)}
                  >
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    variant="contained"
                    sx={{
                      background: "#000000",
                      textTransform: "initial",
                      color: "#ffffff",
                      fontWeight: 500,
                    }}
                    fullWidth
                    onClick={() => setIsPopupOpen(Popup.SignIn)}
                  >
                    Log in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </AppBar>
    </>
  );
};

export default Header;
