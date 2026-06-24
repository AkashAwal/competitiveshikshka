import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const champagne = localFont({
  src: [
    {
      path: "../../public/champagne-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/champagne-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-champagne",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CompetitiveShikshka — JEE, NEET & Govt Exam Prep",
    template: "%s | CompetitiveShikshka",
  },
  description:
    "Free NCERT solutions, PYQs, college info, rank calculators, and mentorship for JEE, NEET, and government exam aspirants.",
  metadataBase: new URL("https://competitiveshikshka.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${champagne.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
