import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google"; // Import cool fonts
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "Feza Arşivi",
  description: "Türkiye ve Dünya'dan Uzay ve Havacılık Projeleri Arşivi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${orbitron.variable} font-sans bg-space-black text-white`}>
        <div className="fixed inset-0 z-[-1] stars pointer-events-none"></div>
        {children}
      </body>
    </html>
  );
}
