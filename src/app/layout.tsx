import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Laporan Harian & Mingguan",
  description: "Aplikasi pengisian form laporan harian dan mingguan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-gray-800 antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
