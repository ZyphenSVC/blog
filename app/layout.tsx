import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "./globals.css";

const inconsolata = localFont({
  src: "../public/fonts/inconsolata-latin-variable-wghtOnly-normal.woff2",
  variable: "--font-inconsolata",
  weight: "200 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "ZyphenSVC", template: "%s | ZyphenSVC" },
  description:
    "Sriaditya Vedantam’s research, writing, and projects in cryptography, mathematics, and systems engineering.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inconsolata.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('portfolio-theme')==='light')document.documentElement.dataset.theme='light'}catch{}" }} />
      </head>
      <body className="site-shell">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
