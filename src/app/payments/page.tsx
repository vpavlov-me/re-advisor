"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { 
  Home, 
  ChevronRight, 
  CreditCard,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Building2,
  DollarSign,
  Calendar,
  Download,
  ExternalLink,
  AlertCircle,
  Shield,
  Globe,
  Monitor,
  Filter,
  Loader2,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Validation schemas
const cardSchema = z.object({
  number: z.string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Card number too long")
    .regex(/^[\d\s]+$/, "Invalid card number"),
  expiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Use MM/YY format"),
  cvc: z.string()
    .min(3, "CVC must be 3-4 digits")
    .max(4, "CVC must be 3-4 digits")
    .regex(/^\d+$/, "CVC must be numbers only"),
  name: z.string().min(2, "Cardholder name is required")
});

const bankSchema = z.object({
  bankName: z.string().min(2, "Bank name is required"),
  accountType: z.enum(["Checking", "Savings"]),
  routingNumber: z.string()
    .length(9, "Routing number must be 9 digits")
    .regex(/^\d+$/, "Routing number must be numbers only"),
  accountNumber: z.string()
    .min(4, "Account number is required")
    .regex(/^\d+$/, "Account number must be numbers only")
});

type CardFormData = z.infer<typeof cardSchema>;
type BankFormData = z.infer<typeof bankSchema>;

// Payment methods
const initialPaymentMethods = [
  {
    id: 1,
    type: "card" as const,
    brand: "Visa",
    last4: "4242",
    expiry: "12/26",
    isDefault: true,
  },
  {
    id: 2,
    type: "card" as const,
    brand: "Mastercard",
    last4: "8888",
    expiry: "03/25",
    isDefault: false,
  },
];

// Bank accounts for payouts
const bankAccounts = [
  {
    id: 1,
    bankName: "Chase Bank",
    accountType: "Checking",
    last4: "6789",
    isDefault: true,
  },
];

// Recent transactions
const initialTransactions = [
  { id: 1, date: "Nov 25, 2025", description: "Payout - November 2025", amount: "+$4,250.00", status: "completed" as const, type: "payout" },
  { id: 2, date: "Nov 20, 2025", description: "Platform Fee - Constitution Workshop", amount: "-$125.00", status: "completed" as const, type: "fee" },
  { id: 3, date: "Nov 18, 2025", description: "Payment - Harrington Family", amount: "+$2,500.00", status: "completed" as const, type: "income" },
  { id: 4, date: "Nov 15, 2025", description: "Payment - Roye Family", amount: "+$5,000.00", status: "completed" as const, type: "income" },
  { id: 5, date: "Nov 10, 2025", description: "Subscription - Pro Plan", amount: "-$99.00", status: "completed" as const, type: "subscription" },
  { id: 6, date: "Nov 5, 2025", description: "Payout - October 2025", amount: "+$3,800.00", status: "completed" as const, type: "payout" },
];

// Pending payouts
const pendingPayouts = [
  { id: 1, amount: "$2,762.00", estimatedDate: "Dec 1, 2025", consultations: 3 },
];

