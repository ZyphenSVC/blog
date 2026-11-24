import { headers } from "next/headers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { devContentRefreshScript } from "@/lib/dev-content-refresh";
import { getDevContentVersion } from "@/lib/dev-content-version";
import "./globals.css";

const inconsolata = localFont({
  src: "../public/fonts/inconsolata-latin-variable-wghtOnly-normal.woff2",
  variable: "--font-inconsolata",
  weight: "200 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zyphensvc.com"),
  title: { default: "ZyphenSVC", template: "%s | ZyphenSVC" },
  description:
    "Sriaditya Vedantam’s research, writing, and projects in cryptography, mathematics, and systems engineering.",
  openGraph: {
    type: "website",
    siteName: "ZyphenSVC",
    images: [{
      url: "/media/face_circ.png",
      width: 900,
      height: 900,
      type: "image/png",
      alt: "Sriaditya Vedantam",
    }],
  },
  twitter: {
    card: "summary",
    images: [{ url: "/media/face_circ.png", alt: "Sriaditya Vedantam" }],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-portfolio-nonce") ?? undefined;
  const contentVersion = process.env.NODE_ENV === "development"
    ? await getDevContentVersion().catch(() => null)
    : null;

  return (
    <html lang="en" className={inconsolata.variable} suppressHydrationWarning>
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('portfolio-theme')==='light')document.documentElement.dataset.theme='light'}catch{}" }} />
        {process.env.NODE_ENV === "development" && (
          <script nonce={nonce} id="dev-content-refresh" dangerouslySetInnerHTML={{ __html: devContentRefreshScript(contentVersion) }} />
        )}
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
