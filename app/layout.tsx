import type { Metadata } from "next";
import { Ramabhadra } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TopBar from "@/components/layout/Topbar";
import SmoothScroll from "@/components/common/SmoothScroll";
import { ContactModalProvider } from "@/components/modal/GetInTouchModal";

const ramabhadra = Ramabhadra({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ramabhadra",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyberVault - Cybersecurity Solutions",
  description: "Protecting your business with advanced cybersecurity solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ramabhadra.variable} ${ramabhadra.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ContactModalProvider>
          <SmoothScroll>
            <TopBar />
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </ContactModalProvider>
      </body>
    </html>
  );
}
