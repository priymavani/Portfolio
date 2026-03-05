import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// 1. Setup Inter (The Primary Font)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 2. Setup JetBrains Mono (For Code Snippets only)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-medium",
  display: "swap",
});

export const metadata = {
  title: "Priy Mavani | Full Stack Engineer",
  description: "Building digital architecture. Full Stack Engineer focused on performance, accessibility, and pixel-perfect design systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* 3. Apply variables and set 'font-sans' as the GLOBAL default */}
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#050505] text-white antialiased selection:bg-[#3B82F6] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}