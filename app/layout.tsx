import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio v2",
  description: "Thomas Stirling — portfolio v2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased motion-safe:snap-y motion-safe:snap-mandatory`}
    >
      <body className="min-h-full flex flex-col bg-ground text-ink font-serif">
        <a
          href="#main-content"
          className="bg-raised text-ink sr-only rounded-sm px-4 py-2 font-mono text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
