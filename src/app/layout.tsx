import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ProtectedRoute } from "@/components/providers/protected-route";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { PushNotificationPrompt } from "@/components/notifications/push-notification-prompt";
import { HashHandler } from "@/components/auth/hash-handler";

export const metadata: Metadata = {
  title: "RE:Advisor | Dashboard",
  description: "A platform for trusted professionals to support family governance processes",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RE:Advisor",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <HashHandler />
          <AuthProvider>
            <ProtectedRoute>
              <LayoutWrapper>{children}</LayoutWrapper>
              <PushNotificationPrompt />
            </ProtectedRoute>
          </AuthProvider>
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                      
                      // Check for updates
                      registration.addEventListener('updatefound', function() {
                        var newWorker = registration.installing;
                        newWorker.addEventListener('statechange', function() {
                          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('New content available; please refresh.');
                          }
                        });
                      });
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
