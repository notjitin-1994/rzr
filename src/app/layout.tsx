import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RZR · Senior L&D Lead — Interview Artifacts",
  description:
    "A portfolio of build artifacts accompanying the Senior L&D Lead implementation plan: RZR Academy prototype, FTM Feedback Delivery module, LMS comparison matrix, Day-1 listening-tour questions, and a risk mitigation one-pager.",
  keywords: [
    "RZR",
    "L&D",
    "Learning & Development",
    "Senior L&D Lead",
    "Onboarding",
    "Manager Development",
    "Kirkpatrick",
    "AI-Native L&D",
  ],
  authors: [{ name: "Senior L&D Lead Candidate" }],
  openGraph: {
    title: "RZR · Senior L&D Lead — Interview Artifacts",
    description:
      "Builder-grade artifacts: Academy prototype, FTM module, LMS matrix, listening-tour questions, risk one-pager.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
