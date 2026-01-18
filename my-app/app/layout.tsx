import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import AccountMenu from "@/components/AccountMenu";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Fit Check",
  description: "AI-powered outfit suggestions",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Top navigation bar */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="text-lg font-semibold text-white">
              Fit Check
            </div>

            {/* Shows only when logged in */}
            <AccountMenu />
          </header>

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
