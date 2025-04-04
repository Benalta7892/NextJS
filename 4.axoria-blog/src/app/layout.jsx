import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { AuthProvider } from "./AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="grow relative">{children}</main>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
