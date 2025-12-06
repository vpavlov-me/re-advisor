"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { 
  Home, 
  ChevronRight, 
  CreditCard,
  Check,
  X,
  Crown,
  Star,
  Calendar,
  Shield,
  Globe,
  Monitor,
  AlertCircle,
  ArrowRight,
  Loader2,
  RefreshCw,
  Building2,
  Percent,
  Clock,
  Plus,
  TrendingUp,
  Info
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
} from "@/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { 
  PLANS, 
  PORTAL_LIMITS,
  getSubscription, 
  getCommissionInfo,
  getPortalUsage,
  createCheckoutSession,
  changePlan,
  cancelSubscription,
  purchaseAdditionalPortal,
  getUpgradePreview,
  type PlanId,
  type Subscription,
  type PortalUsage,
  type CommissionInfo
} from "@/lib/services/stripe.service";

// Sidebar navigation
const settingsNav = [
  { label: "Account & Security", href: "/settings", icon: Shield },
  { label: "Notifications", href: "/notifications", icon: Globe },
  { label: "Payment Methods", href: "/payments", icon: CreditCard },
  { label: "Subscription", href: "/subscription", icon: Monitor, active: true },
];

// Status badge variants
const statusVariants: Record<string, "default" | "success" | "warning" | "destructive"> = {
  active: "success",
  trialing: "default",
  cancelled: "destructive",
  past_due: "warning",
  inactive: "default",
};

// Status labels
const statusLabels: Record<string, string> = {
  active: "Active",
  trialing: "Trial",
  cancelled: "Cancelled",
  past_due: "Past Due",
  inactive: "Inactive",
};

