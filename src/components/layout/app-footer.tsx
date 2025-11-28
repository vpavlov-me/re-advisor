import Link from "next/link";
import { Settings } from "lucide-react";

// Logo component
function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <span className="text-base font-medium text-gray-900">(</span>
      <span className="text-base font-bold text-primary">RE:</span>
      <span className="text-base font-medium text-gray-900">Advisor</span>
    </div>
  );
}

export function AppFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-3">
            <Logo />
            <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">
              A platform for trusted professionals to support
              family governance processes while maintaining
              strict confidentiality.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/families" className="text-sm text-gray-500 hover:text-gray-900">
                  Families
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="text-sm text-gray-500 hover:text-gray-900">
                  Knowledge Center
                </Link>
              </li>
              <li>
                <Link href="/consultations" className="text-sm text-gray-500 hover:text-gray-900">
                  Consultations
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Account</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/profile" className="text-sm text-gray-500 hover:text-gray-900">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-500 hover:text-gray-900">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/payments" className="text-sm text-gray-500 hover:text-gray-900">
                  Payments
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="text-sm text-gray-500 hover:text-gray-900">
                  Subscription
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-sm text-gray-500 hover:text-gray-900">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Support</h4>
            <p className="text-sm text-gray-500 mb-2">
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
      <div className="border-t border-gray-200">
        <div className="container py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025 Reluna Family. All rights reserved.  v0.1.3 Beta
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
              Privacy Policy
            </Link>
            <span className="text-gray-300">·</span>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">
              Terms of Service
            </Link>
            <span className="text-gray-300">·</span>
            <Link href="/sitemap" className="text-sm text-gray-500 hover:text-gray-900">
              Sitemap
            </Link>
            <span className="text-gray-300">·</span>
            <button className="text-gray-400 hover:text-gray-600">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
