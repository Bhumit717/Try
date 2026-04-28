import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Export Buyer Lead Engine",
  description: "AI-powered international buyer lead generation"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
