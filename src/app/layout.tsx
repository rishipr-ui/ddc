import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Darithri Diagnostic Centre (DDC)",
  description: "Darithri Diagnostic Centre (DDC) – Advanced clinical excellence in Hyderabad. Featuring Horiba Yumizen C600 & Pentra C400 for accurate results.",
  icons: {
    icon: "/darithri-symbol.png",
    shortcut: "/darithri-symbol.png",
    apple: "/darithri-symbol.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
