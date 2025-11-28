import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ProtectedRoute } from "@/components/providers/protected-route";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { PushNotificationPrompt } from "@/components/notifications/push-notification-prompt";

const inter = Inter({ subsets: ["latin"] });

// Get base path from environment
const basePath = process.env.NODE_ENV === 'production' ? '/re-advisor' : '';

export const metadata: Metadata = {
  title: "RE:Advisor | Dashboard",
  description: "A platform for trusted professionals to support family governance processes",
  icons: {
    icon: `${basePath}/favicon.png`,
    apple: `${basePath}/favicon.png`,
  },
  manifest: `${basePath}/manifest.json`,
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
        <link rel="apple-touch-icon" href={`${basePath}/favicon.png`} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
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
                  var swPath = '${basePath}/sw.js';
                  var swScope = '${basePath}/';
                  navigator.serviceWorker.register(swPath, { scope: swScope }).then(
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
