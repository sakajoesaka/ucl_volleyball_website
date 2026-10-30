import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { VolleyballCursor } from "@/components/VolleyballCursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", axes: ["wdth"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | Volleyball at UCL`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.fullName,
  openGraph: {
    type: "website",
    siteName: site.fullName,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#4b1a7a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${archivo.variable}`}>
      <body className="flex min-h-svh flex-col font-sans text-base leading-relaxed antialiased">
        <a
          href="#main"
          className="sr-only z-[300] rounded-full bg-brand px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <TransitionProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </TransitionProvider>
        <VolleyballCursor />
      </body>
    </html>
  );
}
