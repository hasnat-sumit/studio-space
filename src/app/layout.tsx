import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioSpace — Creative Workspaces & Production Studios",
  description:
    "Discover and book peer-to-peer creative workspaces and production studios by the hour.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* The Navbar reads `usePathname()`, which can't resolve while
              prerendering the shell of routes with unknown dynamic params
              (`/studios/[id]`). Suspense lets those routes stream the navbar
              in; static routes still prerender it fully. */}
          <Suspense
            fallback={<div className="h-16 w-full border-b border-brand-border bg-brand-bg" />}
          >
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
