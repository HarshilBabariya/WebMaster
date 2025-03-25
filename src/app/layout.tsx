import "./globals.css";
import Header from "../components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div style={{margin: "110px 40px"}}>
        {children}
        </div>
      </body>
    </html>
  );
}
