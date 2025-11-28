import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RE:Advisor | Dashboard",
  description: "A platform for trusted professionals to support family governance processes",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppHeader />
          <main className="flex-1">{children}</main>
          <AppFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
