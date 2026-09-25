import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import CustomCursor from "@/components/layout/CustomCursor";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import ScreenGlow from "@/components/layout/ScreenGlow";
import ScrollController from "@/components/layout/ScrollController";
import ScrollProgress from "@/components/layout/ScrollProgress";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { ProjectsCarouselProvider } from "@/context/ProjectsCarouselContext";
import { THEME_COLOR_DARK, THEME_COLOR_LIGHT } from "@/lib/theme";
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
  title: "Thomas Stirling - Software Engineer",
  description:
    "Portfolio of Thomas Stirling, a software engineer working on backend systems, ML tooling, and full-stack applications.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Thomas Stirling - Software Engineer",
    description:
      "Portfolio of Thomas Stirling, a software engineer working on backend systems, ML tooling, and full-stack applications.",
    type: "website",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR_DARK,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased motion-safe:snap-y motion-safe:snap-mandatory motion-safe:scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='light'){document.documentElement.dataset.theme='light';document.querySelector('meta[name="theme-color"]').setAttribute('content','${THEME_COLOR_LIGHT}')}}catch(e){}`,
          }}
        />
      </head>
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
        <ScreenGlow />
        <CustomCursor />
        <ProjectsCarouselProvider>
          <ScrollController />
          <ScrollProgress />
          <ThemeToggle />
          <Footer />
          <Nav />
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>
        </ProjectsCarouselProvider>
      </body>
    </html>
  );
}
