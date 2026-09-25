import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ScrollController from "@/components/ScrollController";
import ScrollProgress from "@/components/ScrollProgress";
import { ProjectsCarouselProvider } from "@/context/ProjectsCarouselContext";
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
  metadataBase: new URL("https://tmstrlng.com"),
  title: "Thomas Stirling — Software Engineer",
  description:
    "Portfolio of Thomas Stirling, a software engineer working on backend systems, ML tooling, and full-stack applications.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Thomas Stirling — Software Engineer",
    description:
      "Portfolio of Thomas Stirling, a software engineer working on backend systems, ML tooling, and full-stack applications.",
    type: "website",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f17",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased motion-safe:snap-y motion-safe:snap-mandatory motion-safe:scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-ground text-ink font-serif">
        <noscript>
          <style>
            {".motion-fallback{opacity:1!important;transform:none!important}"}
          </style>
        </noscript>
        <a
          href="#main-content"
          className="bg-raised text-ink sr-only rounded-sm px-4 py-2 font-mono text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        <ProjectsCarouselProvider>
          <ScrollController />
          <ScrollProgress />
          <Nav />
          <main id="main-content" className="flex flex-1 flex-col">
            <CursorGlow>{children}</CursorGlow>
          </main>
          <Footer />
        </ProjectsCarouselProvider>
      </body>
    </html>
  );
}
