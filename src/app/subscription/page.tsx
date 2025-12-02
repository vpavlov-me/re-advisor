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
  Users,
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

// Status labels in Russian
const statusLabels: Record<string, string> = {
  active: "Активна",
  trialing: "Пробный период",
  cancelled: "Отменена",
  past_due: "Просрочена",
  inactive: "Неактивна",
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

  // Handle Stripe redirect
  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    const plan = searchParams.get('plan');
    
    if (success === 'true' && plan) {
      const planName = plan === 'premium' ? 'Premium Consultant' : 'Standard Consultant';
      toast.success(`Успешно подписаны на план ${planName}!`);
      window.history.replaceState({}, '', '/subscription');
      loadData();
    } else if (canceled === 'true') {
      toast.info('Оформление подписки отменено.');
      window.history.replaceState({}, '', '/subscription');
    }
  }, [searchParams]);

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
      toast.error("Ошибка загрузки данных подписки");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handlers
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
      toast.error("Ошибка при оформлении подписки");
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
        toast.success(`План успешно изменён на ${PLANS[upgradeDialog.targetPlan].name}`);
        setUpgradeDialog({ open: false, targetPlan: null });
        loadData();
      }
    } catch (error) {
      console.error("Error changing plan:", error);
      toast.error("Ошибка при смене плана");
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
        toast.success("Подписка будет отменена в конце текущего периода");
        setCancelDialog(false);
        loadData();
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error("Ошибка при отмене подписки");
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
        toast.success("Дополнительный слот портала успешно добавлен!");
        setPortalDialog(false);
        loadData();
      }
    } catch (error) {
      console.error("Error purchasing portal:", error);
      toast.error("Ошибка при покупке слота");
    } finally {
      setIsActionLoading(null);
    }
  };

  const currentPlan = subscription ? PLANS[subscription.plan_id] : null;
  const renewalDate = subscription?.current_period_end 
    ? new Date(subscription.current_period_end).toLocaleDateString('ru-RU', { 
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
            <h1 className="text-2xl font-semibold text-foreground">Подписка</h1>
            <p className="text-muted-foreground mt-1">Управление планом подписки и лимитами</p>
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
                  Промо период: 0% комиссии
                </AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-300">
                  До конца промо периода осталось {promotionalDaysRemaining} дней. 
                  После этого комиссия составит 10% с консультаций.
                </AlertDescription>
              </Alert>
            )}

            {/* Current Plan */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Текущий план</CardTitle>
                    <CardDescription>
                      {subscription 
                        ? `Вы используете план ${currentPlan?.name}` 
                        : 'У вас нет активной подписки'}
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
                          ${currentPlan.price}/месяц · Продление {renewalDate}
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
                        Отменить подписку
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Нет активной подписки</h3>
                    <p className="text-muted-foreground mb-4">
                      Выберите план ниже, чтобы начать работу с платформой
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
                        Управление созданными семейными порталами
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
                          <span className="text-muted-foreground">/ {portalUsage.total} порталов</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {portalUsage.included} включено в план
                          {portalUsage.additional > 0 && ` + ${portalUsage.additional} дополнительных`}
                        </p>
                      </div>
                      <Button 
                        onClick={() => setPortalDialog(true)}
                        disabled={!portalUsage.canCreateMore && portalUsage.used >= portalUsage.total}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Добавить слот
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
                          Достигнут лимит порталов. Добавьте дополнительный слот за ${PORTAL_LIMITS.additionalPortalPrice}/месяц.
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
                <CardTitle className="text-base">Сравнение планов</CardTitle>
                <CardDescription>Выберите план, соответствующий вашим потребностям</CardDescription>
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
                            Рекомендуем
                          </Badge>
                        )}
                        {isCurrent && (
                          <Badge variant="outline" className="absolute -top-3 right-4">
                            Текущий план
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
                            <span className="text-muted-foreground">/месяц</span>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              Включено
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
                                Ограничения
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
                            "Текущий план"
                          ) : isActionLoading === planId ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Обработка...
                            </>
                          ) : subscription ? (
                            subscription.plan_id === 'premium' && planId === 'standard' ? (
                              "Перейти на Standard"
                            ) : (
                              <>
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Upgrade to Premium
                              </>
                            )
                          ) : (
                            "Выбрать план"
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
                  Комиссия платформы
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Текущая комиссия</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-green-600">
                        {commissionInfo?.currentRate || 0}%
                      </span>
                      {commissionInfo?.isPromotional && (
                        <Badge variant="secondary">Промо</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {commissionInfo?.isPromotional 
                        ? "Действует промо период с нулевой комиссией"
                        : "Стандартная комиссия с консультаций"
                      }
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">После промо периода</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">10%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {commissionInfo?.isPromotional
                        ? `Через ${promotionalDaysRemaining} дней`
                        : "Текущая ставка"
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
                      <h3 className="font-medium">История платежей</h3>
                      <p className="text-sm text-muted-foreground">Просмотр всех транзакций и счетов</p>
                    </div>
                  </div>
                  <Link href="/payments">
                    <Button variant="ghost">
                      Перейти
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
                  ? "Upgrade на Premium"
                  : "Даунгрейд на Standard"
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
                  <span className="text-muted-foreground">Текущий план:</span>
                  <span className="font-medium">{PLANS[subscription.plan_id].name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Новый план:</span>
                  <span className="font-medium">{PLANS[upgradeDialog.targetPlan].name}</span>
                </div>
                <Separator />
                {PLANS[upgradeDialog.targetPlan].price > PLANS[subscription.plan_id].price && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Кредит за оставшиеся дни:</span>
                      <span>-${getUpgradePreview(subscription.plan_id, upgradeDialog.targetPlan, daysRemaining).proratedCredit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Стоимость нового плана:</span>
                      <span>${getUpgradePreview(subscription.plan_id, upgradeDialog.targetPlan, daysRemaining).newCharge.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>К оплате сейчас:</span>
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
                    При даунгрейде вы потеряете возможность создавать новые Family Portals. 
                    Существующие порталы останутся активными.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpgradeDialog({ open: false, targetPlan: null })}>
              Отмена
            </Button>
            <Button 
              onClick={handleChangePlan}
              disabled={isActionLoading === 'change'}
            >
              {isActionLoading === 'change' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Обработка...
                </>
              ) : (
                "Подтвердить"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Dialog */}
      <Dialog open={cancelDialog} onOpenChange={setCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Отменить подписку?</DialogTitle>
            <DialogDescription>
              Подписка будет отменена в конце текущего расчётного периода ({renewalDate}).
              До этого момента вы сохраните доступ ко всем функциям.
            </DialogDescription>
          </DialogHeader>
          
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Внимание</AlertTitle>
            <AlertDescription>
              После отмены вы потеряете доступ к маркетплейсу семей и возможность принимать консультации.
            </AlertDescription>
          </Alert>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialog(false)}>
              Оставить подписку
            </Button>
            <Button 
              variant="destructive"
              onClick={handleCancelSubscription}
              disabled={isActionLoading === 'cancel'}
            >
              {isActionLoading === 'cancel' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Отмена...
                </>
              ) : (
                "Отменить подписку"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Purchase Portal Dialog */}
      <Dialog open={portalDialog} onOpenChange={setPortalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить слот Family Portal</DialogTitle>
            <DialogDescription>
              Приобретите дополнительный слот для создания нового Family Portal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Дополнительный слот портала</span>
                <span className="text-xl font-bold">${PORTAL_LIMITS.additionalPortalPrice}/мес</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Стоимость будет добавлена к ежемесячному счёту. Вы можете создать ещё один Family Portal.
              </p>
            </div>
            
            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Слот добавляется к вашей подписке и будет доступен немедленно.
              </AlertDescription>
            </Alert>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPortalDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={handlePurchasePortal}
              disabled={isActionLoading === 'portal'}
            >
              {isActionLoading === 'portal' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Обработка...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить за ${PORTAL_LIMITS.additionalPortalPrice}/мес
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
