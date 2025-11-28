"use client";

import Link from "next/link";
import { useState } from "react";
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
  Filter
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

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
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [bankAccountsList, setBankAccountsList] = useState(bankAccounts);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filterType, setFilterType] = useState<string>("all");
  const [isAddMethodOpen, setIsAddMethodOpen] = useState(false);
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);
  const [newCard, setNewCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [newBank, setNewBank] = useState({ bankName: "", accountType: "Checking", accountNumber: "", routingNumber: "" });
  const [balance, setBalance] = useState(2762.00);
  const [isPayoutProcessing, setIsPayoutProcessing] = useState(false);
  const [isStripeConnected, setIsStripeConnected] = useState(false);

  const handleAddCard = () => {
    const method = {
      id: paymentMethods.length + 1,
      type: "card" as const,
      brand: "Visa", // Mock detection
      last4: newCard.number.slice(-4),
      expiry: newCard.expiry,
      isDefault: false,
    };
    setPaymentMethods([...paymentMethods, method]);
    setIsAddMethodOpen(false);
    setNewCard({ number: "", expiry: "", cvc: "", name: "" });
  };

  const handleAddBank = () => {
    const account = {
      id: bankAccountsList.length + 1,
      bankName: newBank.bankName,
      accountType: newBank.accountType,
      last4: newBank.accountNumber.slice(-4),
      isDefault: false,
    };
    setBankAccountsList([...bankAccountsList, account]);
    setIsAddBankOpen(false);
    setNewBank({ bankName: "", accountType: "Checking", accountNumber: "", routingNumber: "" });
  };

  const handleRequestPayout = () => {
    setIsPayoutProcessing(true);
    setTimeout(() => {
      setBalance(0);
      setIsPayoutProcessing(false);
      // Add transaction
      const newTx = {
        id: transactions.length + 1,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: "Payout - Manual Request",
        amount: `+$${balance.toFixed(2)}`,
        status: "completed" as const,
        type: "payout"
      };
      setTransactions([newTx, ...transactions]);
    }, 2000);
  };

  const handleConnectStripe = async () => {
    try {
      // Mocking Stripe Connect behavior client-side for static export
      // const response = await fetch('/api/stripe/connect', { method: 'POST' });
      // const data = await response.json();
      
      const data = {
        url: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_12345&scope=read_write'
      };

      if (data.url) {
        // In a real app, we would redirect: window.location.href = data.url;
        // For demo, we'll just simulate connection
        alert(`Redirecting to Stripe Connect: ${data.url}`);
        setIsStripeConnected(true);
      }
    } catch (error) {
      console.error("Error connecting Stripe:", error);
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
                          <div className="space-y-4 py-6">
                            <div className="space-y-2">
                              <Label>Card Number</Label>
                              <Input 
                                placeholder="0000 0000 0000 0000" 
                                value={newCard.number}
                                onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Expiry Date</Label>
                                <Input 
                                  placeholder="MM/YY" 
                                  value={newCard.expiry}
                                  onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>CVC</Label>
                                <Input 
                                  placeholder="123" 
                                  value={newCard.cvc}
                                  onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Cardholder Name</Label>
                              <Input 
                                placeholder="John Doe" 
                                value={newCard.name}
                                onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                              />
                            </div>
                          </div>
                          <SheetFooter>
                            <Button onClick={handleAddCard}>Add Card</Button>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
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
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
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
                      <Button onClick={handleConnectStripe} className="w-full sm:w-auto">
                        Connect with Stripe
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
                          <div className="space-y-4 py-6">
                            <div className="space-y-2">
                              <Label>Bank Name</Label>
                              <Input 
                                placeholder="e.g. Chase Bank" 
                                value={newBank.bankName}
                                onChange={(e) => setNewBank({...newBank, bankName: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Account Type</Label>
                              <select 
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={newBank.accountType}
                                onChange={(e) => setNewBank({...newBank, accountType: e.target.value})}
                              >
                                <option value="Checking">Checking</option>
                                <option value="Savings">Savings</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label>Routing Number</Label>
                              <Input 
                                placeholder="9 digits" 
                                value={newBank.routingNumber}
                                onChange={(e) => setNewBank({...newBank, routingNumber: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Account Number</Label>
                              <Input 
                                placeholder="Account number" 
                                value={newBank.accountNumber}
                                onChange={(e) => setNewBank({...newBank, accountNumber: e.target.value})}
                              />
                            </div>
                          </div>
                          <SheetFooter>
                            <Button onClick={handleAddBank}>Add Account</Button>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
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
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
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
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
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
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                Completed
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" title="Download Invoice">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
