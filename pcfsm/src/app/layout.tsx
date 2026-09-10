import type { Metadata } from "next";
import { Geist, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PCFSM — Parmanand College of Fire Engineering & Safety Management",
  description:
    "Fire Engineering & Industrial Safety education since 1999. Recognized by the Government of Maharashtra, affiliated to MSBTE. Diploma, PG and certificate programs in fire technology, industrial safety and HSE.",
  openGraph: {
    title: "PCFSM — Master the Science of Safety",
    description:
      "Fire Engineering & Industrial Safety education. Established 1999, multiple centers across India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${instrument.variable} ${inter.variable}`}>
      <body className="bg-ink text-bone font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
