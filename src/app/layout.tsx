import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "../context/ThemeContext";
import { LanguageProvider } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATRAK | Advanced Unmanned Defense Systems & UAVs",
  description: "ATRAK designs and manufactures next-generation autonomous defense drone systems, loitering munitions (kamikaze drones), and intelligence-gathering reconnaissance aircraft.",
  keywords: "defense drones, UAV, autonomous drones, kamikaze drone, reconnaissance drone, ATRAK, loitering munition, aerospace engineering",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uz" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <NextTopLoader
          color="#000000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #000000,0 0 5px #000000"
          zIndex={9999}
        />
        <ThemeProvider>
          <LanguageProvider>
            {/* Background Blueprints Grid & Tactical Scanlines */}
            <div className="grid-overlay" />
            <div className="scanline" />
            <Header />
            {children}
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
