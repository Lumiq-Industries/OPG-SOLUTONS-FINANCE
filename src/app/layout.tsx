import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { FinanceShell } from "@/components/finance-shell";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "OPG Solutions Finance — Tailored Financial Solutions",
  description:
    "OPG Solutions Finance provides invoice discounting, procurement finance, asset-based finance and financial systems for SMMEs across South Africa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased relative`}>
        <div className="ambient-glow" aria-hidden="true" />
        <FinanceShell>{children}</FinanceShell>
      </body>
    </html>
  );
}
