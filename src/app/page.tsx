"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Home, 
  ChevronRight, 
  Calendar, 
  CheckCircle2, 
  DollarSign,
  Users,
  Briefcase,
  MessageSquare,
  Clock,
  MoreVertical,
  Send,
  BookOpen,
  Lock,
  User,
  KeyRound,
  Map,
  CreditCard,
  IdCard,
  UserCheck,
  CalendarDays,
  Settings,
  Keyboard,
  RefreshCw,
  Check,
  ArrowRight,
  CalendarClock,
  XCircle,
  Eye,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { LucideIcon } from "lucide-react";
import { syncOnboardingProgress, getStepStatus, ONBOARDING_STEPS, type OnboardingProgress } from "@/lib/onboarding";
import { Skeleton } from "@/components/ui/skeleton";

// Icon mapping for dynamic rendering
const iconMap: Record<string, LucideIcon> = {
  Lock, User, KeyRound, Map, Briefcase, CreditCard, IdCard, UserCheck
};

type ProfileStep = {
  id: number;
  label: string;
  icon: LucideIcon;
  status: "completed" | "current" | "pending" | "locked";
  href: string;
};

// Stats data
const initialStats = [
  { label: "Family Clients", value: "0", icon: Users, href: "/families" },
  { label: "Services", value: "0", icon: Briefcase, href: "/services" },
  { label: "Active consultations", value: "0", icon: MessageSquare, href: "/consultations" },
  { label: "Monthly revenue", value: "$0.00", icon: DollarSign, href: "/payments" },
];

