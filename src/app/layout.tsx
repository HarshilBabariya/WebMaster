import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";
import CustomThemeProvider from "@/components/ThemeProvider";

export const metadata = {
  title: "WebMaster",
  icons: {
    icon: "/assets/webmaster-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomThemeProvider>
          <Header />
          <Box sx={{ py: 6, borderRadius: 2, margin: "80px 50px 50px 50px" }}>
            {children}
          </Box>
          <Footer />
        </CustomThemeProvider>
      </body>
    </html>
  );
}
