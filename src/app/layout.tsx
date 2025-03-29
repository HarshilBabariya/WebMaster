import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";

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
        <div style={{ margin: "110px 40px", minHeight: "31vh" }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