// Onboarding Step Card
function OnboardingCard({ step }: { step: { id: number; label: string; icon: React.ElementType; status: "completed" | "current" | "pending" | "locked"; href: string } }) {
  const Icon = step.icon;
  
  const CardContent = (
    <div className={`flex items-center gap-3 px-3 py-3 bg-card border border-border rounded-[10px] min-w-[200px] flex-1 transition-colors ${
      step.status !== "locked" ? "hover:border-primary/50 cursor-pointer" : "opacity-70 cursor-not-allowed"
    }`}>
      <div className={`flex items-center justify-center h-5 w-5 ${
        step.status === "locked" ? "text-muted-foreground/50" : "text-foreground"
      }`}>
        <Icon className="h-5 w-5" />
      </div>
      <span className={`text-sm font-medium flex-1 ${
        step.status === "locked" ? "text-muted-foreground" : "text-foreground"
      }`}>
        {step.label}
      </span>
      {step.status === "completed" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
      {step.status === "current" && <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />}
    </div>
  );

  if (step.status === "locked") {
    return CardContent;
  }

  return (
    <Link href={step.href} className="flex-1">
      {CardContent}
    </Link>
  );
}

// Dashboard Loading Skeleton
function DashboardSkeleton() {
  return (
    <div className="flex-1 bg-background">
      {/* Breadcrumb Bar Skeleton */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Welcome Banner Skeleton */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-36" />
            </div>
          </CardContent>
        </Card>

        {/* Profile Setup Card Skeleton */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-[10px]" />
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[5, 6, 7, 8].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-[10px]" />
                ))}
              </div>
            </div>
            <Separator className="my-5" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="mt-3 h-1.5 w-full" />
          </CardContent>
        </Card>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-[10px]" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-7 w-16" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[200px] w-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            {/* Consultations Skeleton */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-44" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="border border-border rounded-[10px] p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-5 w-40" />
                          <Skeleton className="h-5 w-12 rounded-full" />
                          <Skeleton className="h-5 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-32" />
                        <div className="flex items-center gap-12">
                          <div className="space-y-1">
                            <Skeleton className="h-3 w-16" />
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {[1, 2, 3].map((j) => (
                                  <Skeleton key={j} className="h-6 w-6 rounded-full" />
                                ))}
                              </div>
                              <Skeleton className="h-4 w-32" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Messages Skeleton */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="divide-y divide-border">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Skeleton */}
          <div>
            <Card>
              <CardHeader className="pb-4">
                <Skeleton className="h-5 w-28" />
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [stats, setStats] = useState(initialStats);
  const [onboardingProgress, setOnboardingProgress] = useState<OnboardingProgress | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [consultations, setConsultations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [userName, setUserName] = useState("Advisor");
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    
    // Demo mode when Supabase is not configured
    if (!isSupabaseConfigured()) {
      console.log('Running in demo mode - Supabase not configured');
      setUserName("Demo User");
      setLoading(false);
      return;
    }
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Sync and fetch onboarding progress
        const { progress } = await syncOnboardingProgress(user.id);
        setOnboardingProgress(progress);
        
        // Fetch Profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setUserName(`${profile.first_name || ''} ${profile.last_name || ''}`.trim() || "Advisor");
          setUserAvatarUrl(profile.avatar_url);
        }

        // Fetch Counts
        const { count: familiesCount } = await supabase
          .from('families')
          .select('*', { count: 'exact', head: true })
          .eq('advisor_id', user.id);

        const { count: servicesCount } = await supabase
          .from('services')
          .select('*', { count: 'exact', head: true })
          .eq('advisor_id', user.id);

        const { count: consultationsCount } = await supabase
          .from('consultations')
          .select('*', { count: 'exact', head: true })
          .eq('advisor_id', user.id)
          .eq('status', 'scheduled');

        // Fetch Revenue (Transactions)
        const { data: transactions } = await supabase
          .from('transactions')
          .select('amount')
          .eq('advisor_id', user.id)
          .eq('type', 'income');

        const revenue = transactions?.reduce((acc, curr) => {
          const amount = parseFloat(curr.amount?.replace(/[^0-9.-]+/g, "") || "0");
          return acc + amount;
        }, 0) || 0;

        setStats([
          { label: "Family Clients", value: familiesCount?.toString() || "0", icon: Users, href: "/families" },
          { label: "Services", value: servicesCount?.toString() || "0", icon: Briefcase, href: "/services" },
          { label: "Active consultations", value: consultationsCount?.toString() || "0", icon: MessageSquare, href: "/consultations" },
          { label: "Monthly revenue", value: `$${revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: DollarSign, href: "/payments" },
        ]);

        // Fetch Upcoming Consultations
        const { data: upcomingConsultations } = await supabase
          .from('consultations')
          .select(`
            id,
            title,
            date,
            time,
            status,
            families (name),
            consultation_members (
              family_members (name, avatar)
            )
          `)
          .eq('advisor_id', user.id)
          .eq('status', 'scheduled')
          .order('date', { ascending: true })
          .limit(4);

        if (upcomingConsultations) {
          setConsultations(upcomingConsultations.map((c: any) => ({
            id: c.id,
            title: c.title,
            family: c.families?.name || "Unknown Family",
            date: c.date ? new Date(c.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : "TBD",
            time: c.time,
            members: c.consultation_members?.map((m: any) => m.family_members) || []
          })));
        }

        // Fetch Recent Messages (Conversations)
        const { data: recentConversations } = await supabase
          .from('conversations')
          .select(`
            id,
            title,
            last_message,
            last_message_time,
            unread_count,
            families (name)
          `)
          .order('last_message_time', { ascending: false })
          .limit(3);

        if (recentConversations) {
          setMessages(recentConversations.map((c: any) => ({
            id: c.id,
            title: c.title || c.families?.name || "Conversation",
            sender: c.families?.name || "Family Member", // Simplified
            date: c.last_message_time ? new Date(c.last_message_time).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "",
            preview: c.last_message,
            unread: c.unread_count
          })));
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Convert onboarding progress to ProfileStep format for UI
  const getProfileSteps = (): { row1: ProfileStep[]; row2: ProfileStep[] } => {
    if (!onboardingProgress) {
      return {
        row1: ONBOARDING_STEPS.slice(0, 4).map((step, i) => ({
          id: i + 1,
          label: step.title,
          icon: iconMap[step.icon] || User,
          status: i === 0 ? 'current' : 'pending' as const,
          href: step.href
        })),
        row2: ONBOARDING_STEPS.slice(4).map((step, i) => ({
          id: i + 5,
          label: step.title,
          icon: iconMap[step.icon] || User,
          status: 'locked' as const,
          href: step.href
        }))
      };
    }

    const allSteps = onboardingProgress.steps.map((step, i) => ({
      id: i + 1,
      label: step.config.title,
      icon: iconMap[step.config.icon] || User,
      status: getStepStatus(step, onboardingProgress.steps),
      href: step.config.href
    }));

    return {
      row1: allSteps.slice(0, 4),
      row2: allSteps.slice(4)
    };
  };

  const { row1: profileStepsRow1, row2: profileStepsRow2 } = getProfileSteps();
  const completionPercentage = onboardingProgress?.percentage || 0;

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setLastUpdated(new Date());
    fetchData();
  };

  // Show skeleton while loading
  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex-1 bg-background">
      {/* Breadcrumb Bar */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Home</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-foreground font-medium">Dashboard</span>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="font-medium">Last Updated:</span>
                <span>{lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={handleRefresh}>
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="font-medium">Auto-refresh:</span>
                <span className="text-primary font-medium">ON</span>
                <Settings className="h-4 w-4 text-primary" />
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span>Press ? for Shortcuts</span>
                <Keyboard className="h-4 w-4" />
              </div>
            </div>
            {/* Mobile refresh button */}
            <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Welcome Banner */}
        <Card className="overflow-hidden relative">
          <CardContent className="p-6 sm:p-8 relative z-10">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xl sm:text-2xl tracking-tight max-w-[65%] sm:max-w-[70%]">
              <span className="text-muted-foreground">Welcome Back,</span>
              <div className="flex items-center gap-1.5">
                <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                  <AvatarImage src={userAvatarUrl || undefined} alt={userName} />
                  <AvatarFallback className="text-xs">{userName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{userName}</span>
              </div>
              <span className="text-muted-foreground">You Have</span>
              <div className="flex items-center gap-1 text-foreground">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-medium">{consultations.length} Meetings</span>
              </div>
              <div className="flex items-center gap-1 text-foreground">
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-medium">0 tasks today</span>
              </div>
              <span className="text-muted-foreground">and</span>
              <div className="flex items-center gap-1 text-foreground">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-medium">Monthly revenue is {stats.find(s => s.label === "Monthly revenue")?.value}</span>
              </div>
            </div>
          </CardContent>
          {/* Decorative Shape Image */}
          <div className="absolute -right-16 sm:-right-8 -top-32 sm:-top-24 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] pointer-events-none flex items-center justify-center">
            <img 
              src="/images/Shape.png" 
              alt="" 
              className="w-[85%] h-[85%] object-contain opacity-90 animate-float"
            />
          </div>
        </Card>

        {/* Profile Setup Card */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-foreground">
                Set up your Adviser profile to start selling on the Experts
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Build credibility with verification, define your expertise and services, and get discovered by families.
              </p>
            </div>

            {/* Onboarding Steps Grid */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {profileStepsRow1.map((step) => (
                  <OnboardingCard key={step.id} step={step} />
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {profileStepsRow2.map((step) => (
                  <OnboardingCard key={step.id} step={step} />
                ))}
              </div>
            </div>

            <Separator className="my-5" />

            {/* Progress Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant="secondary">{completionPercentage >= 60 ? 'Ready' : 'Draft'}</Badge>
                <span className="text-sm text-muted-foreground">· Completion: {completionPercentage}%</span>
              </div>
              <span className="text-sm text-muted-foreground">Submission requires ≥ 60% completeness.</span>
            </div>
            <Progress value={completionPercentage} className="mt-3 h-1.5" />
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-[10px] bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xl sm:text-2xl font-semibold text-foreground">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                    <Link href={stat.href} className="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1 mt-2">
                      See More <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Upcoming Consultations - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Upcoming Consultations</CardTitle>
                  <Link href="/consultations" className="text-sm text-primary hover:underline flex items-center gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {consultations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No upcoming consultations</div>
                ) : (
                  consultations.map((consultation) => (
                  <div key={consultation.id} className="border border-border rounded-[10px] p-4 hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground">{consultation.title}</h3>
                          <Badge variant="success">
                            Paid
                          </Badge>
                          <Badge variant="info">
                            Scheduled
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{consultation.family}</p>
                        <div className="flex items-center gap-12">
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">Members</span>
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {consultation.members.slice(0, 3).map((member: any, i: number) => (
                                  <Avatar key={i} className="h-6 w-6 border-2 border-card">
                                    <AvatarFallback className="text-xs">{member.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {consultation.members.length > 0 
                                  ? `${consultation.members[0].name}${consultation.members.length > 1 ? ` and ${consultation.members.length - 1} more` : ''}`
                                  : 'No members'}
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">Date and Time</span>
                            <span className="text-sm text-foreground">{consultation.date} · {consultation.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <CalendarClock className="h-4 w-4" />
                              Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                              <XCircle className="h-4 w-4" />
                              Cancel Consultation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Link href="/consultations">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )))}
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recent messages</CardTitle>
                  <Link href="/messages" className="text-sm text-primary hover:underline flex items-center gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="divide-y divide-border">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No recent messages</div>
                  ) : (
                    messages.map((message) => (
                    <div key={message.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <span className="text-xs text-muted-foreground font-medium">
                            {message.title.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-foreground">{message.title}</h3>
                                <span className="text-xs text-muted-foreground shrink-0">{message.date}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Avatar className="h-5 w-5">
                                  <AvatarFallback className="text-xs">
                                    {message.sender.split(" ").map((n: string) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-muted-foreground">{message.sender}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{message.preview}</p>
                            </div>
                            {message.unread > 0 && (
                              <Badge className="shrink-0">
                                {message.unread} new
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions - 1 column */}
          <div>
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3 h-10" asChild>
                  <Link href="/consultations">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    Schedule a consultation
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-10" asChild>
                  <Link href="/messages">
                    <Send className="h-5 w-5 text-primary" />
                    Send message
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-10" asChild>
                  <Link href="/knowledge">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Knowledge center
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-10" asChild>
                  <Link href="/families">
                    <Users className="h-5 w-5 text-primary" />
                    Manage Families
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
