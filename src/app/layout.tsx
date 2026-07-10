import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";
import "katex/dist/katex.min.css";

const dmSans = DM_Sans({
  variable: "--font-urbanist",
  subsets: ["latin"],
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
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