export default function SubscriptionPage() {
  const searchParams = useSearchParams();
  
  // State
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [portalUsage, setPortalUsage] = useState<PortalUsage | null>(null);
  const [commissionInfo, setCommissionInfo] = useState<CommissionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);
  
  // Dialogs
  const [upgradeDialog, setUpgradeDialog] = useState<{ open: boolean; targetPlan: PlanId | null }>({ 
    open: false, 
    targetPlan: null 
  });
  const [cancelDialog, setCancelDialog] = useState(false);
  const [portalDialog, setPortalDialog] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [subResult, portalResult] = await Promise.all([
        getSubscription(),
        getPortalUsage(),
      ]);
      
      setSubscription(subResult.subscription);
      setPortalUsage(portalResult.usage);
      setCommissionInfo(getCommissionInfo());
    } catch (error) {
      console.error("Error loading subscription data:", error);
      toast.error("Failed to load subscription data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle Stripe redirect - retry loading because webhook may take time
  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    const plan = searchParams.get('plan');
    
    if (success === 'true' && plan) {
      const planName = plan === 'premium' ? 'Premium Consultant' : 'Standard Consultant';
      toast.success(`Successfully subscribed to ${planName}!`);
      window.history.replaceState({}, '', '/subscription');
      
      // Retry loading data with delays to wait for webhook processing
      const retryLoad = async (attempts: number) => {
        for (let i = 0; i < attempts; i++) {
          await new Promise(resolve => setTimeout(resolve, i === 0 ? 500 : 2000));
          await loadData();
          // Check if subscription was loaded
          const { subscription } = await getSubscription();
          if (subscription?.plan_id === plan) {
            break;
          }
        }
      };
      retryLoad(5);
    } else if (canceled === 'true') {
      toast.info('Checkout was canceled.');
      window.history.replaceState({}, '', '/subscription');
    }
  }, [searchParams, loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handlers  // Handlers
  const handleSubscribe = async (planId: PlanId) => {
    setIsActionLoading(planId);
    try {
      const { session, error } = await createCheckoutSession(planId);
      
      if (error) {
        toast.error(error);
        return;
      }
      
      if (session?.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast.error("Failed to create checkout session");
    } finally {
      setIsActionLoading(null);
    }
  };

  const handleChangePlan = async () => {
    if (!upgradeDialog.targetPlan) return;
    
    setIsActionLoading('change');
    try {
      const { success, error } = await changePlan(upgradeDialog.targetPlan);
      
      if (error) {
        toast.error(error);
        return;
      }
      
      if (success) {
        toast.success(`Plan successfully changed to ${PLANS[upgradeDialog.targetPlan].name}`);
        setUpgradeDialog({ open: false, targetPlan: null });
        loadData();
      }
    } catch (error) {
      console.error("Error changing plan:", error);
      toast.error("Failed to change plan");
    } finally {
      setIsActionLoading(null);
    }
  };

  const handleCancelSubscription = async () => {
    setIsActionLoading('cancel');
    try {
      const { success, error } = await cancelSubscription();
      
      if (error) {
        toast.error(error);
        return;
      }
      
      if (success) {
        toast.success("Subscription will be cancelled at end of current period");
        setCancelDialog(false);
        loadData();
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error("Failed to cancel subscription");
    } finally {
      setIsActionLoading(null);
    }
  };

  const handlePurchasePortal = async () => {
    setIsActionLoading('portal');
    try {
      const { success, error } = await purchaseAdditionalPortal();
      
      if (error) {
        toast.error(error);
        return;
      }
      
      if (success) {
        toast.success("Additional portal slot successfully added!");
        setPortalDialog(false);
        loadData();
      }
    } catch (error) {
      console.error("Error purchasing portal:", error);
      toast.error("Failed to purchase portal slot");
    } finally {
      setIsActionLoading(null);
    }
  };

  const currentPlan = subscription ? PLANS[subscription.plan_id] : null;
  const renewalDate = subscription?.current_period_end 
    ? new Date(subscription.current_period_end).toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    : null;

  // Calculate days remaining for proration
  const daysRemaining = subscription?.current_period_end
    ? Math.max(0, Math.ceil((new Date(subscription.current_period_end).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  // Calculate promotional period end
  const promotionalDaysRemaining = commissionInfo?.promotionalEndsAt
    ? Math.max(0, Math.ceil((new Date(commissionInfo.promotionalEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="min-h-screen bg-page-background">
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

      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
            <p className="text-muted-foreground mt-1">
              Manage your subscription plan and usage limits.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={loadData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
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
            
            {/* Promotional Banner */}
            {commissionInfo?.isPromotional && (
              <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
                <Percent className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800 dark:text-green-200">
                  Promotional Period: 0% Commission
                </AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-300">
                  {promotionalDaysRemaining} days remaining in promotional period. 
                  After this, commission will be 10% on consultations.
                </AlertDescription>
              </Alert>
            )}

            {/* Current Plan */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Current Plan</CardTitle>
                    <CardDescription>
                      {subscription 
                        ? `You are on the ${currentPlan?.name} plan` 
                        : 'You don\'t have an active subscription'}
                    </CardDescription>
                  </div>
                  {subscription && (
                    <Badge variant={statusVariants[subscription.status]}>
                      {statusLabels[subscription.status]}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {isLoading ? (
                  <div className="p-4 bg-muted/50 rounded-lg animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-xl bg-muted"></div>
                      <div className="space-y-2">
                        <div className="h-6 w-32 bg-muted rounded"></div>
                        <div className="h-4 w-48 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                ) : subscription && currentPlan ? (
                  <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center">
                        {subscription.plan_id === 'premium' ? (
                          <Crown className="h-7 w-7 text-primary-foreground" />
                        ) : (
                          <Star className="h-7 w-7 text-primary-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{currentPlan.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ${currentPlan.price}/month · Renews {renewalDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {subscription.plan_id === 'standard' && (
                        <Button onClick={() => setUpgradeDialog({ open: true, targetPlan: 'premium' })}>
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Upgrade to Premium
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        onClick={() => setCancelDialog(true)}
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Active Subscription</h3>
                    <p className="text-muted-foreground mb-4">
                      Choose a plan below to start working with the platform
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Portal Usage (Premium only) */}
            {subscription?.plan_id === 'premium' && portalUsage && (
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Family Portals
                      </CardTitle>
                      <CardDescription>
                        Manage your created family portals
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">{portalUsage.used}</span>
                          <span className="text-muted-foreground">/ {portalUsage.total} portals</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {portalUsage.included} included in plan
                          {portalUsage.additional > 0 && ` + ${portalUsage.additional} additional`}
                        </p>
                      </div>
                      <Button 
                        onClick={() => setPortalDialog(true)}
                        disabled={!portalUsage.canCreateMore && portalUsage.used >= portalUsage.total}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Slot
                      </Button>
                    </div>
                    
                    <Progress 
                      value={(portalUsage.used / portalUsage.total) * 100} 
                      className="h-2"
                    />
                    
                    {portalUsage.used >= portalUsage.total && (
                      <Alert variant="default">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Portal limit reached. Add an additional slot for ${PORTAL_LIMITS.additionalPortalPrice}/month.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Plan Comparison */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Compare Plans</CardTitle>
                <CardDescription>Choose the plan that fits your needs</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(Object.keys(PLANS) as PlanId[]).map((planId) => {
                    const plan = PLANS[planId];
                    const isCurrent = subscription?.plan_id === planId;
                    const isPremium = planId === 'premium';
                    
                    return (
                      <div 
                        key={planId} 
                        className={`relative p-6 border rounded-xl transition-all ${
                          isCurrent 
                            ? "border-primary bg-primary/5 shadow-md" 
                            : isPremium
                            ? "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/30"
                            : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        {isPremium && (
                          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500">
                            <Crown className="h-3 w-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                        {isCurrent && (
                          <Badge variant="outline" className="absolute -top-3 right-4">
                            Current Plan
                          </Badge>
                        )}
                        
                        <div className="text-center mb-6 pt-2">
                          <div className={`h-12 w-12 rounded-xl mx-auto flex items-center justify-center mb-3 ${
                            isPremium ? 'bg-amber-100 dark:bg-amber-900' : 'bg-primary/10'
                          }`}>
                            {isPremium ? (
                              <Crown className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                            ) : (
                              <Star className="h-6 w-6 text-primary" />
                            )}
                          </div>
                          <h3 className="font-semibold text-lg text-foreground">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                          <div className="flex items-baseline justify-center gap-1 mt-4">
                            <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                            <span className="text-muted-foreground">/month</span>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              Included
                            </h4>
                            <ul className="space-y-2">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                  <span className="text-foreground">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {plan.limitations.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-muted-foreground">
                                <X className="h-4 w-4" />
                                Limitations
                              </h4>
                              <ul className="space-y-2">
                                {plan.limitations.map((limitation, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm">
                                    <X className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{limitation}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          className="w-full mt-6" 
                          variant={isCurrent ? "outline" : isPremium ? "default" : "secondary"}
                          disabled={isCurrent || isActionLoading === planId}
                          onClick={() => {
                            if (subscription) {
                              setUpgradeDialog({ open: true, targetPlan: planId });
                            } else {
                              handleSubscribe(planId);
                            }
                          }}
                        >
                          {isCurrent ? (
                            "Current Plan"
                          ) : isActionLoading === planId ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : subscription ? (
                            subscription.plan_id === 'premium' && planId === 'standard' ? (
                              "Switch to Standard"
                            ) : (
                              <>
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Upgrade to Premium
                              </>
                            )
                          ) : (
                            "Select Plan"
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Commission Info */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  Platform Commission
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Current Commission</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-green-600">
                        {commissionInfo?.currentRate || 0}%
                      </span>
                      {commissionInfo?.isPromotional && (
                        <Badge variant="secondary">Promo</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {commissionInfo?.isPromotional 
                        ? "Promotional period with zero commission"
                        : "Standard commission on consultations"
                      }
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">After Promotional Period</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">10%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {commissionInfo?.isPromotional
                        ? `In ${promotionalDaysRemaining} days`
                        : "Current rate"
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing History Link */}
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Billing History</h3>
                      <p className="text-sm text-muted-foreground">View all transactions and invoices</p>
                    </div>
                  </div>
                  <Link href="/payments">
                    <Button variant="ghost">
                      View
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Upgrade/Downgrade Dialog */}
      <Dialog open={upgradeDialog.open} onOpenChange={(open) => setUpgradeDialog({ open, targetPlan: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {upgradeDialog.targetPlan && subscription && (
                PLANS[upgradeDialog.targetPlan].price > PLANS[subscription.plan_id].price
                  ? "Upgrade to Premium"
                  : "Downgrade to Standard"
              )}
            </DialogTitle>
            <DialogDescription>
              {upgradeDialog.targetPlan && subscription && (
                getUpgradePreview(subscription.plan_id, upgradeDialog.targetPlan, daysRemaining).description
              )}
            </DialogDescription>
          </DialogHeader>
          
          {upgradeDialog.targetPlan && subscription && (
            <div className="py-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current plan:</span>
                  <span className="font-medium">{PLANS[subscription.plan_id].name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">New plan:</span>
                  <span className="font-medium">{PLANS[upgradeDialog.targetPlan].name}</span>
                </div>
                <Separator />
                {PLANS[upgradeDialog.targetPlan].price > PLANS[subscription.plan_id].price && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Credit for remaining days:</span>
                      <span>-${getUpgradePreview(subscription.plan_id, upgradeDialog.targetPlan, daysRemaining).proratedCredit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">New plan cost:</span>
                      <span>${getUpgradePreview(subscription.plan_id, upgradeDialog.targetPlan, daysRemaining).newCharge.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Due now:</span>
                      <span className="text-primary">
                        ${Math.max(0, getUpgradePreview(subscription.plan_id, upgradeDialog.targetPlan, daysRemaining).netAmount).toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>
              
              {upgradeDialog.targetPlan === 'standard' && subscription.plan_id === 'premium' && (
                <Alert className="mt-4" variant="default">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    When downgrading, you will lose the ability to create new Family Portals. 
                    Existing portals will remain active.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpgradeDialog({ open: false, targetPlan: null })}>
              Cancel
            </Button>
            <Button 
              onClick={handleChangePlan}
              disabled={isActionLoading === 'change'}
            >
              {isActionLoading === 'change' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Dialog */}
      <Dialog open={cancelDialog} onOpenChange={setCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription?</DialogTitle>
            <DialogDescription>
              Your subscription will be cancelled at the end of the current billing period ({renewalDate}).
              You will retain access to all features until then.
            </DialogDescription>
          </DialogHeader>
          
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              After cancellation, you will lose access to the family marketplace and the ability to accept consultations.
            </AlertDescription>
          </Alert>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialog(false)}>
              Keep Subscription
            </Button>
            <Button 
              variant="destructive"
              onClick={handleCancelSubscription}
              disabled={isActionLoading === 'cancel'}
            >
              {isActionLoading === 'cancel' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Cancel Subscription"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Purchase Portal Dialog */}
      <Dialog open={portalDialog} onOpenChange={setPortalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Family Portal Slot</DialogTitle>
            <DialogDescription>
              Purchase an additional slot to create a new Family Portal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Additional Portal Slot</span>
                <span className="text-xl font-bold">${PORTAL_LIMITS.additionalPortalPrice}/mo</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Cost will be added to your monthly bill. You can create one more Family Portal.
              </p>
            </div>
            
            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                The slot will be added to your subscription and available immediately.
              </AlertDescription>
            </Alert>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPortalDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handlePurchasePortal}
              disabled={isActionLoading === 'portal'}
            >
              {isActionLoading === 'portal' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add for ${PORTAL_LIMITS.additionalPortalPrice}/mo
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
