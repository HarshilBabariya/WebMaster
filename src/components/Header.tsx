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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CustomPopup from "./CustomPopup";
import Image from "next/image";

enum Popup {
  SignIn = "sign-in",
  SignUp = "sign-up",
}

const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: "8px",
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: "white",
  backgroundColor: "#F1F5F9",
  boxShadow: "1",
  padding: "8px 12px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  width: "350px",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const headerButtons = [
  { label: "Dashboard", route: "/" },
  { label: "Products", route: "/products" },
  { label: "Orders", route: "/orders" },
  { label: "Branding", route: "/branding" },
  { label: "FAQs", route: "/faqs" },
  { label: "Contact", route: "/contact-us" },
];

export default function AppAppBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState<Popup | null>(null);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    if (isPopupOpen === Popup.SignIn) {
      // handle sign in
    } else {
      // handle sign up
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  console.log("sss", users)

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <CustomPopup
        open={isPopupOpen !== null}
        handleClose={() => setIsPopupOpen(null)}
        actions
      >
        <SignInContainer>
          <Image
            src={"/assets/webmaster-logo.png"}
            alt="WebMaster"
            width={170}
            height={230}
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="standard"
                sx={{ mb: 1 }}
              />
            </FormControl>
            <FormControl>
              <TextField
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="standard"
                sx={{ mb: 1 }}
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#000000",
                color: "#FFF",
                fontWeight: 500,
              }}
              fullWidth
            >
              {isPopupOpen === Popup.SignIn ? "Login" : "Register"}
            </Button>
          </Box>
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
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {headerButtons.map((button) => {
                return (
                  <Button
                    key={button.route}
                    variant="text"
                    sx={{
                      textTransform: "capitalize",
                      color: pathname === button.route ? "red" : "#000000",
                      fontWeight: 500,
                    }}
                    onClick={() => router.push(button.route)}
                  >
                    {button.label}
                  </Button>
                );
              })}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button
              variant="text"
              sx={{
                textTransform: "capitalize",
                color: "#000000",
                fontWeight: 500,
              }}
              onClick={() => setIsPopupOpen(Popup.SignIn)}
            >
              Sign in
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "#000000",
                textTransform: "capitalize",
                color: "#FFF",
                fontWeight: 500,
              }}
              onClick={() => setIsPopupOpen(Popup.SignUp)}
            >
              Sign up
            </Button>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
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
                    variant="contained"
                    sx={{
                      background: "#000000",
                      textTransform: "capitalize",
                      color: "#FFF",
                      fontWeight: 500,
                    }}
                    fullWidth
                    onClick={() => setIsPopupOpen(Popup.SignUp)}
                  >
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    variant="text"
                    sx={{
                      textTransform: "capitalize",
                      color: "#000000",
                      fontWeight: 500,
                    }}
                    fullWidth
                    onClick={() => setIsPopupOpen(Popup.SignIn)}
                  >
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
