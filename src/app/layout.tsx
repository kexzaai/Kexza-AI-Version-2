import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from "@/components/global/aurora-background";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kexza AI - Execution Intelligence for CA Firms",
  description: "Professional AI-powered workflow and execution platform for Chartered Accountants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark h-full antialiased"
    >
      <body className={`${inter.variable} min-h-full flex flex-col font-sans`}>
        <AuroraBackground>
          {children}
        </AuroraBackground>
        <Toaster theme="dark" position="top-right" />
      </body>
    </html>
  );
}
