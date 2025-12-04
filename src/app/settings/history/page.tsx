"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home, 
  ChevronRight, 
  Shield,
  Users,
  History,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClient";
import {
  getLoginHistory,
  formatLoginDate,
  type LoginHistoryEntry,
} from "@/lib/sessions";
import { toast } from "sonner";

// Sidebar navigation
const settingsNav = [
  { label: "Account & Security", href: "/settings", icon: Shield },
  { label: "Team & Permissions", href: "/settings/team", icon: Users },
  { label: "Login History", href: "/settings/history", icon: History },
];

export default function LoginHistoryPage() {
  const pathname = "/settings/history";
  const [loginHistory, setLoginHistory] = useState<LoginHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(50);

  const loadLoginHistory = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await getLoginHistory({ limit });
      if (error) throw error;
      // Filter by status on client side
      const filtered = statusFilter === "all" 
        ? data 
        : data?.filter(entry => entry.status === statusFilter);
      setLoginHistory(filtered || []);
    } catch (error) {
      console.error("Error loading login history:", error);
      toast.error("Failed to load login history");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLoginHistory();
  }, [statusFilter, limit]);

  const filteredHistory = loginHistory.filter(entry => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      (entry.device_name?.toLowerCase().includes(searchLower)) ||
      (entry.browser?.toLowerCase().includes(searchLower)) ||
      (entry.location?.toLowerCase().includes(searchLower)) ||
      (entry.ip_address?.toLowerCase().includes(searchLower))
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="success" className="bg-green-100 text-green-700">Success</Badge>;
      case "failed":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Failed</Badge>;
      case "blocked":
        return <Badge variant="destructive">Blocked</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDeviceIcon = (deviceType?: string) => {
    switch (deviceType) {
      case "mobile":
        return <Smartphone className="h-4 w-4 text-muted-foreground" />;
      case "tablet":
        return <Tablet className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Monitor className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const exportHistory = () => {
    const csv = [
      ["Date", "Status", "Device", "Browser", "Location", "IP Address"].join(","),
      ...filteredHistory.map(entry => [
        formatLoginDate(entry.created_at),
        entry.status,
        entry.device_name || "Unknown",
        entry.browser || "Unknown",
        entry.location || "Unknown",
        entry.ip_address || "Unknown"
      ].map(v => `"${v}"`).join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `login-history-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Login history exported");
  };

  // Stats
  const successCount = loginHistory.filter(e => e.status === "success").length;
  const failedCount = loginHistory.filter(e => e.status === "failed").length;
  const blockedCount = loginHistory.filter(e => e.status === "blocked").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Bar */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <Link href="/settings" className="text-muted-foreground hover:text-foreground">
              Settings
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Login History</span>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Login History</h1>
            <p className="text-muted-foreground mt-1">View all login attempts to your account</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* Sidebar */}
          <div>
            <Card>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {settingsNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        pathname === item.href 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{successCount}</p>
                      <p className="text-sm text-muted-foreground">Successful Logins</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{failedCount}</p>
                      <p className="text-sm text-muted-foreground">Failed Attempts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{blockedCount}</p>
                      <p className="text-sm text-muted-foreground">Blocked Attempts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Login History Table */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">All Login Activity</CardTitle>
                    <CardDescription>Complete history of login attempts</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={loadLoginHistory} disabled={isLoading}>
                      <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm" onClick={exportHistory}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Filters */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 max-w-sm">
                    <Input
                      placeholder="Search by device, location, IP..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={limit.toString()} onValueChange={(v) => setLimit(parseInt(v))}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Show" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25 entries</SelectItem>
                      <SelectItem value="50">50 entries</SelectItem>
                      <SelectItem value="100">100 entries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Table */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">No login history found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery || statusFilter !== "all" 
                        ? "Try adjusting your filters" 
                        : "Login attempts will appear here"}
                    </p>
                  </div>
                ) : (
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Device</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>IP Address</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHistory.map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{formatLoginDate(entry.created_at)}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(entry.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getDeviceIcon(entry.device_type)}
                                <div>
                                  <p className="text-sm font-medium">{entry.device_name || "Unknown Device"}</p>
                                  <p className="text-xs text-muted-foreground">{entry.browser || "Unknown Browser"}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{entry.location || "Unknown"}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <code className="text-xs bg-muted px-2 py-1 rounded">
                                {entry.ip_address || "—"}
                              </code>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {/* Pagination info */}
                {filteredHistory.length > 0 && (
                  <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                    <p>Showing {filteredHistory.length} of {loginHistory.length} entries</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
