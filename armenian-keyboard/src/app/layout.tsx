import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { brand } from "@/config/brand";
import "./globals.css";

const siteUrl = "https://armeniankeyboard.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Online Armenian Keyboard | Eastern, Western & Transliteration",
  description: "Free online Armenian keyboard for Eastern and Western Armenian. Type easily with built-in pronunciation guides, instant translation, and transliteration tools.",
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
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-BZDEYT1LH2" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BZDEYT1LH2');`}
      </Script>
    </html>
  );
}
