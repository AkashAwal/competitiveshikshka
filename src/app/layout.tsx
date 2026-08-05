import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "CompetitiveShiksha — JEE, NEET & Govt Exam Prep",
    template: "%s | CompetitiveShiksha",
  },
  description:
    "Free NCERT solutions, PYQs, college info, rank calculators, and mentorship for JEE, NEET, and government exam aspirants.",
  metadataBase: new URL("https://competitiveshiksha.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${beVietnamPro.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
