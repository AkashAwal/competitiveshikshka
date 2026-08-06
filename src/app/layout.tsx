import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const SITE_URL = "https://competitiveshiksha.in";

export const metadata: Metadata = {
  title: {
    default: "CompetitiveShiksha — College Predictor, Rankings & Entrance Exam Guide",
    template: "%s | CompetitiveShiksha",
  },
  description:
    "Search verified college cutoffs, fees, placements and admission details, explore every major entrance exam (JEE, NEET & more), and get matched with a mentor who has already cracked it.",
  keywords: [
    "college admission india", "college cutoff", "college fees", "engineering colleges",
    "medical colleges", "JEE college predictor", "NEET college predictor",
    "entrance exam syllabus", "college placements", "mentorship for JEE NEET",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "CompetitiveShiksha",
    title: "CompetitiveShiksha — College Predictor, Rankings & Entrance Exam Guide",
    description:
      "Search verified college cutoffs, fees, placements and admission details, explore every major entrance exam, and get matched with a mentor who has already cracked it.",
    url: SITE_URL,
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CompetitiveShiksha — College Predictor, Rankings & Entrance Exam Guide",
    description: "Verified college cutoffs, fees, placements and entrance exam guides — all in one place.",
    images: ["/api/og"],
  },
  robots: { index: true, follow: true },
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
