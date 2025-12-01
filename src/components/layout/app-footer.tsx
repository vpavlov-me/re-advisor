"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function AppFooter() {
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
      <div className="border-t border-border">
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
            <span className="text-border">·</span>
            <button className="text-muted-foreground/70 hover:text-foreground">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
