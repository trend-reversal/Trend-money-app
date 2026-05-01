import type { Metadata } from "next";
import { Cabin, Inter } from "next/font/google";
import "./globals.css";

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cabin",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Trend Money",
  description: "Finance App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cabin.variable} ${inter.variable} h-full antialiased`}
    >
      {/* 👇 Default font = Inter */}
      <body className="min-h-screen bg-[#F7F8FA] flex justify-center">
        <div className="w-full max-w-[420px] min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
