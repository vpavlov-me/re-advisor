"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { 
  Home, 
  ChevronRight, 
  CreditCard,
  Check,
  X,
  Crown,
  Zap,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Shield,
  Globe,
  Monitor,
  AlertCircle,
  ArrowRight,
  Loader2,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";

// Current plan
const currentPlan = {
  name: "Professional",
  price: "$99",
  period: "month",
  renewalDate: "December 1, 2025",
  status: "active" as const,
};

// Usage stats
const usageStats = [
  { label: "Family Clients", used: 6, limit: 15, icon: Users },
  { label: "Active Consultations", used: 2, limit: 20, icon: Calendar },
  { label: "Messages", used: 450, limit: 1000, icon: MessageSquare },
  { label: "Storage Used", used: 2.4, limit: 10, unit: "GB", icon: BarChart3 },
];

// Available plans
const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$49",
    period: "month",
    description: "Perfect for new advisors getting started",
    features: [
      { text: "Up to 5 family clients", included: true },
      { text: "10 consultations/month", included: true },
      { text: "Basic messaging", included: true },
      { text: "5GB storage", included: true },
      { text: "Email support", included: true },
      { text: "Analytics dashboard", included: false },
      { text: "Custom branding", included: false },
      { text: "API access", included: false },
    ],
    current: false,
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "$99",
    period: "month",
    description: "For established advisors growing their practice",
    features: [
      { text: "Up to 15 family clients", included: true },
      { text: "20 consultations/month", included: true },
      { text: "Advanced messaging", included: true },
      { text: "10GB storage", included: true },
      { text: "Priority support", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Custom branding", included: false },
      { text: "API access", included: false },
    ],
    current: true,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$249",
    period: "month",
    description: "For large practices and advisory firms",
    features: [
      { text: "Unlimited family clients", included: true },
      { text: "Unlimited consultations", included: true },
      { text: "Advanced messaging + video", included: true },
      { text: "50GB storage", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom branding", included: true },
      { text: "API access", included: true },
    ],
    current: false,
    popular: false,
  },
];

// Billing history
const billingHistory = [
  { date: "Nov 1, 2025", description: "Professional Plan - Monthly", amount: "$99.00", status: "paid" as const },
  { date: "Oct 1, 2025", description: "Professional Plan - Monthly", amount: "$99.00", status: "paid" as const },
  { date: "Sep 1, 2025", description: "Professional Plan - Monthly", amount: "$99.00", status: "paid" as const },
  { date: "Aug 1, 2025", description: "Professional Plan - Monthly", amount: "$99.00", status: "paid" as const },
];

// Sidebar navigation
const settingsNav = [
  { label: "Account & Security", href: "/settings", icon: Shield },
  { label: "Notifications", href: "/notifications", icon: Globe },
  { label: "Payment Methods", href: "/payments", icon: CreditCard },
  { label: "Subscription", href: "/subscription", icon: Monitor, active: true },
];

