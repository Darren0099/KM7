import "./globals.css";
import ScrollReveal from "../components/ScrollReveal";
import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = { title: "AsaKita - Belajar sebelum menikah", description: "Kenali tanda bahaya, pahami hak hukum, dan tahu ke mana mencari bantuan." };
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}<ScrollReveal /></body>
    </html>
  );
}
