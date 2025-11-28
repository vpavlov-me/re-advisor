"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
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
  CheckCircle,
  FileText,
  MessageSquare,
  Link2,
  Copy,
  Edit,
  Trash2,
  DollarSign,
  PlayCircle,
  TrendingUp,
  CalendarCheck,
  CalendarX,
  ArrowRight,
  CalendarClock,
  XCircle,
  Eye,
  ChevronDown
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
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AvailabilitySettings } from "./AvailabilitySettings";
import { Label } from "@/components/ui/label";

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

// Overview metrics
const overviewMetrics = [
  { label: "Total Consultations", value: "64", icon: Calendar, trend: "+12%", trendUp: true },
  { label: "Upcoming Sessions", value: "8", icon: CalendarCheck, trend: "This month" },
  { label: "Completed Rate", value: "94%", icon: TrendingUp, trend: "+3%" , trendUp: true },
  { label: "Total Revenue", value: "$18,450", icon: DollarSign, trend: "+8%", trendUp: true },
];

// Consultations data with extended info
const allConsultations: Consultation[] = [
  {
    id: 1,
    title: "Constitution Workshop",
    family: "Roye Family",
    type: "Video Call",
    date: "July 15, 2025",
    time: "06:00 — 07:00 PM",
    duration: "1 hour",
    status: "scheduled" as const,
    paymentStatus: "paid" as const,
    price: "$500",
    members: [
      { name: "Shiv Roy", initials: "SR", role: "Daughter" },
      { name: "Kendall Roy", initials: "KR", role: "Eldest Son" },
      { name: "Roman Roy", initials: "RR", role: "Youngest Son" },
    ],
    moreMembers: 2,
    meetingLink: "https://zoom.us/j/123456789",
    agenda: [
      "Review current family constitution draft",
      "Discuss governance principles",
      "Vote on key provisions",
      "Next steps and timeline",
    ],
    notes: "Focus on succession provisions. Kendall has concerns about voting rights.",
    documents: [
      { name: "Family Constitution Draft v3.pdf", size: "2.4 MB" },
      { name: "Meeting Agenda.docx", size: "45 KB" },
    ],
  },
  {
    id: 2,
    title: "Governance Review Session",
    family: "Harrington Family",
    type: "In-Person",
    date: "July 17, 2025",
    time: "02:00 — 04:00 PM",
    duration: "2 hours",
    status: "confirmed" as const,
    paymentStatus: "paid" as const,
    price: "$800",
    members: [
      { name: "Clara Harrington", initials: "CH", role: "Matriarch" },
      { name: "Oliver Harrington", initials: "OH", role: "CEO" },
    ],
    moreMembers: 0,
    location: "Harrington Offices, 555 Wilshire Blvd, LA",
    agenda: [
      "Annual governance review",
      "Board composition discussion",
      "Policy updates",
    ],
    notes: "Bring printed copies of current governance documents.",
    documents: [
      { name: "Governance Report 2024.pdf", size: "5.1 MB" },
    ],
  },
  {
    id: 3,
    title: "Family Meeting Facilitation",
    family: "Chen Family",
    type: "Video Call",
    date: "July 22, 2025",
    time: "10:00 — 11:30 AM",
    duration: "1.5 hours",
    status: "pending" as const,
    paymentStatus: "awaiting" as const,
    price: "$600",
    members: [
      { name: "Wei Chen", initials: "WC", role: "Founder" },
      { name: "Lin Chen", initials: "LC", role: "Co-Founder" },
    ],
    moreMembers: 3,
    meetingLink: "https://meet.google.com/abc-defg-hij",
    agenda: [
      "IPO readiness discussion",
      "Wealth structuring options",
      "Family office setup",
    ],
    notes: "First-time family meeting facilitation. Build rapport.",
    documents: [],
  },
  {
    id: 4,
    title: "Succession Planning",
    family: "Roye Family",
    type: "Video Call",
    date: "July 25, 2025",
    time: "03:00 — 04:30 PM",
    duration: "1.5 hours",
    status: "scheduled" as const,
    paymentStatus: "paid" as const,
    price: "$750",
    members: [
      { name: "Logan Roy", initials: "LR", role: "Patriarch" },
      { name: "Shiv Roy", initials: "SR", role: "Daughter" },
    ],
    moreMembers: 1,
    meetingLink: "https://zoom.us/j/987654321",
    agenda: [
      "Review succession timeline",
      "Discuss candidate qualifications",
      "Training program outline",
    ],
    notes: "Sensitive topic - Logan may be resistant. Handle with care.",
    documents: [
      { name: "Succession Plan Draft.pdf", size: "1.8 MB" },
      { name: "Leadership Assessment.xlsx", size: "320 KB" },
    ],
  },
  {
    id: 5,
    title: "Wealth Distribution Review",
    family: "Martinez Family",
    type: "Video Call",
    date: "June 10, 2025",
    time: "11:00 — 12:00 PM",
    duration: "1 hour",
    status: "completed" as const,
    paymentStatus: "paid" as const,
    price: "$450",
    members: [
      { name: "Carlos Martinez", initials: "CM", role: "Patriarch" },
      { name: "Sofia Martinez", initials: "SM", role: "Matriarch" },
    ],
    moreMembers: 0,
    agenda: ["Review trust allocations", "Update beneficiary designations"],
    notes: "All parties agreed on new distribution structure.",
    documents: [{ name: "Trust Amendment.pdf", size: "890 KB" }],
  },
  {
    id: 6,
    title: "Annual Family Retreat Planning",
    family: "Harrington Family",
    type: "In-Person",
    date: "May 25, 2025",
    time: "09:00 — 11:00 AM",
    duration: "2 hours",
    status: "completed" as const,
    paymentStatus: "paid" as const,
    price: "$600",
    members: [
      { name: "Eleanor Harrington", initials: "EH", role: "Coordinator" },
    ],
    moreMembers: 2,
    location: "Harrington Estate, Malibu",
    agenda: ["Retreat logistics", "Agenda planning", "Guest speakers"],
    notes: "Retreat confirmed for August 15-17.",
    documents: [],
  },
  {
    id: 7,
    title: "Investment Strategy Session",
    family: "Chen Family",
    type: "Video Call",
    date: "July 5, 2025",
    time: "02:00 — 03:00 PM",
    duration: "1 hour",
    status: "cancelled" as const,
    paymentStatus: "paid" as const,
    price: "$500",
    members: [
      { name: "Wei Chen", initials: "WC", role: "Founder" },
    ],
    moreMembers: 0,
    agenda: ["Review portfolio", "New investment opportunities"],
    notes: "Client requested reschedule due to travel conflict.",
    documents: [],
  },
];

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
  onCancel
}: { 
  consultation: typeof allConsultations[0];
  onViewDetails: () => void;
  onCancel: (id: number) => void;
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
                    className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => onCancel(consultation.id)}
                  >
                    <XCircle className="h-4 w-4" />
                    Cancel Consultation
                  </DropdownMenuItem>
                </>
              )}
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
  const [consultations, setConsultations] = useState<Consultation[]>(allConsultations);
  const [families, setFamilies] = useState<{id: number, name: string}[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
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
          console.log("Supabase error (using mock data):", error.message);
          return;
        }

        if (consultationsData && consultationsData.length > 0) {
          const mappedConsultations: Consultation[] = consultationsData.map((c: any) => ({
            id: c.id,
            title: c.title,
            family: c.family?.name || "Unknown Family",
            type: c.type,
            date: new Date(c.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            time: c.time,
            duration: c.duration || "1 hour",
            status: c.status,
            paymentStatus: c.payment_status || "awaiting",
            price: c.price || "$0",
            members: c.members?.map((m: any) => ({
              name: m.member.name,
              initials: m.member.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
              role: m.member.role
            })) || [],
            moreMembers: 0, // simplified for now
            meetingLink: c.meeting_link,
            location: c.location,
            agenda: c.agenda || [],
            notes: c.notes || "",
            documents: c.documents || []
          }));
          setConsultations(mappedConsultations);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  // Schedule Form State
  const [scheduleForm, setScheduleForm] = useState({
    family: "",
    type: "Video Call",
    date: "",
    time: "",
    topic: ""
  });

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

      if (!error) {
        setConsultations(prev => prev.map(c => 
          c.id === id ? { ...c, status: "cancelled" } : c
        ));
        // If the cancelled one is currently open in sheet, update it too
        if (selectedConsultation?.id === id) {
          setSelectedConsultation(prev => prev ? { ...prev, status: "cancelled" } : null);
        }
      }
    } catch (error) {
      console.error("Error cancelling consultation:", error);
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

  const handleSchedule = async () => {
    if (!scheduleForm.family || !scheduleForm.date || !scheduleForm.time || !scheduleForm.topic) {
      return; // Basic validation
    }

    const selectedFamily = families.find(f => f.id.toString() === scheduleForm.family);
    const familyName = selectedFamily ? selectedFamily.name : "Unknown Family";

    const newConsultationObj = {
      title: scheduleForm.topic,
      family_id: parseInt(scheduleForm.family),
      type: scheduleForm.type,
      date: scheduleForm.date,
      time: scheduleForm.time,
      duration: "1 hour",
      status: "scheduled",
      payment_status: "awaiting",
      price: "$500",
      meeting_link: scheduleForm.type === "Video Call" ? "https://zoom.us/j/..." : null,
      location: scheduleForm.type === "In-Person" ? "TBD" : null,
      agenda: [],
      notes: "",
      documents: []
    };

    try {
      const { data, error } = await supabase
        .from('consultations')
        .insert([newConsultationObj])
        .select();

      if (data) {
        const newConsultation: Consultation = {
          id: data[0].id,
          title: data[0].title,
          family: familyName,
          type: data[0].type,
          date: new Date(data[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          time: data[0].time,
          duration: data[0].duration,
          status: data[0].status,
          paymentStatus: data[0].payment_status,
          price: data[0].price,
          members: [],
          moreMembers: 0,
          meetingLink: data[0].meeting_link,
          location: data[0].location,
          agenda: data[0].agenda || [],
          notes: data[0].notes || "",
          documents: data[0].documents || []
        };
        setConsultations([newConsultation, ...consultations]);
      } else {
        // Fallback
        const newId = Math.max(...consultations.map(c => c.id)) + 1;
        const fallbackConsultation: Consultation = {
          ...newConsultationObj,
          id: newId,
          family: familyName,
          date: new Date(scheduleForm.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          paymentStatus: "awaiting",
          members: [],
          moreMembers: 0,
          meetingLink: newConsultationObj.meeting_link || undefined,
          location: newConsultationObj.location || undefined,
        } as Consultation;
        setConsultations([fallbackConsultation, ...consultations]);
      }
    } catch (error) {
      console.error("Error creating consultation:", error);
    }

    setIsScheduleOpen(false);
    setScheduleForm({
      family: "",
      type: "Video Call",
      date: "",
      time: "",
      topic: ""
    });
    // Switch to upcoming or all to see it
    setActiveTab("all");
  };

  const openConsultationDetail = (consultation: typeof allConsultations[0]) => {
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
          {overviewMetrics.map((metric) => (
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
                  {paginatedConsultations.length > 0 ? (
                    paginatedConsultations.map((consultation) => (
                      <ConsultationCard 
                        key={consultation.id}
                        consultation={consultation}
                        onViewDetails={() => openConsultationDetail(consultation)}
                        onCancel={handleCancelConsultation}
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
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Consultation</DialogTitle>
            <DialogDescription>
              Book a new session with a family client.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="family">Family Client</Label>
              <select 
                id="family"
                className="flex h-10 w-full items-center justify-between rounded-[10px] border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={scheduleForm.family}
                onChange={(e) => setScheduleForm({...scheduleForm, family: e.target.value})}
              >
                <option value="">Select family...</option>
                {families.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Consultation Type</Label>
              <select 
                id="type"
                className="flex h-10 w-full items-center justify-between rounded-[10px] border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={scheduleForm.type}
                onChange={(e) => setScheduleForm({...scheduleForm, type: e.target.value})}
              >
                <option value="Video Call">Video Call</option>
                <option value="In-Person">In-Person Meeting</option>
                <option value="Phone Call">Phone Call</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({...scheduleForm, date: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="topic">Topic / Title</Label>
              <Input 
                id="topic" 
                placeholder="e.g. Quarterly Review" 
                value={scheduleForm.topic}
                onChange={(e) => setScheduleForm({...scheduleForm, topic: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleOpen(false)}>Cancel</Button>
            <Button onClick={handleSchedule}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Availability Settings Dialog */}
      <Dialog open={isAvailabilityOpen} onOpenChange={setIsAvailabilityOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Availability Settings</DialogTitle>
            <DialogDescription>
              Set your weekly recurring availability for consultations.
            </DialogDescription>
          </DialogHeader>
          <AvailabilitySettings />
        </DialogContent>
      </Dialog>
    </div>
  );
}
