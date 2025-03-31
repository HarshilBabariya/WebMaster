import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { Container } from "@mui/material";

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
        <Container
          maxWidth="xl"
          sx={{
            py: 6,
            borderRadius: 2,
            margin: "80px 50px",
            width: "auto !important",
          }}
        >
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
