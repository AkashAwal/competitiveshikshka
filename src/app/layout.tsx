import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const aloevera = localFont({
  variable: "--font-aloevera",
  src: [
    { path: "../../public/Aloevera-Thin.otf",           weight: "100", style: "normal" },
    { path: "../../public/Aloevera-ThinItalic.otf",     weight: "100", style: "italic" },
    { path: "../../public/Aloevera-ExtraLight.otf",     weight: "200", style: "normal" },
    { path: "../../public/Aloevera-ExtraLightItalic.otf", weight: "200", style: "italic" },
    { path: "../../public/Aloevera-Light.otf",          weight: "300", style: "normal" },
    { path: "../../public/Aloevera-Lightitalic.otf",    weight: "300", style: "italic" },
    { path: "../../public/Aloevera-Regular.otf",        weight: "400", style: "normal" },
    { path: "../../public/Aloevera-RegularItalic.otf",  weight: "400", style: "italic" },
    { path: "../../public/Aloevera-Medium.otf",         weight: "500", style: "normal" },
    { path: "../../public/Aloevera-MediumItalic.otf",   weight: "500", style: "italic" },
    { path: "../../public/Aloevera-SemiBold.otf",       weight: "600", style: "normal" },
    { path: "../../public/Aloevera-SemiBoldItalic.otf", weight: "600", style: "italic" },
    { path: "../../public/Aloevera-Bold.otf",           weight: "700", style: "normal" },
    { path: "../../public/Aloevera-ExtraBold.otf",      weight: "800", style: "normal" },
    { path: "../../public/Aloevera-ExtraBoldItalic.otf", weight: "800", style: "italic" },
    { path: "../../public/Aloevera-Black.otf",          weight: "900", style: "normal" },
    { path: "../../public/Aloevera-BlackItalic.otf",    weight: "900", style: "italic" },
  ],
});

const aloeveraCondensed = localFont({
  variable: "--font-aloevera-condensed",
  src: [
    { path: "../../public/Aloeveracondensed-Thin.otf",      weight: "100", style: "normal" },
    { path: "../../public/Aloeveracondensed-ThinItalic.otf", weight: "100", style: "italic" },
    { path: "../../public/Aloeveracondensed-ExtraLight.otf", weight: "200", style: "normal" },
    { path: "../../public/Aloeveracondensed-ELightItalic.otf", weight: "200", style: "italic" },
    { path: "../../public/Aloeveracondensed-Light.otf",     weight: "300", style: "normal" },
    { path: "../../public/Aloeveracondensed-Lightitalic.otf", weight: "300", style: "italic" },
    { path: "../../public/Aloeveracondensed-Regular.otf",   weight: "400", style: "normal" },
    { path: "../../public/Aloeveracondensed-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../../public/Aloeveracondensed-Medium.otf",    weight: "500", style: "normal" },
    { path: "../../public/Aloeveracondensed-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../../public/Aloeveracondensed-SemiBold.otf",  weight: "600", style: "normal" },
    { path: "../../public/Aloeveracondensed-SBoldItalic.otf", weight: "600", style: "italic" },
    { path: "../../public/Aloeveracondensed-Bold.otf",      weight: "700", style: "normal" },
    { path: "../../public/Aloeveracondensed-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../../public/Aloeveracondensed-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "../../public/Aloeveracondensed-ExBoldItalic.otf", weight: "800", style: "italic" },
    { path: "../../public/Aloeveracondensed-Black.otf",     weight: "900", style: "normal" },
    { path: "../../public/Aloeveracondensed-BlackItalic.otf", weight: "900", style: "italic" },
  ],
});

const aloeveraOutline = localFont({
  variable: "--font-aloevera-outline",
  src: [
    { path: "../../public/Aloeveraoutline-Thin.otf",      weight: "100", style: "normal" },
    { path: "../../public/Aloeveraoutline-ThinItalic.otf", weight: "100", style: "italic" },
    { path: "../../public/Aloeveraoutline-ExtraLight.otf", weight: "200", style: "normal" },
    { path: "../../public/Aloeveraoutline-ELightItalic.otf", weight: "200", style: "italic" },
    { path: "../../public/Aloeveraoutline-Light.otf",     weight: "300", style: "normal" },
    { path: "../../public/Aloeveraoutline-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../../public/Aloeveraoutline-Regular.otf",   weight: "400", style: "normal" },
    { path: "../../public/Aloeveraoutline-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../../public/Aloeveraoutline-Medium.otf",    weight: "500", style: "normal" },
    { path: "../../public/Aloeveraoutline-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../../public/Aloeveraoutline-SemiBold.otf",  weight: "600", style: "normal" },
    { path: "../../public/Aloeveraoutline-SemiBoldItalic.otf", weight: "600", style: "italic" },
    { path: "../../public/Aloeveraoutline-Bold.otf",      weight: "700", style: "normal" },
    { path: "../../public/Aloeveraoutline-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../../public/Aloeveraoutline-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "../../public/Aloeveraoutline-ExtraBoldItalic.otf", weight: "800", style: "italic" },
    { path: "../../public/Aloeveraoutline-Black.otf",     weight: "900", style: "normal" },
    { path: "../../public/Aloeveraoutline-BlackItalic.otf", weight: "900", style: "italic" },
  ],
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
      className={`${aloevera.variable} ${aloeveraCondensed.variable} ${aloeveraOutline.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
