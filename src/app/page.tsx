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
  TrendingUp,
  TrendingDown,
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
import { supabase } from "@/lib/supabaseClient";
import { LucideIcon } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

type ProfileStep = {
  id: number;
  label: string;
  icon: LucideIcon;
  status: "completed" | "current" | "pending" | "locked";
  href: string;
};

// Profile setup steps - Row 1
const initialProfileStepsRow1: ProfileStep[] = [
  { id: 1, label: "Account & Security", icon: Lock, status: "completed" as const, href: "/settings" },
  { id: 2, label: "Basic Profile", icon: User, status: "current" as const, href: "/profile" },
  { id: 3, label: "Credentials", icon: KeyRound, status: "pending" as const, href: "/profile" },
  { id: 4, label: "Expertise Mapping", icon: Map, status: "pending" as const, href: "/profile" },
];

// Profile setup steps - Row 2
const initialProfileStepsRow2: ProfileStep[] = [
  { id: 5, label: "Services & Pricing", icon: Briefcase, status: "pending" as const, href: "/services" },
  { id: 6, label: "Payments", icon: CreditCard, status: "pending" as const, href: "/payments" },
  { id: 7, label: "KYC Verification", icon: IdCard, status: "locked" as const, href: "/settings" },
  { id: 8, label: "Review & Submit", icon: UserCheck, status: "locked" as const, href: "/profile" },
];

// Stats data
const initialStats = [
  { label: "Family Clients", value: "0", icon: Users, href: "/families" },
  { label: "Services", value: "0", icon: Briefcase, href: "/services" },
  { label: "Active consultations", value: "0", icon: MessageSquare, href: "/consultations" },
  { label: "Monthly revenue", value: "$0.00", icon: DollarSign, href: "/payments" },
];

// Revenue chart data (last 6 months)
const revenueChartData = [
  { month: 'Jun', revenue: 2400, consultations: 12 },
  { month: 'Jul', revenue: 3200, consultations: 16 },
  { month: 'Aug', revenue: 2800, consultations: 14 },
  { month: 'Sep', revenue: 4100, consultations: 19 },
  { month: 'Oct', revenue: 3600, consultations: 17 },
  { month: 'Nov', revenue: 4800, consultations: 22 },
];

// Consultation activity data (last 7 days)
const activityChartData = [
  { day: 'Mon', scheduled: 3, completed: 2 },
  { day: 'Tue', scheduled: 5, completed: 4 },
  { day: 'Wed', scheduled: 2, completed: 2 },
  { day: 'Thu', scheduled: 4, completed: 3 },
  { day: 'Fri', scheduled: 6, completed: 5 },
  { day: 'Sat', scheduled: 1, completed: 1 },
  { day: 'Sun', scheduled: 0, completed: 0 },
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

export default function HomePage() {
  const [stats, setStats] = useState(initialStats);
  const [profileStepsRow1, setProfileStepsRow1] = useState<ProfileStep[]>(initialProfileStepsRow1);
  const [profileStepsRow2, setProfileStepsRow2] = useState<ProfileStep[]>(initialProfileStepsRow2);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [consultations, setConsultations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [userName, setUserName] = useState("Advisor");
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(revenueChartData);
  const [activityData, setActivityData] = useState(activityChartData);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Fetch Profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setUserName(`${profile.first_name || ''} ${profile.last_name || ''}`.trim() || "Advisor");
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

        // Update Onboarding Steps based on data
        if ((servicesCount || 0) > 0) {
          setProfileStepsRow2(prev => prev.map(step => 
            step.label === "Services & Pricing" ? { ...step, status: "completed" } : step
          ));
        }

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

        // Fetch Revenue Chart Data (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        const { data: monthlyRevenue } = await supabase
          .from('transactions')
          .select('amount, created_at')
          .eq('advisor_id', user.id)
          .eq('type', 'income')
          .gte('created_at', sixMonthsAgo.toISOString());

        if (monthlyRevenue && monthlyRevenue.length > 0) {
          // Group by month
          const revenueByMonth: Record<string, number> = {};
          const consultsByMonth: Record<string, number> = {};
          
          monthlyRevenue.forEach((t: any) => {
            const date = new Date(t.created_at);
            const monthKey = date.toLocaleString('en-US', { month: 'short' });
            const amount = parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0");
            revenueByMonth[monthKey] = (revenueByMonth[monthKey] || 0) + amount;
            consultsByMonth[monthKey] = (consultsByMonth[monthKey] || 0) + 1;
          });

          // Convert to chart format
          const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
          const currentMonth = new Date().getMonth();
          const last6Months = [];
          for (let i = 5; i >= 0; i--) {
            const monthIndex = (currentMonth - i + 12) % 12;
            last6Months.push(months[monthIndex]);
          }

          const newChartData = last6Months.map(month => ({
            month,
            revenue: revenueByMonth[month] || 0,
            consultations: consultsByMonth[month] || 0
          }));
          
          if (newChartData.some(d => d.revenue > 0)) {
            setChartData(newChartData);
          }
        }

        // Fetch Activity Chart Data (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { data: weeklyConsultations } = await supabase
          .from('consultations')
          .select('date, status')
          .eq('advisor_id', user.id)
          .gte('date', sevenDaysAgo.toISOString().split('T')[0]);

        if (weeklyConsultations && weeklyConsultations.length > 0) {
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const activityByDay: Record<string, { scheduled: number; completed: number }> = {};
          
          days.forEach(day => {
            activityByDay[day] = { scheduled: 0, completed: 0 };
          });

          weeklyConsultations.forEach((c: any) => {
            const date = new Date(c.date);
            const dayName = days[date.getDay()];
            if (c.status === 'scheduled') {
              activityByDay[dayName].scheduled++;
            } else if (c.status === 'completed') {
              activityByDay[dayName].completed++;
            }
          });

          const newActivityData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
            day,
            scheduled: activityByDay[day].scheduled,
            completed: activityByDay[day].completed
          }));

          if (newActivityData.some(d => d.scheduled > 0 || d.completed > 0)) {
            setActivityData(newActivityData);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setLastUpdated(new Date());
    fetchData();
  };

  return (
    <div className="min-h-screen bg-background">
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
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 text-lg sm:text-2xl">
              <span className="text-muted-foreground">Welcome Back,</span>
              <div className="flex items-center gap-1.5">
                <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                  <AvatarFallback className="text-xs">{userName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{userName}</span>
              </div>
              <span className="text-muted-foreground">You Have</span>
              <div className="flex items-center gap-1 text-foreground">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium">{consultations.length} Meetings</span>
              </div>
              <div className="flex items-center gap-1 text-foreground">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium">0 tasks today</span>
              </div>
              <span className="text-muted-foreground hidden sm:inline">and</span>
              <div className="flex items-center gap-1 text-foreground">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium">Monthly revenue is {stats.find(s => s.label === "Monthly revenue")?.value}</span>
              </div>
            </div>
          </CardContent>
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
                <Badge variant="secondary">Draft</Badge>
                <span className="text-sm text-muted-foreground">· Completion: 10%</span>
              </div>
              <span className="text-sm text-muted-foreground">Submission requires ≥ 60% completeness.</span>
            </div>
            <Progress value={10} className="mt-3 h-1.5" />
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

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Revenue Chart */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Revenue Overview</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Last 6 months</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">+18%</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickFormatter={(value) => `$${value/1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Consultation Activity Chart */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Weekly Activity</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Scheduled vs Completed</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Scheduled</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">Completed</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="scheduled" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" fill="hsl(142 71% 45%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
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
                          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                            Paid
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
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
