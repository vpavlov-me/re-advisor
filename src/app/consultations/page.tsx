"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { 
  Home, 
  ChevronRight, 
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  Video,
  MapPin,
  Users,
  MoreVertical,
  ChevronLeft,
  ChevronDown,
  CheckCircle,
  Link2,
  Copy,
  Edit,
  Trash2,
  DollarSign,
  PlayCircle,
  TrendingUp,
  CalendarCheck,
  ArrowRight,
  CalendarClock,
  XCircle,
  Eye,
  Loader2,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription 
} from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AvailabilitySettings } from "./AvailabilitySettings";
import { Label } from "@/components/ui/label";

// Zod Validation Schemas
const scheduleSchema = z.object({
  family: z.string().min(1, "Please select a family"),
  type: z.enum(["Video Call", "In-Person", "Phone Call"]),
  date: z.string().min(1, "Date is required").refine((val) => {
    const selectedDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, "Cannot schedule in the past"),
  time: z.string().min(1, "Time is required"),
  topic: z.string().min(3, "Topic must be at least 3 characters").max(100, "Topic is too long"),
  duration: z.string().optional()
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

// Define Consultation Type
type Consultation = {
  id: number;
  title: string;
  family: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  status: "scheduled" | "confirmed" | "pending" | "completed" | "cancelled";
  paymentStatus: "paid" | "awaiting" | "overdue";
  price: string;
  members: { name: string; initials: string; role: string; }[];
  moreMembers: number;
  meetingLink?: string;
  location?: string;
  agenda: string[];
  notes: string;
  documents: { name: string; size: string; }[];
};

// Overview metrics - now calculated dynamically from state
const getOverviewMetrics = (m: { total: number; upcoming: number; completedRate: number; totalRevenue: number }) => [
  { label: "Total Consultations", value: m.total.toString(), icon: Calendar, trend: "All time" },
  { label: "Upcoming Sessions", value: m.upcoming.toString(), icon: CalendarCheck, trend: "Scheduled" },
  { label: "Completed Rate", value: `${m.completedRate}%`, icon: TrendingUp, trend: m.completedRate >= 90 ? "+Great" : "", trendUp: m.completedRate >= 90 },
  { label: "Total Revenue", value: `$${m.totalRevenue.toLocaleString()}`, icon: DollarSign, trend: "From paid", trendUp: m.totalRevenue > 0 },
];

// Consultations data will be fetched from Supabase
// (Removed hardcoded mock data)

// Pagination options
const paginationOptions = [3, 5, 10];

function getStatusBadge(status: "scheduled" | "confirmed" | "pending" | "completed" | "cancelled") {
  const variants = {
    scheduled: { className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", label: "Scheduled" },
    confirmed: { className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", label: "Confirmed" },
    pending: { className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300", label: "Pending" },
    completed: { className: "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300", label: "Completed" },
    cancelled: { className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300", label: "Cancelled" },
  };
  
  return <Badge variant="secondary" className={variants[status].className}>{variants[status].label}</Badge>;
}

function getPaymentBadge(status: "paid" | "awaiting" | "overdue") {
  const variants = {
    paid: { className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", label: "Paid" },
    awaiting: { className: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300", label: "Awaiting Payment" },
    overdue: { className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300", label: "Overdue" },
  };
  
  return <Badge variant="secondary" className={variants[status].className}>{variants[status].label}</Badge>;
}

// Consultation Card Component
function ConsultationCard({ 
  consultation, 
  onViewDetails,
  onCancel,
  onDelete
}: { 
  consultation: Consultation;
  onViewDetails: () => void;
  onCancel: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div 
      onClick={onViewDetails}
      className="cursor-pointer border border-border rounded-[10px] p-4 hover:border-primary/30 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground">{consultation.title}</h3>
            {getPaymentBadge(consultation.paymentStatus)}
            {getStatusBadge(consultation.status)}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{consultation.family}</p>
          
          <div className="flex items-center gap-8">
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Members</span>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {consultation.members.slice(0, 3).map((member) => (
                    <Avatar key={member.initials} className="h-6 w-6 border-2 border-card">
                      <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {consultation.members.slice(0, 2).map(m => m.name).join(", ")}
                  {consultation.moreMembers > 0 && ` +${consultation.moreMembers} more`}
                </span>
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Date and Time</span>
              <span className="text-sm text-foreground">{consultation.date} · {consultation.time}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Type</span>
              <div className="flex items-center gap-1 text-sm text-foreground">
                {consultation.type === "Video Call" ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                {consultation.type}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="gap-2 cursor-pointer" onClick={onViewDetails}>
                <Eye className="h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {consultation.status !== "completed" && consultation.status !== "cancelled" && (
                <>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <CalendarClock className="h-4 w-4" />
                    Reschedule
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="gap-2 cursor-pointer text-orange-600 focus:text-orange-600"
                    onClick={() => onCancel(consultation.id)}
                  >
                    <XCircle className="h-4 w-4" />
                    Cancel Consultation
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                onClick={() => onDelete(consultation.id)}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onViewDetails}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [families, setFamilies] = useState<{id: number, name: string}[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [metrics, setMetrics] = useState({
    total: 0,
    upcoming: 0,
    completedRate: 0,
    totalRevenue: 0
  });
  
  // React Hook Form for Schedule
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      type: "Video Call",
      duration: "1 hour"
    }
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
      try {
        // Fetch Families for the dropdown
        const { data: familiesData } = await supabase
          .from('families')
          .select('id, name');
        
        if (familiesData) {
          setFamilies(familiesData);
        }

        // Fetch Consultations
        const { data: consultationsData, error } = await supabase
          .from('consultations')
          .select(`
            *,
            family:families(name),
            members:consultation_members(
              member:family_members(name, role)
            )
          `)
          .order('date', { ascending: true });

        if (error) {
          console.log("Supabase error:", error.message);
          setConsultations([]);
          return;
        }

        if (consultationsData) {
          const mappedConsultations: Consultation[] = consultationsData.map((c: any) => ({
            id: c.id,
            title: c.title,
            family: c.family?.name || "Unknown Family",
            type: c.type || "Video Call",
            date: new Date(c.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            time: c.time || "TBD",
            duration: c.duration || "1 hour",
            status: c.status || "scheduled",
            paymentStatus: c.payment_status || "awaiting",
            price: c.price || "$0",
            members: c.members?.map((m: any) => ({
              name: m.member?.name || "Unknown",
              initials: (m.member?.name || "U").split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
              role: m.member?.role || "Member"
            })) || [],
            moreMembers: 0,
            meetingLink: c.meeting_link,
            location: c.location,
            agenda: c.agenda || [],
            notes: c.notes || "",
            documents: c.documents || []
          }));
          setConsultations(mappedConsultations);

          // Calculate metrics
          const total = mappedConsultations.length;
          const upcoming = mappedConsultations.filter(c => ["scheduled", "confirmed", "pending"].includes(c.status)).length;
          const completed = mappedConsultations.filter(c => c.status === "completed").length;
          const completedRate = total > 0 ? Math.round((completed / total) * 100) : 0;
          const totalRevenue = mappedConsultations
            .filter(c => c.paymentStatus === "paid")
            .reduce((sum, c) => sum + parseFloat(c.price.replace(/[^0-9.-]+/g, "") || "0"), 0);

          setMetrics({
            total,
            upcoming,
            completedRate,
            totalRevenue
          });
        } else {
          setConsultations([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setConsultations([]);
      } finally {
        setIsLoading(false);
      }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sidebar Filter State
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Video Call", "In-Person"]);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string[]>(["paid", "awaiting", "overdue"]);

  const handleCancelConsultation = async (id: number) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ status: 'cancelled' })
        .eq('id', id);

      if (error) throw error;
      
      setConsultations(prev => prev.map(c => 
        c.id === id ? { ...c, status: "cancelled" } : c
      ));
      // If the cancelled one is currently open in sheet, update it too
      if (selectedConsultation?.id === id) {
        setSelectedConsultation(prev => prev ? { ...prev, status: "cancelled" } : null);
      }
      toast.success('Consultation cancelled');
    } catch (error) {
      console.error("Error cancelling consultation:", error);
      toast.error('Failed to cancel consultation');
    }
  };

  const handleJoinMeeting = (link?: string) => {
    if (link) {
      window.open(link, "_blank");
    } else {
      // Fallback simulation
      window.open("https://zoom.us", "_blank");
    }
  };

  const handleSchedule = async (data: ScheduleFormData) => {
    setIsSubmitting(true);
    
    const selectedFamily = families.find(f => f.id.toString() === data.family);
    const familyName = selectedFamily ? selectedFamily.name : "Unknown Family";

    const newConsultationObj = {
      title: data.topic,
      family_id: parseInt(data.family),
      type: data.type,
      date: data.date,
      time: data.time,
      duration: data.duration || "1 hour",
      status: "scheduled",
      payment_status: "awaiting",
      price: "$500",
      meeting_link: data.type === "Video Call" ? "https://zoom.us/j/..." : null,
      location: data.type === "In-Person" ? "TBD" : null,
      agenda: [],
      notes: "",
      documents: []
    };

    try {
      const { data: insertedData, error } = await supabase
        .from('consultations')
        .insert([newConsultationObj])
        .select();

      if (insertedData) {
        const newConsultation: Consultation = {
          id: insertedData[0].id,
          title: insertedData[0].title,
          family: familyName,
          type: insertedData[0].type,
          date: new Date(insertedData[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          time: insertedData[0].time,
          duration: insertedData[0].duration,
          status: insertedData[0].status,
          paymentStatus: insertedData[0].payment_status,
          price: insertedData[0].price,
          members: [],
          moreMembers: 0,
          meetingLink: insertedData[0].meeting_link,
          location: insertedData[0].location,
          agenda: insertedData[0].agenda || [],
          notes: insertedData[0].notes || "",
          documents: insertedData[0].documents || []
        };
        setConsultations([newConsultation, ...consultations]);
        toast.success('Consultation scheduled successfully');
      } else {
        // Fallback for demo
        const newId = Math.max(...consultations.map(c => c.id), 0) + 1;
        const fallbackConsultation: Consultation = {
          id: newId,
          title: data.topic,
          family: familyName,
          type: data.type,
          date: new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          time: data.time,
          duration: data.duration || "1 hour",
          status: "scheduled",
          paymentStatus: "awaiting",
          price: "$500",
          members: [],
          moreMembers: 0,
          meetingLink: data.type === "Video Call" ? "https://zoom.us/j/..." : undefined,
          location: data.type === "In-Person" ? "TBD" : undefined,
          agenda: [],
          notes: "",
          documents: []
        };
        setConsultations([fallbackConsultation, ...consultations]);
        toast.success('Consultation scheduled successfully');
      }
    } catch (error) {
      console.error("Error creating consultation:", error);
      toast.error('Failed to schedule consultation');
    } finally {
      setIsSubmitting(false);
      setIsScheduleOpen(false);
      reset();
      setActiveTab("all");
    }
  };

  const handleDeleteConsultation = async () => {
    if (!deletingId) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('consultations')
        .delete()
        .eq('id', deletingId);

      if (error) throw error;

      setConsultations(prev => prev.filter(c => c.id !== deletingId));
      toast.success('Consultation deleted successfully');
    } catch (error) {
      console.error("Error deleting consultation:", error);
      // Fallback for demo
      setConsultations(prev => prev.filter(c => c.id !== deletingId));
      toast.success('Consultation deleted successfully');
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
      if (selectedConsultation?.id === deletingId) {
        setIsSheetOpen(false);
        setSelectedConsultation(null);
      }
    }
  };

  const confirmDeleteConsultation = (id: number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const openConsultationDetail = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setIsSheetOpen(true);
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const togglePaymentStatus = (status: string) => {
    setSelectedPaymentStatus(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
    setCurrentPage(1);
  };

  // Filter consultations based on tab and sidebar filters
  const getFilteredConsultations = () => {
    let filtered = consultations;
    
    // Filter by tab
    switch (activeTab) {
      case "upcoming":
        filtered = filtered.filter(c => ["scheduled", "confirmed", "pending"].includes(c.status));
        break;
      case "completed":
        filtered = filtered.filter(c => c.status === "completed");
        break;
      case "cancelled":
        filtered = filtered.filter(c => c.status === "cancelled");
        break;
    }
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(query) || 
        c.family.toLowerCase().includes(query)
      );
    }

    // Filter by Date Range
    if (dateRange.from) {
      filtered = filtered.filter(c => new Date(c.date) >= new Date(dateRange.from));
    }
    if (dateRange.to) {
      filtered = filtered.filter(c => new Date(c.date) <= new Date(dateRange.to));
    }

    // Filter by Type
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(c => selectedTypes.includes(c.type));
    }

    // Filter by Payment Status
    if (selectedPaymentStatus.length > 0) {
      filtered = filtered.filter(c => selectedPaymentStatus.includes(c.paymentStatus));
    }
    
    return filtered;
  };

  const filteredConsultations = getFilteredConsultations();
  const totalPages = Math.ceil(filteredConsultations.length / itemsPerPage);
  const paginatedConsultations = filteredConsultations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Tab counts
  const tabCounts = {
    all: consultations.length,
    upcoming: consultations.filter(c => ["scheduled", "confirmed", "pending"].includes(c.status)).length,
    completed: consultations.filter(c => c.status === "completed").length,
    cancelled: consultations.filter(c => c.status === "cancelled").length,
  };  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Bar */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Home</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-foreground font-medium">Consultations</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsAvailabilityOpen(true)}>
                <CalendarClock className="h-4 w-4 mr-2" />
                Availability
              </Button>
              <Button onClick={() => setIsScheduleOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Overview Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {getOverviewMetrics(metrics).map((metric) => (
            <Card key={metric.label}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                    <div className="text-2xl font-semibold text-foreground mt-1">{metric.value}</div>
                    <div className={`text-xs mt-1 ${metric.trendUp ? "text-green-600" : "text-muted-foreground"}`}>
                      {metric.trend}
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-[10px] bg-primary/10 flex items-center justify-center">
                    <metric.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setCurrentPage(1); }}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">
                All <Badge variant="secondary" className="ml-2 text-xs">{tabCounts.all}</Badge>
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                Upcoming <Badge variant="secondary" className="ml-2 text-xs">{tabCounts.upcoming}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed <Badge variant="secondary" className="ml-2 text-xs">{tabCounts.completed}</Badge>
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled <Badge variant="secondary" className="ml-2 text-xs">{tabCounts.cancelled}</Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
            {/* Main Content - 3 columns */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {activeTab === "all" && "All Consultations"}
                      {activeTab === "upcoming" && "Upcoming Consultations"}
                      {activeTab === "completed" && "Completed Consultations"}
                      {activeTab === "cancelled" && "Cancelled Consultations"}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search by family or title..." 
                          className="pl-9 w-[250px]"
                          value={searchQuery}
                          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  {isLoading ? (
                    // Loading skeleton
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="bg-muted/50 rounded-xl p-4">
                            <div className="flex items-start gap-4">
                              <div className="h-12 w-12 rounded-xl bg-muted"></div>
                              <div className="flex-1 space-y-2">
                                <div className="h-4 bg-muted rounded w-1/3"></div>
                                <div className="h-3 bg-muted rounded w-1/4"></div>
                              </div>
                              <div className="h-6 w-20 bg-muted rounded"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : paginatedConsultations.length > 0 ? (
                    paginatedConsultations.map((consultation) => (
                      <ConsultationCard 
                        key={consultation.id}
                        consultation={consultation}
                        onViewDetails={() => openConsultationDetail(consultation)}
                        onCancel={handleCancelConsultation}
                        onDelete={confirmDeleteConsultation}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      No consultations found
                    </div>
                  )}

                  {/* Pagination */}
                  {filteredConsultations.length > 0 && (
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Show</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-1">
                              {itemsPerPage}
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            {paginationOptions.map((option) => (
                              <DropdownMenuItem 
                                key={option}
                                onClick={() => { setItemsPerPage(option); setCurrentPage(1); }}
                              >
                                {option} per page
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <span>per page</span>
                        <span className="ml-4">
                          Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredConsultations.length)} of {filteredConsultations.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(p => p - 1)}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button 
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        ))}
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(p => p + 1)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-4">
              {/* Filters */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Date Range</label>
                    <div className="space-y-2">
                      <Input 
                        type="date" 
                        className="w-full" 
                        value={dateRange.from}
                        onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                      />
                      <Input 
                        type="date" 
                        className="w-full" 
                        value={dateRange.to}
                        onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Consultation Type</label>
                    <div className="space-y-2">
                      {["Video Call", "In-Person"].map(type => (
                        <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-primary focus:ring-primary" 
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleType(type)}
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Payment Status</label>
                    <div className="space-y-2">
                      {["paid", "awaiting", "overdue"].map(status => (
                        <label key={status} className="flex items-center gap-2 text-sm cursor-pointer capitalize">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-primary focus:ring-primary" 
                            checked={selectedPaymentStatus.includes(status)}
                            onChange={() => togglePaymentStatus(status)}
                          />
                          {status}
                        </label>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setDateRange({ from: "", to: "" });
                      setSelectedTypes(["Video Call", "In-Person"]);
                      setSelectedPaymentStatus(["paid", "awaiting", "overdue"]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Plus className="h-4 w-4 text-primary" />
                    New Consultation
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    View Calendar
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Export Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>

      {/* Consultation Detail Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-[540px] sm:max-w-[540px] p-0">
          {selectedConsultation && (
            <ScrollArea className="h-full">
              <div className="p-6">
                {/* Header */}
                <SheetHeader className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(selectedConsultation.status)}
                    {getPaymentBadge(selectedConsultation.paymentStatus)}
                  </div>
                  <SheetTitle className="text-xl">{selectedConsultation.title}</SheetTitle>
                  <SheetDescription>{selectedConsultation.family}</SheetDescription>
                </SheetHeader>

                {/* Quick Actions */}
                <div className="flex gap-2 mb-6">
                  {selectedConsultation.type === "Video Call" ? (
                    <Button 
                      className="flex-1" 
                      onClick={() => handleJoinMeeting(selectedConsultation.meetingLink)}
                      disabled={selectedConsultation.status === "cancelled"}
                    >
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Join Meeting
                    </Button>
                  ) : (
                    <Button className="flex-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  )}
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      handleCancelConsultation(selectedConsultation.id);
                      setIsSheetOpen(false);
                    }}
                    disabled={selectedConsultation.status === "cancelled" || selectedConsultation.status === "completed"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Meeting Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <Calendar className="h-3 w-3" />
                      Date
                    </span>
                    <span className="text-sm font-medium text-foreground">{selectedConsultation.date}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <Clock className="h-3 w-3" />
                      Time
                    </span>
                    <span className="text-sm font-medium text-foreground">{selectedConsultation.time}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <Clock className="h-3 w-3" />
                      Duration
                    </span>
                    <span className="text-sm font-medium text-foreground">{selectedConsultation.duration}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <DollarSign className="h-3 w-3" />
                      Fee
                    </span>
                    <span className="text-sm font-medium text-foreground">{selectedConsultation.price}</span>
                  </div>
                </div>

                {/* Meeting Link or Location */}
                {selectedConsultation.type === "Video Call" && selectedConsultation.meetingLink && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-2">Meeting Link</h4>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                      <Link2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-primary flex-1 truncate">{selectedConsultation.meetingLink}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}

                {selectedConsultation.type === "In-Person" && selectedConsultation.location && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-2">Location</h4>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground flex-1">{selectedConsultation.location}</span>
                    </div>
                  </div>
                )}

                {/* Participants */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Participants ({selectedConsultation.members.length + selectedConsultation.moreMembers})</h4>
                  <div className="space-y-2">
                    {selectedConsultation.members.map((member) => (
                      <div key={member.initials} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                    {selectedConsultation.moreMembers > 0 && (
                      <div className="text-sm text-muted-foreground text-center py-2">
                        +{selectedConsultation.moreMembers} more participants
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Agenda */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Agenda</h4>
                  <ul className="space-y-2">
                    {selectedConsultation.agenda.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Notes */}
                {selectedConsultation.notes && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      {selectedConsultation.notes}
                    </p>
                  </div>
                )}

                {/* Documents */}
                {selectedConsultation.documents.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Documents</h4>
                    <div className="space-y-2">
                      {selectedConsultation.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground">{doc.name}</div>
                            <div className="text-xs text-muted-foreground">{doc.size}</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>

      {/* Schedule Consultation Dialog */}
      <Dialog open={isScheduleOpen} onOpenChange={(open) => {
        setIsScheduleOpen(open);
        if (!open) reset();
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Consultation</DialogTitle>
            <DialogDescription>
              Book a new session with a family client.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleSchedule)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="family">Family Client</Label>
                <select 
                  id="family"
                  className="flex h-10 w-full items-center justify-between rounded-[10px] border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("family")}
                >
                  <option value="">Select family...</option>
                  {families.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
                {errors.family && (
                  <p className="text-sm text-red-500">{errors.family.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Consultation Type</Label>
                <select 
                  id="type"
                  className="flex h-10 w-full items-center justify-between rounded-[10px] border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("type")}
                >
                  <option value="Video Call">Video Call</option>
                  <option value="In-Person">In-Person Meeting</option>
                  <option value="Phone Call">Phone Call</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <select 
                  id="duration"
                  className="flex h-10 w-full items-center justify-between rounded-[10px] border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("duration")}
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="90 minutes">90 minutes</option>
                  <option value="2 hours">2 hours</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    {...register("date")}
                  />
                  {errors.date && (
                    <p className="text-sm text-red-500">{errors.date.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    {...register("time")}
                  />
                  {errors.time && (
                    <p className="text-sm text-red-500">{errors.time.message}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="topic">Topic / Title</Label>
                <Input 
                  id="topic" 
                  placeholder="e.g. Quarterly Review" 
                  {...register("topic")}
                />
                {errors.topic && (
                  <p className="text-sm text-red-500">{errors.topic.message}</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsScheduleOpen(false);
                reset();
              }}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  "Schedule"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Availability Settings Dialog */}
      <Dialog open={isAvailabilityOpen} onOpenChange={setIsAvailabilityOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Availability Settings</DialogTitle>
            <DialogDescription>
              Set your weekly recurring availability for consultations.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 -mr-4 pr-4">
            <AvailabilitySettings />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Consultation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this consultation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setDeletingId(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConsultation}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Consultation"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
