import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Prism | White-label Embeddable Analytics SDK for B2B SaaS",
  description: "Power your platform with gorgeous, real-time analytics. Embed Prism's SDK in minutes. Premium, customizable, and lightning fast.",
  metadataBase: new URL("https://prism.dev"),
  openGraph: {
    title: "Prism | Embeddable B2B SaaS Analytics SDK",
    description: "Power your platform with gorgeous, real-time analytics. Embed Prism's SDK in minutes.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism | Embeddable B2B SaaS Analytics SDK",
    description: "Power your platform with gorgeous, real-time analytics. Embed Prism's SDK in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans text-text-primary bg-bg-base min-h-screen relative selection:bg-brand selection:text-text-on-primary">
        {/* Noise overlay across entire site */}
        <div className="noise" aria-hidden="true" />

        {/* Animated grid pattern in background */}
        <div className="bg-grid" aria-hidden="true" />

        {/* Content wrapper */}
        <ThemeProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

