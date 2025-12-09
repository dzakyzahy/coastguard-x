import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "COASTGUARD-X | Disaster Mitigation Platform",
  description: "Integrasi Digital Twin Pesisir & Sensor Gelombang Mini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-ocean text-white min-h-screen relative`}>
        {/* Animated Background Mesh (Optional/Subtle) */}
        <div className="fixed inset-0 z-[-1] bg-ocean">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        {children}
      </body>
    </html>
  );
}
