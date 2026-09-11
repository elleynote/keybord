import type { Metadata } from "next";
import type { ReactNode } from "react";
import { brand } from "@/config/brand";
import "./globals.css";

const siteUrl = "https://armeniankeyboard.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Armenian Keyboard Online | Western & Eastern Armenian Keyboard",
  description: "Type Armenian online with a free Western and Eastern Armenian keyboard. Use standard or phonetic layouts, copy Armenian text, transliterate words and access Armenian learning tools.",
  applicationName: "Tun Armenian Keyboard",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: brand.faviconUrl, type: "image/png" }],
    apple: [{ url: brand.faviconUrl, sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Armenian Keyboard Online | Western & Eastern Armenian Keyboard",
    description: "Type Armenian online with a free Western and Eastern Armenian keyboard from Tun Online Armenian School.",
    url: siteUrl,
    siteName: "Tun Armenian Keyboard",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://tunapp.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Noto+Sans+Armenian:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
