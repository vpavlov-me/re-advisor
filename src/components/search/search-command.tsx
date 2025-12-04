"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  BookOpen,
  Settings,
  User,
  CreditCard,
  Bell,
  Crown,
  FileText,
  Briefcase,
  Search,
  ArrowRight
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

// Quick navigation items
const navigationItems = [
  { name: "Dashboard", href: "/", icon: Home, keywords: ["home", "main", "overview"] },
  { name: "Families", href: "/families", icon: Users, keywords: ["clients", "family", "members"] },
  { name: "Consultations", href: "/consultations", icon: Calendar, keywords: ["meetings", "appointments", "schedule"] },
  { name: "Messages", href: "/messages", icon: MessageSquare, keywords: ["chat", "inbox", "communication"] },
  { name: "Knowledge Center", href: "/knowledge", icon: BookOpen, keywords: ["resources", "learning", "education"] },
  { name: "Profile", href: "/profile", icon: User, keywords: ["account", "personal", "info"] },
  { name: "Settings", href: "/settings", icon: Settings, keywords: ["preferences", "configuration"] },
  { name: "Payments", href: "/payments", icon: CreditCard, keywords: ["billing", "transactions", "invoices"] },
  { name: "Notifications", href: "/notifications", icon: Bell, keywords: ["alerts", "updates"] },
  { name: "Subscription", href: "/subscription", icon: Crown, keywords: ["plan", "upgrade", "pricing"] },
  { name: "Services", href: "/services", icon: Briefcase, keywords: ["offerings", "packages"] },
];

// Quick actions
const quickActions = [
  { name: "Schedule Consultation", href: "/consultations", icon: Calendar, action: "schedule" },
  { name: "Send Message", href: "/messages", icon: MessageSquare, action: "compose" },
  { name: "Add Family", href: "/families", icon: Users, action: "add" },
  { name: "Create Learning Path", href: "/knowledge/learning-path/create", icon: BookOpen, action: "create" },
  { name: "Family Constitution", href: "/knowledge/constitution/create", icon: FileText, action: "create" },
];

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      {/* Search Button */}
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, actions, or type a command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* Navigation Group */}
          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.name} ${item.keywords.join(" ")}`}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
                <CommandShortcut>
                  <ArrowRight className="h-3 w-3" />
                </CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Quick Actions Group */}
          <CommandGroup heading="Quick Actions">
            {quickActions.map((item) => (
              <CommandItem
                key={`${item.name}-${item.action}`}
                value={`${item.name} ${item.action}`}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Settings Group */}
          <CommandGroup heading="Settings">
            <CommandItem
              value="Team management settings"
              onSelect={() => runCommand(() => router.push("/settings/team"))}
            >
              <Users className="mr-2 h-4 w-4" />
              <span>Team Management</span>
            </CommandItem>
            <CommandItem
              value="Availability settings schedule"
              onSelect={() => runCommand(() => router.push("/consultations"))}
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>Availability Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
