"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Home,
  ChevronRight,
  CreditCard,
  DollarSign,
  Monitor,
  Download,
  FileText,
  Calendar,
  Search,
  Filter,
  Loader2,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/lib/auth";
import { getTransactions } from "@/lib/supabase/payments";

// Sidebar navigation - Payments section
const paymentsNav = [
  { label: "Payment Methods", href: "/payments", icon: CreditCard },
  { label: "Subscription", href: "/subscription", icon: Monitor },
  { label: "Invoices", href: "/payments/invoices", icon: DollarSign },
];

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: string;
  status: "paid" | "pending" | "overdue";
  description: string;
  type: string;
}

// Mock invoices data
const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-2024-001",
    date: "Nov 25, 2024",
    dueDate: "Dec 25, 2024",
    amount: "$99.00",
    status: "paid",
    description: "Premium Subscription - December 2024",
    type: "subscription"
  },
  {
    id: "2",
    number: "INV-2024-002",
    date: "Oct 25, 2024",
    dueDate: "Nov 25, 2024",
    amount: "$99.00",
    status: "paid",
    description: "Premium Subscription - November 2024",
    type: "subscription"
  },
  {
    id: "3",
    number: "INV-2024-003",
    date: "Sep 25, 2024",
    dueDate: "Oct 25, 2024",
    amount: "$99.00",
    status: "paid",
    description: "Premium Subscription - October 2024",
    type: "subscription"
  },
  {
    id: "4",
    number: "INV-2024-004",
    date: "Aug 25, 2024",
    dueDate: "Sep 25, 2024",
    amount: "$49.00",
    status: "paid",
    description: "Standard Subscription - September 2024",
    type: "subscription"
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const user = await getCurrentUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        // Try to fetch transactions and convert to invoices
        try {
          const transactions = await getTransactions(50);
          if (transactions && transactions.length > 0) {
            const invoicesFromTx = transactions
              .filter((t: any) => t.type === "subscription" || t.invoice_id)
              .map((t: any, index: number) => ({
                id: t.id?.toString() || String(index),
                number: t.invoice_id || `INV-${String(t.id).padStart(6, '0')}`,
                date: new Date(t.date || t.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                dueDate: new Date(new Date(t.date || t.created_at).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                amount: String(t.amount || "$0"),
                status: (t.status === "completed" ? "paid" : t.status === "pending" ? "pending" : "paid") as "paid" | "pending" | "overdue",
                description: t.description || "Invoice",
                type: t.type || "other"
              }));
            if (invoicesFromTx.length > 0) {
              setInvoices(invoicesFromTx);
            }
          }
        } catch (e) {
          console.warn("Could not fetch invoices from transactions:", e);
        }
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadInvoice = (invoice: Invoice) => {
    // Generate HTML invoice content
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice ${invoice.number}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
          .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
          .invoice-info { text-align: right; }
          .invoice-number { font-size: 20px; font-weight: bold; margin-bottom: 5px; }
          .date { color: #6b7280; }
          .divider { border-top: 1px solid #e5e7eb; margin: 30px 0; }
          .parties { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .party { flex: 1; }
          .party-label { font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; }
          .party-name { font-weight: 600; margin-bottom: 4px; }
          .party-details { color: #6b7280; font-size: 14px; }
          .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .items-table th { text-align: left; padding: 12px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; font-size: 12px; text-transform: uppercase; color: #6b7280; }
          .items-table td { padding: 16px 12px; border-bottom: 1px solid #e5e7eb; }
          .amount { text-align: right; }
          .totals { margin-left: auto; width: 300px; }
          .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
          .total-row.final { font-weight: bold; font-size: 18px; border-top: 2px solid #111; padding-top: 16px; margin-top: 8px; }
          .status { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 500; }
          .status.paid { background: #dcfce7; color: #166534; }
          .status.pending { background: #fef9c3; color: #854d0e; }
          .status.overdue { background: #fee2e2; color: #991b1b; }
          .footer { margin-top: 60px; text-align: center; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">RE:Advisor</div>
          <div class="invoice-info">
            <div class="invoice-number">${invoice.number}</div>
            <div class="date">${invoice.date}</div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="parties">
          <div class="party">
            <div class="party-label">From</div>
            <div class="party-name">RE:Advisor Platform</div>
            <div class="party-details">
              123 Business Avenue<br>
              New York, NY 10001<br>
              United States
            </div>
          </div>
          <div class="party">
            <div class="party-label">To</div>
            <div class="party-name">Advisor Account</div>
            <div class="party-details">
              Invoice: ${invoice.number}<br>
              Due Date: ${invoice.dueDate}
            </div>
          </div>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Status</th>
              <th class="amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${invoice.description}</td>
              <td><span class="status ${invoice.status}">${invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span></td>
              <td class="amount">${invoice.amount}</td>
            </tr>
          </tbody>
        </table>

        <div class="totals">
          <div class="total-row">
            <span>Subtotal</span>
            <span>${invoice.amount}</span>
          </div>
          <div class="total-row">
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div class="total-row final">
            <span>Total</span>
            <span>${invoice.amount}</span>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for your business!</p>
          <p>This is a computer-generated invoice and does not require a signature.</p>
        </div>
      </body>
      </html>
    `;

    // Open in new window for printing/saving as PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(invoiceHtml);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="success">Paid</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-page-background">
      {/* Breadcrumb Bar */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <Link href="/payments" className="text-muted-foreground hover:text-foreground">
              Payments & Billing
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Invoices</span>
          </div>
        </div>
      </div>

      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
            <p className="text-muted-foreground mt-1">
              View and download your billing history and invoices.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* Sidebar */}
          <div>
            <Card>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {paymentsNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        item.href === "/payments/invoices"
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

            {/* Summary Card */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">Total Invoices</div>
                <div className="text-2xl font-semibold text-foreground">{invoices.length}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {invoices.filter(i => i.status === "paid").length} paid
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-3">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Invoice History</CardTitle>
                    <CardDescription>All your invoices and billing documents</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search invoices..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-[200px]"
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 gap-1">
                          <Filter className="h-3.5 w-3.5" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={filterStatus === "all"}
                          onCheckedChange={() => setFilterStatus("all")}
                        >
                          All
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filterStatus === "paid"}
                          onCheckedChange={() => setFilterStatus("paid")}
                        >
                          Paid
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filterStatus === "pending"}
                          onCheckedChange={() => setFilterStatus("pending")}
                        >
                          Pending
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filterStatus === "overdue"}
                          onCheckedChange={() => setFilterStatus("overdue")}
                        >
                          Overdue
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Loading invoices...</span>
                  </div>
                ) : filteredInvoices.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">No invoices found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery || filterStatus !== "all"
                        ? "Try adjusting your search or filter"
                        : "Your invoices will appear here"}
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.number}</TableCell>
                          <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                          <TableCell>{invoice.description}</TableCell>
                          <TableCell>{invoice.amount}</TableCell>
                          <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDownloadInvoice(invoice)}
                              title="Download Invoice"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
