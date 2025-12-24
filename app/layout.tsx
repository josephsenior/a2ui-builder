import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A2UI Builder - AI-Powered UI Generator",
  description: "Create beautiful UIs by describing them in natural language. Powered by Gemini AI and shadcn/ui.",
  keywords: ["A2UI", "UI Builder", "AI", "Gemini", "shadcn/ui", "React", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} bg-background text-foreground font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

