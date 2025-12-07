"use client";

import Link from "next/link";

import { Logo } from "@/components/ui/logo";
import { BackToTop } from "@/components/ui/back-to-top";
import { MessagesButton, MessagesFooterButton } from "@/components/MessagesButton";
import { useAuth } from "@/components/providers/auth-provider";
import { useMessaging } from "@/lib/hooks";

export function AppFooter() {
  // Получаем текущего пользователя
  const { user } = useAuth();
  // Получаем количество новых сообщений (сумма unreadCount по всем беседам)
  const { conversations } = useMessaging(user?.id ?? null);
  const newMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-3">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
              A platform for trusted professionals to support
              family governance processes while maintaining
              strict confidentiality.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/families" className="text-sm text-muted-foreground hover:text-foreground">
                  Families
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="text-sm text-muted-foreground hover:text-foreground">
                  Knowledge Center
                </Link>
              </li>
              <li>
                <Link href="/consultations" className="text-sm text-muted-foreground hover:text-foreground">
                  Consultations
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Account</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/payments" className="text-sm text-muted-foreground hover:text-foreground">
                  Payments
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="text-sm text-muted-foreground hover:text-foreground">
                  Subscription
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-sm text-muted-foreground hover:text-foreground">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Support</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Need assistance? Contact our<br />support team:
            </p>
            <ul className="space-y-1.5">
              <li>
                <a href="mailto:support@familygovernance.com" className="text-sm text-primary hover:underline">
                  support@familygovernance.com
                </a>
              </li>
              <li>
                <a href="tel:+18005551234" className="text-sm text-primary hover:underline">
                  +1 (800) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>


      {/* Bottom Bar */}
      <div className="border-t border-border relative">
        <div className="container py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground/70">
            © 2025 Reluna Family. All rights reserved.  v0.1.3 Beta
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <span className="text-border">·</span>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <span className="text-border">·</span>
            <Link href="/sitemap" className="text-sm text-muted-foreground hover:text-foreground">
              Sitemap
            </Link>
          </div>
          {/* Кнопка сообщений для мобильных (в футере) */}
          <MessagesFooterButton newMessagesCount={newMessagesCount} />
        </div>
        {/* Mobile Back to Top - inside footer */}
        <BackToTop />
        {/* Кнопка сообщений для десктопа (фиксированная) */}
        <MessagesButton newMessagesCount={newMessagesCount} />
      </div>

      {/* Desktop Back to Top - fixed position */}
      <BackToTop />
    </footer>
  );
}
