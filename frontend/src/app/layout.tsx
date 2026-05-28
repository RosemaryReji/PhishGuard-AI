import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { CSPostHogProvider } from './providers';
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhishGuard AI - Cybersecurity Assistant",
  description: "AI-powered cybersecurity assistant to detect phishing and scams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${poppins.variable} ${inter.variable} h-full antialiased dark`}
      >
        <CSPostHogProvider>
          <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
            {children}
          </body>
        </CSPostHogProvider>
      </html>
    </ClerkProvider>
  );
}
