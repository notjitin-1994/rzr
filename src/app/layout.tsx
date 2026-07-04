import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://rzr-two.vercel.app";

const ogImageUrl = `${siteUrl}/brand/rzr-og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Senior L&D Lead · RZR — Strategy & Build Portfolio",
  description:
    "A builder-grade strategy and execution portfolio for the Senior L&D Lead role at RZR. Where intelligence makes impact — across onboarding, manager capability, leadership development, AI-native enablement, and measurable business outcomes.",
  keywords: [
    "RZR",
    "Learning & Development",
    "Senior L&D Lead",
    "Onboarding",
    "Manager Capability",
    "Leadership Development",
    "AI-Native L&D",
    "Kirkpatrick",
    "Where Intelligence Makes Impact",
  ],
  authors: [{ name: "Senior L&D Lead Candidate" }],
  icons: {
    icon: "/brand/rzr-favicon.png",
    apple: "/brand/rzr-favicon.png",
  },
  openGraph: {
    title: "Senior L&D Lead · RZR — Strategy & Build Portfolio",
    description:
      "Builder-grade strategy and execution portfolio: onboarding, manager capability, leadership development, AI-native enablement, and measurable business outcomes.",
    url: siteUrl,
    siteName: "RZR",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "RZR — Senior L&D Lead Strategy & Build Portfolio. Where Intelligence Makes Impact.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior L&D Lead · RZR — Strategy & Build Portfolio",
    description:
      "Builder-grade strategy and execution portfolio: onboarding, manager capability, leadership development, AI-native enablement, and measurable business outcomes.",
    images: [ogImageUrl],
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
        className={`${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