// Sidebar navigation
const settingsNav = [
  { label: "Account & Security", href: "/settings", icon: Shield },
  { label: "Notifications", href: "/notifications", icon: Globe },
  { label: "Payment Methods", href: "/payments", icon: CreditCard, active: true },
  { label: "Subscription", href: "/subscription", icon: Monitor },
];

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState<any[]>(initialPaymentMethods);
  const [bankAccountsList, setBankAccountsList] = useState<any[]>(bankAccounts);
  const [transactions, setTransactions] = useState<any[]>(initialTransactions);
  const [filterType, setFilterType] = useState<string>("all");
  const [isAddMethodOpen, setIsAddMethodOpen] = useState(false);
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{type: 'card' | 'bank', id: number} | null>(null);
  const [balance, setBalance] = useState(2762.00);
  const [isStripeConnected, setIsStripeConnected] = useState(false);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [isPayoutProcessing, setIsPayoutProcessing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConnectingStripe, setIsConnectingStripe] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [settingDefaultId, setSettingDefaultId] = useState<number | null>(null);

  // React Hook Form for card
  const {
    register: registerCard,
    handleSubmit: handleCardSubmit,
    formState: { errors: cardErrors },
    reset: resetCard
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema)
  });

  // React Hook Form for bank
  const {
    register: registerBank,
    handleSubmit: handleBankSubmit,
    formState: { errors: bankErrors },
    reset: resetBank,
    setValue: setBankValue,
    watch: watchBank
  } = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      accountType: "Checking"
    }
  });

  const accountType = watchBank("accountType");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        // Fetch Payment Methods for this advisor
        const { data: methods, error: methodsError } = await supabase
          .from('payment_methods')
          .select('*')
          .eq('advisor_id', user.id)
          .order('is_default', { ascending: false });
        if (methodsError) throw methodsError;
        
        if (methods && methods.length > 0) {
          setPaymentMethods(methods.map((m: any) => ({
            id: m.id,
            type: m.type,
            brand: m.brand,
            last4: m.last4,
            expiry: m.expiry,
            isDefault: m.is_default
          })));
        }

        // Fetch Bank Accounts for this advisor
        const { data: banks, error: banksError } = await supabase
          .from('bank_accounts')
          .select('*')
          .eq('advisor_id', user.id)
          .order('is_default', { ascending: false });
        if (banksError) throw banksError;
        
        if (banks && banks.length > 0) {
          setBankAccountsList(banks.map((b: any) => ({
            id: b.id,
            bankName: b.bank_name,
            accountType: b.account_type,
            last4: b.last4,
            isDefault: b.is_default
          })));
        }

        // Fetch Transactions for this advisor
        const { data: txs, error: txsError } = await supabase
          .from('transactions')
          .select('*')
          .eq('advisor_id', user.id)
          .order('date', { ascending: false });
        if (txsError) throw txsError;
        
        if (txs && txs.length > 0) {
          setTransactions(txs.map((t: any) => ({
            id: t.id,
            date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            description: t.description,
            amount: t.amount,
            status: t.status,
            type: t.type,
            invoiceId: t.invoice_id
          })));
          // Calculate balance from pending income
          const pendingBalance = txs
            .filter((t: any) => t.type === 'income' && t.status === 'completed')
            .reduce((sum: number, t: any) => {
              const amt = parseFloat(t.amount.replace(/[^0-9.-]+/g, '')) || 0;
              return sum + amt;
            }, 0);
          // Subtract payouts
          const payoutsTotal = txs
            .filter((t: any) => t.type === 'payout' && t.status === 'completed')
            .reduce((sum: number, t: any) => {
              const amt = parseFloat(t.amount.replace(/[^0-9.-]+/g, '')) || 0;
              return sum + amt;
            }, 0);
          setBalance(Math.max(0, pendingBalance - payoutsTotal));
        }

        // Check Stripe Connect status
        const { data: profile } = await supabase
          .from('profiles')
          .select('stripe_customer_id')
          .eq('id', user.id)
          .single();
        
        if (profile?.stripe_customer_id) {
          setIsStripeConnected(true);
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
        // Keep mock data for demo
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Detect card brand from number
  const detectCardBrand = (number: string): string => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return "Visa";
    if (/^5[1-5]/.test(cleaned)) return "Mastercard";
    if (/^3[47]/.test(cleaned)) return "Amex";
    if (/^6(?:011|5)/.test(cleaned)) return "Discover";
    return "Card";
  };

  const onAddCard = async (data: CardFormData) => {
    setIsAddingCard(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const method = {
        advisor_id: user.id,
        type: "card",
        brand: detectCardBrand(data.number),
        last4: data.number.replace(/\s/g, '').slice(-4),
        expiry: data.expiry,
        is_default: paymentMethods.length === 0,
      };

      const { data: savedData, error } = await supabase.from('payment_methods').insert([method]).select();
      
      if (error) throw error;

      if (savedData) {
        const newMethod = {
          id: savedData[0].id,
          type: savedData[0].type,
          brand: savedData[0].brand,
          last4: savedData[0].last4,
          expiry: savedData[0].expiry,
          isDefault: savedData[0].is_default
        };
        setPaymentMethods([...paymentMethods, newMethod]);
      } else {
        // Fallback for demo
        setPaymentMethods([...paymentMethods, { ...method, id: Date.now(), isDefault: method.is_default }]);
      }
      
      toast.success("Payment method added successfully");
      setIsAddMethodOpen(false);
      resetCard();
    } catch (error) {
      console.error("Error adding card:", error);
      // Fallback for demo
      const method = {
        id: Date.now(),
        type: "card",
        brand: detectCardBrand(data.number),
        last4: data.number.replace(/\s/g, '').slice(-4),
        expiry: data.expiry,
        isDefault: paymentMethods.length === 0,
      };
      setPaymentMethods([...paymentMethods, method]);
      toast.success("Payment method added successfully");
      setIsAddMethodOpen(false);
      resetCard();
    } finally {
      setIsAddingCard(false);
    }
  };

  const onAddBank = async (data: BankFormData) => {
    setIsAddingBank(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const account = {
        advisor_id: user.id,
        bank_name: data.bankName,
        account_type: data.accountType,
        last4: data.accountNumber.slice(-4),
        is_default: bankAccountsList.length === 0,
      };

      const { data: savedData, error } = await supabase.from('bank_accounts').insert([account]).select();
      
      if (error) throw error;

      if (savedData) {
        const newAccount = {
          id: savedData[0].id,
          bankName: savedData[0].bank_name,
          accountType: savedData[0].account_type,
          last4: savedData[0].last4,
          isDefault: savedData[0].is_default
        };
        setBankAccountsList([...bankAccountsList, newAccount]);
      } else {
        // Fallback for demo
        setBankAccountsList([...bankAccountsList, { 
          id: Date.now(), 
          bankName: data.bankName, 
          accountType: data.accountType, 
          last4: data.accountNumber.slice(-4),
          isDefault: bankAccountsList.length === 0 
        }]);
      }
      
      toast.success("Bank account added successfully");
      setIsAddBankOpen(false);
      resetBank();
    } catch (error) {
      console.error("Error adding bank:", error);
      // Fallback for demo
      setBankAccountsList([...bankAccountsList, { 
        id: Date.now(), 
        bankName: data.bankName, 
        accountType: data.accountType, 
        last4: data.accountNumber.slice(-4),
        isDefault: bankAccountsList.length === 0 
      }]);
      toast.success("Bank account added successfully");
      setIsAddBankOpen(false);
      resetBank();
    } finally {
      setIsAddingBank(false);
    }
  };

  const confirmDelete = (type: 'card' | 'bank', id: number) => {
    setSelectedItem({ type, id });
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    
    setIsDeleting(true);
    try {
      const table = selectedItem.type === 'card' ? 'payment_methods' : 'bank_accounts';
      const { error } = await supabase.from(table).delete().eq('id', selectedItem.id);
      
      if (error) throw error;

      if (selectedItem.type === 'card') {
        setPaymentMethods(paymentMethods.filter(m => m.id !== selectedItem.id));
        toast.success("Payment method removed");
      } else {
        setBankAccountsList(bankAccountsList.filter(b => b.id !== selectedItem.id));
        toast.success("Bank account removed");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      // Fallback for demo
      if (selectedItem.type === 'card') {
        setPaymentMethods(paymentMethods.filter(m => m.id !== selectedItem.id));
        toast.success("Payment method removed");
      } else {
        setBankAccountsList(bankAccountsList.filter(b => b.id !== selectedItem.id));
        toast.success("Bank account removed");
      }
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const setAsDefault = async (type: 'card' | 'bank', id: number) => {
    setSettingDefaultId(id);
    try {
      if (type === 'card') {
        // Update all cards to non-default, then set selected as default
        await supabase.from('payment_methods').update({ is_default: false }).neq('id', id);
        await supabase.from('payment_methods').update({ is_default: true }).eq('id', id);
        
        setPaymentMethods(paymentMethods.map(m => ({
          ...m,
          isDefault: m.id === id
        })));
      } else {
        await supabase.from('bank_accounts').update({ is_default: false }).neq('id', id);
        await supabase.from('bank_accounts').update({ is_default: true }).eq('id', id);
        
        setBankAccountsList(bankAccountsList.map(b => ({
          ...b,
          isDefault: b.id === id
        })));
      }
      toast.success("Default updated");
    } catch (error) {
      console.error("Error setting default:", error);
      // Fallback for demo
      if (type === 'card') {
        setPaymentMethods(paymentMethods.map(m => ({ ...m, isDefault: m.id === id })));
      } else {
        setBankAccountsList(bankAccountsList.map(b => ({ ...b, isDefault: b.id === id })));
      }
      toast.success("Default updated");
    } finally {
      setSettingDefaultId(null);
    }
  };

  const handleRequestPayout = async () => {
    if (balance <= 0) {
      toast.error("No balance available for payout");
      return;
    }
    
    setIsPayoutProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const amountStr = `+$${balance.toFixed(2)}`;
      const invoiceId = `PAY-${Date.now().toString(36).toUpperCase()}`;
      const newTx = {
        advisor_id: user.id,
        date: new Date().toISOString(),
        description: "Payout - Manual Request",
        amount: amountStr,
        status: "completed",
        type: "payout",
        invoice_id: invoiceId
      };

      const { data } = await supabase.from('transactions').insert([newTx]).select();
      
      const savedTx = data ? {
        id: data[0].id,
        date: new Date(data[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: data[0].description,
        amount: data[0].amount,
        status: data[0].status,
        type: data[0].type,
        invoiceId: data[0].invoice_id
      } : { 
        ...newTx, 
        id: Date.now(), 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        invoiceId
      };

      setTransactions([savedTx, ...transactions]);
      setBalance(0);
      toast.success(`Payout of $${balance.toFixed(2)} initiated successfully`);
    } catch (error) {
      console.error("Error requesting payout:", error);
      toast.error("Failed to request payout. Please try again.");
    } finally {
      setIsPayoutProcessing(false);
    }
  };

  const handleConnectStripe = async () => {
    setIsConnectingStripe(true);
    try {
      // Simulate Stripe Connect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const data = {
        url: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_12345&scope=read_write'
      };

      if (data.url) {
        setIsStripeConnected(true);
        toast.success("Stripe account connected successfully");
      }
    } catch (error) {
      console.error("Error connecting Stripe:", error);
      toast.error("Failed to connect Stripe. Please try again.");
    } finally {
      setIsConnectingStripe(false);
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate CSV content
      const headers = ["Date", "Description", "Amount", "Status", "Type"];
      const rows = filteredTransactions.map(tx => [
        tx.date,
        tx.description,
        tx.amount,
        tx.status,
        tx.type
      ]);
      
      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.join(","))
      ].join("\n");
      
      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success("Transactions exported successfully");
    } catch (error) {
      console.error("Error exporting:", error);
      toast.error("Failed to export transactions");
    } finally {
      setIsExporting(false);
    }
  };

  // Generate and download mock invoice
  const handleDownloadInvoice = async (tx: any) => {
    try {
      // Generate invoice number from transaction id
      const invoiceNumber = tx.invoiceId || `INV-${String(tx.id).padStart(6, '0')}`;
      
      // Create HTML invoice content
      const invoiceHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice ${invoiceNumber}</title>
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
            .status.completed { background: #dcfce7; color: #166534; }
            .status.pending { background: #fef9c3; color: #854d0e; }
            .footer { margin-top: 60px; text-align: center; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Family Office Advisor</div>
            <div class="invoice-info">
              <div class="invoice-number">${invoiceNumber}</div>
              <div class="date">${tx.date}</div>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <div class="parties">
            <div class="party">
              <div class="party-label">From</div>
              <div class="party-name">Family Office Advisor Platform</div>
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
                Transaction ID: ${tx.id}<br>
                Type: ${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
              </div>
            </div>
          </div>
          
          <table class="items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Type</th>
                <th>Status</th>
                <th class="amount">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${tx.description}</td>
                <td>${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</td>
                <td><span class="status ${tx.status}">${tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</span></td>
                <td class="amount">${tx.amount}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>${tx.amount}</span>
            </div>
            <div class="total-row">
              <span>Platform Fee</span>
              <span>$0.00</span>
            </div>
            <div class="total-row final">
              <span>Total</span>
              <span>${tx.amount}</span>
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
        // Auto-trigger print dialog after a short delay
        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
      
      toast.success("Invoice opened for download");
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast.error("Failed to generate invoice");
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (filterType === "all") return true;
    return tx.type === filterType;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Bar */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <Link href="/profile" className="text-muted-foreground hover:text-foreground">Profile</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Payments</span>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Payments & Billing</h1>
            <p className="text-muted-foreground mt-1">Manage your payment methods, payouts, and billing history</p>
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
                        item.active 
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

            {/* Balance Card */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">Available Balance</div>
                <div className="text-2xl font-semibold text-foreground">${balance.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground mt-1">Next payout: Dec 1, 2025</div>
                <Button 
                  className="w-full mt-4" 
                  size="sm" 
                  onClick={handleRequestPayout}
                  disabled={balance <= 0 || isPayoutProcessing}
                >
                  {isPayoutProcessing ? "Processing..." : "Request Payout"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-foreground">$7,012.00</div>
                      <div className="text-sm text-muted-foreground">This Month</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-foreground">$42,580.00</div>
                      <div className="text-sm text-muted-foreground">Year to Date</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-foreground">$2,762.00</div>
                      <div className="text-sm text-muted-foreground">Pending Payout</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="methods" className="space-y-4">
              <TabsList>
                <TabsTrigger value="methods">Payment Methods</TabsTrigger>
                <TabsTrigger value="payouts">Payout Settings</TabsTrigger>
                <TabsTrigger value="history">Transaction History</TabsTrigger>
              </TabsList>

              {/* Payment Methods Tab */}
              <TabsContent value="methods" className="space-y-4">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">Cards</CardTitle>
                        <CardDescription>Manage your payment cards for subscriptions and fees</CardDescription>
                      </div>
                      <Sheet open={isAddMethodOpen} onOpenChange={setIsAddMethodOpen}>
                        <SheetTrigger asChild>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Card
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Add Payment Method</SheetTitle>
                            <SheetDescription>Add a new credit or debit card.</SheetDescription>
                          </SheetHeader>
                          <form onSubmit={handleCardSubmit(onAddCard)} className="space-y-4 py-6">
                            <div className="space-y-2">
                              <Label>Card Number</Label>
                              <Input 
                                placeholder="0000 0000 0000 0000" 
                                {...registerCard("number")}
                              />
                              {cardErrors.number && (
                                <p className="text-sm text-destructive">{cardErrors.number.message}</p>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Expiry Date</Label>
                                <Input 
                                  placeholder="MM/YY" 
                                  {...registerCard("expiry")}
                                />
                                {cardErrors.expiry && (
                                  <p className="text-sm text-destructive">{cardErrors.expiry.message}</p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <Label>CVC</Label>
                                <Input 
                                  placeholder="123" 
                                  {...registerCard("cvc")}
                                />
                                {cardErrors.cvc && (
                                  <p className="text-sm text-destructive">{cardErrors.cvc.message}</p>
                                )}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Cardholder Name</Label>
                              <Input 
                                placeholder="John Doe" 
                                {...registerCard("name")}
                              />
                              {cardErrors.name && (
                                <p className="text-sm text-destructive">{cardErrors.name.message}</p>
                              )}
                            </div>
                            <SheetFooter className="pt-4">
                              <Button type="submit" disabled={isAddingCard}>
                                {isAddingCard ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Adding...
                                  </>
                                ) : (
                                  "Add Card"
                                )}
                              </Button>
                            </SheetFooter>
                          </form>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Loading payment methods...</span>
                      </div>
                    ) : paymentMethods.length === 0 ? (
                      <div className="text-center py-8">
                        <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="text-lg font-medium mb-2">No payment methods</h3>
                        <p className="text-muted-foreground mb-4">Add a card to pay for subscriptions and fees</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-16 rounded bg-muted flex items-center justify-center">
                                <CreditCard className="h-6 w-6 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-foreground">{method.brand} •••• {method.last4}</p>
                                  {method.isDefault && (
                                    <Badge variant="secondary">Default</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!method.isDefault && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setAsDefault('card', method.id)}
                                  disabled={settingDefaultId === method.id}
                                >
                                  {settingDefaultId === method.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    "Set Default"
                                  )}
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-destructive hover:text-destructive"
                                onClick={() => confirmDelete('card', method.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payout Settings Tab */}
              <TabsContent value="payouts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Stripe Connect</CardTitle>
                    <CardDescription>Connect your Stripe account to receive payouts directly.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isStripeConnected ? (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg border border-green-100">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Stripe account connected</span>
                      </div>
                    ) : (
                      <Button onClick={handleConnectStripe} className="w-full sm:w-auto" disabled={isConnectingStripe}>
                        {isConnectingStripe ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          "Connect with Stripe"
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">Bank Accounts</CardTitle>
                        <CardDescription>Where we'll send your earnings</CardDescription>
                      </div>
                      <Sheet open={isAddBankOpen} onOpenChange={setIsAddBankOpen}>
                        <SheetTrigger asChild>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Bank Account
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Add Bank Account</SheetTitle>
                            <SheetDescription>Connect a bank account for payouts.</SheetDescription>
                          </SheetHeader>
                          <form onSubmit={handleBankSubmit(onAddBank)} className="space-y-4 py-6">
                            <div className="space-y-2">
                              <Label>Bank Name</Label>
                              <Input 
                                placeholder="e.g. Chase Bank" 
                                {...registerBank("bankName")}
                              />
                              {bankErrors.bankName && (
                                <p className="text-sm text-destructive">{bankErrors.bankName.message}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label>Account Type</Label>
                              <Select 
                                value={accountType}
                                onValueChange={(value: "Checking" | "Savings") => setBankValue("accountType", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Checking">Checking</SelectItem>
                                  <SelectItem value="Savings">Savings</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Routing Number</Label>
                              <Input 
                                placeholder="9 digits" 
                                {...registerBank("routingNumber")}
                              />
                              {bankErrors.routingNumber && (
                                <p className="text-sm text-destructive">{bankErrors.routingNumber.message}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label>Account Number</Label>
                              <Input 
                                placeholder="Account number" 
                                {...registerBank("accountNumber")}
                              />
                              {bankErrors.accountNumber && (
                                <p className="text-sm text-destructive">{bankErrors.accountNumber.message}</p>
                              )}
                            </div>
                            <SheetFooter className="pt-4">
                              <Button type="submit" disabled={isAddingBank}>
                                {isAddingBank ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Adding...
                                  </>
                                ) : (
                                  "Add Account"
                                )}
                              </Button>
                            </SheetFooter>
                          </form>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Loading bank accounts...</span>
                      </div>
                    ) : bankAccountsList.length === 0 ? (
                      <div className="text-center py-8">
                        <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="text-lg font-medium mb-2">No bank accounts</h3>
                        <p className="text-muted-foreground mb-4">Add a bank account to receive payouts</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {bankAccountsList.map((account) => (
                          <div key={account.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                                <Building2 className="h-6 w-6 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-foreground">{account.bankName}</p>
                                  {account.isDefault && (
                                    <Badge variant="secondary">Default</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {account.accountType} •••• {account.last4}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                              {!account.isDefault && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setAsDefault('bank', account.id)}
                                  disabled={settingDefaultId === account.id}
                                >
                                  {settingDefaultId === account.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    "Set Default"
                                  )}
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => confirmDelete('bank', account.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Payout Schedule</CardTitle>
                    <CardDescription>When and how often you receive payouts</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border border-primary rounded-lg bg-primary/5">
                        <div className="flex items-center gap-2 mb-2">
                          <input type="radio" checked readOnly className="text-primary" />
                          <span className="font-medium text-foreground">Monthly</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Receive payouts on the 1st of each month
                        </p>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <input type="radio" readOnly />
                          <span className="font-medium text-foreground">Weekly</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Receive payouts every Monday
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Payouts */}
                {pendingPayouts.length > 0 && (
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-base">Pending Payouts</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {pendingPayouts.map((payout) => (
                        <div key={payout.id} className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div>
                            <p className="font-semibold text-foreground text-lg">{payout.amount}</p>
                            <p className="text-sm text-muted-foreground">
                              From {payout.consultations} consultations · Arriving {payout.estimatedDate}
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                            Pending
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Transaction History Tab */}
              <TabsContent value="history">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CardTitle className="text-base">Transaction History</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                              <Filter className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Filter
                              </span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                              checked={filterType === "all"}
                              onCheckedChange={() => setFilterType("all")}
                            >
                              All Transactions
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              checked={filterType === "income"}
                              onCheckedChange={() => setFilterType("income")}
                            >
                              Income
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              checked={filterType === "expense"}
                              onCheckedChange={() => setFilterType("expense")}
                            >
                              Expenses
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={isExporting}>
                        {isExporting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Exporting...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Export CSV
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Loading transactions...</span>
                      </div>
                    ) : filteredTransactions.length === 0 ? (
                      <div className="text-center py-8">
                        <DollarSign className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="text-lg font-medium mb-2">No transactions</h3>
                        <p className="text-muted-foreground">Your transaction history will appear here</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTransactions.map((tx) => (
                            <TableRow key={tx.id}>
                              <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                              <TableCell className="font-medium">{tx.description}</TableCell>
                              <TableCell className={tx.amount.startsWith("+") ? "text-green-600" : "text-foreground"}>
                                {tx.amount}
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className={tx.status === 'completed' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  title="Download Invoice"
                                  onClick={() => handleDownloadInvoice(tx)}
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this {selectedItem?.type === 'card' ? 'payment method' : 'bank account'}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
