import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Richo Setiawan | Backend Developer",
  description:
    "Portfolio website of Richo Setiawan — Sistem Informasi, Universitas Kristen Krida Wacana. Backend Developer specializing in Spring Boot, React, and modern web technologies.",
  keywords: ["Richo Setiawan", "Backend Developer", "Spring Boot", "Portfolio", "React", "Next.js"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