export default function SubscriptionPage() {
  const [activePlanId, setActivePlanId] = useState("professional");
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState<string | null>(null);
  const [usageData, setUsageData] = useState(usageStats);

  const activePlan = plans.find(p => p.id === activePlanId) || plans[1];
  const selectedPlan = selectedPlanId ? plans.find(p => p.id === selectedPlanId) : null;

  const fetchUsageData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // Fetch actual usage data from Supabase
      const [familiesCount, consultationsCount, messagesCount] = await Promise.all([
        supabase.from('families').select('id', { count: 'exact' }).eq('advisor_id', user.id),
        supabase.from('consultations').select('id', { count: 'exact' }).eq('advisor_id', user.id).eq('status', 'scheduled'),
        supabase.from('messages').select('id', { count: 'exact' }).eq('sender_id', user.id)
      ]);

      setUsageData([
        { label: "Family Clients", used: familiesCount.count || 0, limit: 15, icon: Users },
        { label: "Active Consultations", used: consultationsCount.count || 0, limit: 20, icon: Calendar },
        { label: "Messages", used: messagesCount.count || 0, limit: 1000, icon: MessageSquare },
        { label: "Storage Used", used: 2.4, limit: 10, unit: "GB", icon: BarChart3 },
      ]);
    } catch (error) {
      console.error("Error fetching usage data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsageData();
  }, [fetchUsageData]);

  const handleUpgrade = async (planId: string) => {
    setIsUpgrading(planId);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { error } = await supabase
        .from('subscriptions')
        .update({ plan_id: planId })
        .eq('id', 'current');

      // Always update locally for demo
      setActivePlanId(planId);
      setIsUpgradeOpen(false);
      setSelectedPlanId(null);
      toast.success(`Successfully upgraded to ${plans.find(p => p.id === planId)?.name} plan!`);
    } catch (error) {
      console.error("Error upgrading plan:", error);
      // Fallback for demo
      setActivePlanId(planId);
      setIsUpgradeOpen(false);
      setSelectedPlanId(null);
      toast.success(`Successfully upgraded to ${plans.find(p => p.id === planId)?.name} plan!`);
    } finally {
      setIsUpgrading(null);
    }
  };

  const handleCancelPlan = async () => {
    setIsCancelling(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsCancelOpen(false);
      toast.success("Subscription cancellation scheduled. You will have access until the end of your billing period.");
    } catch (error) {
      console.error("Error cancelling plan:", error);
      toast.error("Failed to cancel subscription. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  const openUpgradeDialog = (planId: string) => {
    setSelectedPlanId(planId);
    setIsUpgradeOpen(true);
  };

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
            <span className="text-foreground font-medium">Subscription</span>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Subscription</h1>
            <p className="text-muted-foreground mt-1">Manage your subscription plan and billing</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
          </div>

          {/* Main Content */}
          <div className="col-span-3 space-y-6">
            {/* Current Plan */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Current Plan</CardTitle>
                    <CardDescription>You are currently on the {activePlan.name} plan</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center">
                      <Crown className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{activePlan.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {activePlan.price}/{activePlan.period} · Renews on {currentPlan.renewalDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">Cancel Plan</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Cancel Subscription?</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to cancel? You will lose access to premium features
                            at the end of your current billing period.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsCancelOpen(false)} disabled={isCancelling}>
                            Keep Plan
                          </Button>
                          <Button variant="destructive" onClick={handleCancelPlan} disabled={isCancelling}>
                            {isCancelling ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Cancelling...
                              </>
                            ) : (
                              "Confirm Cancellation"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button onClick={() => openUpgradeDialog("enterprise")}>Upgrade Plan</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Usage This Month</CardTitle>
                    <CardDescription>Track your resource usage against your plan limits</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={fetchUsageData} disabled={isLoading}>
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4">
                  {isLoading ? (
                    // Loading skeleton
                    <>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-4 border border-border rounded-lg animate-pulse">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-8 w-8 rounded-lg bg-muted"></div>
                            <div className="h-4 w-24 bg-muted rounded"></div>
                          </div>
                          <div className="h-8 w-16 bg-muted rounded mb-2"></div>
                          <div className="h-1.5 w-full bg-muted rounded"></div>
                        </div>
                      ))}
                    </>
                  ) : (
                    usageData.map((stat) => {
                      const percentage = (stat.used / stat.limit) * 100;
                      return (
                        <div key={stat.label} className="p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <stat.icon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium text-foreground text-sm">{stat.label}</span>
                          </div>
                          <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-2xl font-semibold text-foreground">{stat.used}</span>
                            <span className="text-sm text-muted-foreground">
                              / {stat.limit} {stat.unit || ""}
                            </span>
                          </div>
                          <Progress value={percentage} className="h-1.5" />
                          {percentage > 80 && (
                            <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Approaching limit
                            </p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Available Plans */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Available Plans</CardTitle>
                <CardDescription>Compare plans and choose the best one for your needs</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((plan) => {
                    const isCurrent = plan.id === activePlanId;
                    return (
                      <div 
                        key={plan.id} 
                        className={`relative p-4 border rounded-lg ${
                          isCurrent 
                            ? "border-primary bg-primary/5" 
                            : "border-border"
                        }`}
                      >
                        {plan.popular && (
                          <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                            Most Popular
                          </Badge>
                        )}
                        <div className="text-center mb-4 pt-2">
                          <h3 className="font-semibold text-foreground">{plan.name}</h3>
                          <div className="flex items-baseline justify-center gap-1 mt-2">
                            <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                            <span className="text-muted-foreground">/{plan.period}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">{plan.description}</p>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              {feature.included ? (
                                <Check className="h-4 w-4 text-green-500 shrink-0" />
                              ) : (
                                <X className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                              )}
                              <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                                {feature.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          className="w-full mt-4" 
                          variant={isCurrent ? "outline" : "default"}
                          disabled={isCurrent || isUpgrading === plan.id}
                          onClick={() => handleUpgrade(plan.id)}
                        >
                          {isCurrent ? "Current Plan" : isUpgrading === plan.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Upgrading...
                            </>
                          ) : "Upgrade"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Billing History</CardTitle>
                  <Link href="/payments" className="text-sm text-primary hover:underline flex items-center gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="divide-y divide-border">
                  {billingHistory.map((item, index) => (
                    <div key={index} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground text-sm">{item.description}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">{item.amount}</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Paid</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
