"use client";

import Link from "next/link";
import { Home, ChevronRight, Map, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const siteStructure = [
  {
    title: "Main",
    links: [
      { name: "Dashboard", href: "/" },
      { name: "Families", href: "/families" },
      { name: "Messages", href: "/messages" },
      { name: "Consultations", href: "/consultations" },
      { name: "Knowledge Center", href: "/knowledge" },
    ]
  },
  {
    title: "Account",
    links: [
      { name: "Profile", href: "/profile" },
      { name: "Services", href: "/services" },
      { name: "Payments", href: "/payments" },
      { name: "Subscription", href: "/subscription" },
      { name: "Settings", href: "/settings" },
      { name: "Notifications", href: "/notifications" },
    ]
  },
  {
    title: "Authentication",
    links: [
      { name: "Login", href: "/auth/login" },
      { name: "Register", href: "/auth/register" },
      { name: "Forgot Password", href: "/auth/forgot-password" },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ]
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-page-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Sitemap</span>
          </div>
        </div>
      </div>

      <div className="container py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Map className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Sitemap</h1>
              <p className="text-muted-foreground">Complete list of all pages on RE:Advisor</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteStructure.map((section) => (
            <Card key={section.title}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary flex items-center gap-2 group"
                      >
                        <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
