import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const urbanist = DM_Sans({
  variable: "--font-urbanist",
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
      className={`${urbanist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
