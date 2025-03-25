"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
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
  FormLabel,
  TextField,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CustomPopup from "./CustomPopup";

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
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const headerButtons = [
  { label: "Dashboard", route: "/dashboard" },
  { label: "Products", route: "/products" },
  { label: "Orders", route: "/orders" },
  { label: "Branding", route: "/branding" },
  { label: "FAQs", route: "/faqs" },
  { label: "Contact", route: "/contact-us" },
];

export default function AppAppBar() {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState<Popup | null>(null);
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
        <SignInContainer direction="column" justifyContent="space-between">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
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
                      color: "#000000",
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
