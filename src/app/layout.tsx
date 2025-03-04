import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppTheme from "@/shared-theme/AppTheme";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "@/lib/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medrasaty",
  description: "Medrasaty admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <AppTheme>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {/* QueryProvider should be inside html body for 'dev-tools' to work */}
            <QueryProvider>{children}</QueryProvider>
          </body>
        </AppTheme>
      </SessionProvider>
    </html>
  );
}
