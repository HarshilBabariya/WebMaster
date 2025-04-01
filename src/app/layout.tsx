import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";

export const metadata = {
  title: "WebMaster",
  icons: {
    icon: "/assets/webmaster-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Box
          sx={{
            py: 6,
            borderRadius: 2,
            margin: "80px 50px 50px 50px",
            width: "auto !important",
          }}
        >
          {children}
        </Box>
        <Footer />
      </body>
    </html>
  );
}
