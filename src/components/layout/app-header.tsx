"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User, Settings, CreditCard, Crown, LogOut, Loader2, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/providers/auth-provider";
import { signOut } from "@/lib/auth";
import { NotificationsDropdown } from "@/components/notifications/notifications-dropdown";
import { SearchCommand } from "@/components/search/search-command";
import { Logo } from "@/components/ui/logo";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Messages", href: "/messages" },
  { label: "Consultations", href: "/consultations" },
  { label: "Families", href: "/families" },
  { label: "Services", href: "/services" },
  { label: "Knowledge Center", href: "/knowledge" },
];

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, isAuthenticated, loading } = useAuth();
  const { setTheme, theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [loggingOut, setLoggingOut] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  // Handle scroll to show/hide header
  React.useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show header at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader);

    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  // Get user initials for avatar fallback - prefer profile data
  const userInitials = React.useMemo(() => {
    const firstName = profile?.first_name || user?.user_metadata?.first_name || "";
    const lastName = profile?.last_name || user?.user_metadata?.last_name || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "U";
  }, [profile, user]);

  // Get user display name - prefer profile data
  const userName = React.useMemo(() => {
    const firstName = profile?.first_name || user?.user_metadata?.first_name || "";
    const lastName = profile?.last_name || user?.user_metadata?.last_name || "";
    return `${firstName} ${lastName}`.trim() || user?.email?.split("@")[0] || "User";
  }, [profile, user]);

  // Get avatar URL - prefer profile data from database
  const avatarUrl = React.useMemo(() => {
    return profile?.avatar_url || user?.user_metadata?.avatar_url || null;
  }, [profile, user]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-background",
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Command */}
          <SearchCommand />

          {/* Notifications Dropdown */}
          <NotificationsDropdown />

          {/* User Avatar with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer border border-border">
                <AvatarImage src={avatarUrl || undefined} alt={userName} />
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">{userInitials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/payments" className="flex items-center cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payments & Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/subscription" className="flex items-center cursor-pointer">
                  <Crown className="mr-2 h-4 w-4" />
                  Subscription
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">Theme</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                <Sun className="mr-2 h-4 w-4" />
                Light
                {theme === "light" && <span className="ml-auto text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                <Moon className="mr-2 h-4 w-4" />
                Dark
                {theme === "dark" && <span className="ml-auto text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                <Monitor className="mr-2 h-4 w-4" />
                System
                {theme === "system" && <span className="ml-auto text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive cursor-pointer"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                {loggingOut ? "Logging out..." : "Log out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm rounded-md",
                  pathname === item.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
