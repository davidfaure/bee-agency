import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Features Section - Launch UI",
  description: "Technical test Beee Agency - Features Section",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
